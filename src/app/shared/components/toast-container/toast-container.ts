import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  imports: [NgClass],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css',
})
export class ToastContainer {
  readonly toastService = inject(ToastService);

  getToastClasses(type : string){

    switch(type){
      case 'success' : 
        return 'bg-emerald-600';
      case 'error' : 
        return 'bg-red-800';
      case 'warning' : 
        return 'bg-amber-400';
      case 'info' : 
        return 'bg-sky-500';
      default : 
        return 'bg-sky-500';
    }
    
  }
}
