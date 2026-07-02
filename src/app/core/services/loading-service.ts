import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private requestCount = 0;
  loading = signal<boolean>(false);

  show(){
    this.requestCount++
    this.loading.set(true);
  }

  hide(){
    this.requestCount = Math.max(0, this.requestCount - 1);
    if(this.requestCount === 0){
      this.loading.set(false);
    }
  }
}
