import { Component, inject, signal, computed } from '@angular/core';
import { Modal } from '../../modal/modal';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = inject(AuthService)
  router = inject(Router);
  toast = inject(ToastService);

  showProfile = computed(() => this.auth.isLoggedIn())
  showMenu = signal<boolean>(false);
 

  toggleProfileMenu(){
    this.showMenu.update(value => !value);
  }

  logout() {
  this.auth.logout().subscribe({
    next: () => {
      this.auth.clearToken();
      this.router.navigate(['/login']);
    },
    error: () => {
      this.toast.show('Logged out locally, but a server error occurred', 'error');
      this.router.navigate(['/login']);
    }
  });
}
}
