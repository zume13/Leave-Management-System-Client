import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validator, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { accessTokenPayload, logInRequest, ProblemDetails } from '../../../shared/models/auth';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Modal } from '../../../shared/modal/modal';
import { ToastContainer } from '../../../shared/components/toast-container/toast-container';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Modal, ToastContainer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private route : ActivatedRoute){}

  errorMessage = signal<string>('');
  returnUrl = '/';
  homeUrl = '/';
  router = inject(Router)
  builder = new FormBuilder();
  showPass = signal<boolean>(false);
  showModal = signal<boolean>(false);

  LogInForm = this.builder.nonNullable.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]]
  })
    
  auth = inject(AuthService);
  toast = inject(ToastService);

  togglePassVisibility(){
    this.showPass.update(value => !value);
  }

  closeModal(){
    this.showModal.update(value => !value);
  }

  login(){

    const email = this.LogInForm.controls['email'].value;
    const password = this.LogInForm.controls['password'].value;

    this.auth.login({
      email : email,
      password : password
    }).subscribe({
      next : (response) => {

        const payload = jwtDecode<accessTokenPayload>(response.accessToken);

        if(payload.role === 'Admin' || payload.role === 'Manager'){
          this.homeUrl = 'admin/dashboard';
        }else{
          this.homeUrl = 'employee/dashboard';
        }
        
        this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? this.homeUrl;
        this.toast.show('Logged In Succesfully', 'info');
        this.router.navigateByUrl(this.returnUrl);
        
        this.LogInForm.reset();
      }, 
      error : (err : HttpErrorResponse) =>  {
        const problem = err.error as ProblemDetails

        switch (problem.detail) {
          case 'Invalid email or password':
            this.errorMessage.set(problem.detail) 
            break;

          case "The user's email was not verified":
            this.showModal.update(value => !value);
            break;

          default:
            this.toast.show('An unexpected error occured.', 'error');
            break;
        }
        
      }
    })

  }
}
