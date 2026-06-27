import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validator, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { accessTokenPayload, logInRequest, ProblemDetails } from '../../../shared/models/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
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

  LogInForm = this.builder.nonNullable.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]]
  })
    
  auth = inject(AuthService);
  toast = inject(ToastService);

  togglePassVisibility(){
    this.showPass.update(value => !value);
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

        if(payload.role === 'Admin'){
          this.homeUrl = 'employee/dashboard';
        }else{
          this.homeUrl = 'admin/dashboard';
        }
        
        this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? this.homeUrl;
        this.toast.show('Logged In Succesfully', 'info');
        this.router.navigateByUrl(this.returnUrl);

        this.LogInForm.reset
      }, 
      error : (err : HttpErrorResponse) =>  {
        const problem = err.error as ProblemDetails
        this.errorMessage.set(problem.detail) 
      }
    })
  }
}
