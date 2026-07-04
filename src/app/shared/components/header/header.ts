import { Component, inject, signal, computed } from '@angular/core';
import { Modal } from '../../modal/modal';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from '../../models/auth';

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

  showProfile = computed(() => this.auth.isLoggedIn() && this.auth.currentUser !== null);
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
    error: (err : HttpErrorResponse) => {
      const problem = err.error as ProblemDetails

      this.auth.clearToken();
      this.toast.show(`${problem.detail}`, 'error');
      this.router.navigate(['/login']);
    }
  });
}
}
