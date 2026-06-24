import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly mobileMenuOpen = signal(false);

  toggleMenu(){
     this.mobileMenuOpen.update(open => !open);
  } 

  closeMenu(){
    this.mobileMenuOpen.set(false)
  }
}
