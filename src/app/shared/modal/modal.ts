import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  IsOpen = input(false);
  close = output<void>();

  closeModal(){
    this.close.emit();
  }
}
