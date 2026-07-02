import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { ToastContainer } from './shared/components/toast-container/toast-container';
import { SidebarContainer } from './shared/components/sidebar-container/sidebar-container';
import { AuthService } from './core/services/auth-service';
import { EmailVerification } from "./features/auth/email-verification/email-verification";
import { Modal } from "./shared/modal/modal";
import { SpinnerComponent } from "./shared/components/spinner-component/spinner-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ToastContainer, SidebarContainer, SpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'LeaveManagementClient';

  auth = inject(AuthService);

}
