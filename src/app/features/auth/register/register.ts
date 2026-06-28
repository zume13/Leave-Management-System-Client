import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { ToastService } from '../../../core/services/toast-service';
import { Modal } from '../../../shared/modal/modal';
import { ToastContainer } from '../../../shared/components/toast-container/toast-container';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, Modal, ToastContainer],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  builder = new FormBuilder();
  departmentId : string = '';
  auth = inject(AuthService);
  toast = inject(ToastService)
  showModal = signal<boolean>(false);
  showPass = signal<boolean>(false);

  close(){
    this.showModal.update(value => !value);
  }

  open(){
    this.showModal.set(true);
  }

  togglePasswordPrivacy(){
    this.showPass.update(value => !value);
  }

  regForm = this.builder.nonNullable.group({
    fullName : ['', [Validators.required, Validators.pattern(/^[A-Za-z.\s]+$/)]],
    email : ['', [Validators.required, Validators.email]],
    department : ['', [Validators.required]],
    password : ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    confirm : ['', [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]]
  });

 register(){
  this.auth.register({
    name : this.regForm.controls['fullName'].value,
    email : this.regForm.controls['email'].value,
    password : this.regForm.controls['password'].value,
    deptId : this.regForm.controls['department'].value
  }).subscribe({
    next : () => {
      this.showModal();
      this.regForm.reset();
    },
    error : () => {
      this.toast.show("Unexpected error occured", "error");
    }
  })
 }

}
