import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemDetails } from '../../../shared/models/auth';
import { ToastService } from '../../../core/services/toast-service';
import { ToastContainer } from '../../../shared/components/toast-container/toast-container';
import { Modal } from '../../../shared/modal/modal';

@Component({
  selector: 'app-email-verification',
  imports: [ToastContainer, Modal],
  templateUrl: './email-verification.html',
  styleUrl: './email-verification.css',
})
export class EmailVerification implements OnInit {

  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  toast = inject(ToastService);
  router = inject(Router);
  private readonly verifyEndpoint = "https://localhost:7215/leave-management/employee/verify";
  private readonly resendEndpoint = "https://localhost:7215/leave-management/employee/resend-verification";
  showModal = signal<boolean>(false);
  private _token = '';


  closeModal(){
    this.showModal.set(false);
  }

  resendVerificationEmail(){

    if(!this._token){
      this.toast.show("Token was null", 'error');
    }

    this.http.post(`${this.resendEndpoint}/${this._token}`, {})
      .subscribe({
        next : () => {
          this.toast.show("Verification email was sent succesfully.", 'info')
        },
        error : (err : HttpErrorResponse) => {
          const problem = err.error as ProblemDetails

          this.toast.show(problem.detail, 'error');
        }
      });
  }

  ngOnInit(): void {
    this.verify();
  }

  verify(){

    const token = this.route.snapshot.queryParamMap.get('token');

    if(!token){
      console.error('null token');
      return;
    }

    this.http.post(this.verifyEndpoint, {token : token})
      .subscribe({
        next : () => {
          this.toast.show('Email verified successfully.', 'success');
          this.router.navigateByUrl('/login');
        },
        error : (err : HttpErrorResponse) => {
          const problem = err.error as ProblemDetails;
          this.showModal.set(true);
          this._token = token;
        } 
      })

  }

}
