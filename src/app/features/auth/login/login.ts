import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { logInRequest } from '../../../shared/models/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormControl('');
  auth = inject(AuthService);
  
  

  login(){
    const request : logInRequest = this.form.getRawValue()!;

    this.auth.login().subscribe
  }
}
