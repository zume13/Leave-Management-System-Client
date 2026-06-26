import { Component, inject, signal } from '@angular/core';
import { Modal } from '../../modal/modal';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = inject(AuthService)

  showProfile = signal<boolean>(this.auth.isLoggedIn())

}
