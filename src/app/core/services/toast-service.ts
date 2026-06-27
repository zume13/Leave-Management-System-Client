import { Injectable, signal } from '@angular/core';
import { Toast } from '../../shared/models/toast';
import { NgClass } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  readonly toast = signal<Toast[]>([]);

 show(message : string, type : Toast['type'] = 'info', duration : number = 5000){

  const newToast : Toast = {
    id: crypto.randomUUID(),
    message,
    type
  }

  this.toast.update(current => [...current, newToast])

  setTimeout(() => {
    this.remove(newToast.id)
  }, duration);
 }

 private remove(id : string){
  this.toast.update(current => current.filter(t => t.id !== id));
 }
}
