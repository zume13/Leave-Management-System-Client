import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from '../../../core/services/toast-service';
import { ToastContainer } from "../../../shared/components/toast-container/toast-container";
import { Queryservice } from '../../../core/services/queryservice';
import { AuthService } from '../../../core/services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-allocation-list-container',
  imports: [ToastContainer],
  templateUrl: './allocation-list-container.html',
  styleUrl: './allocation-list-container.css',
})
export class AllocationListContainer implements OnInit {

  toast = inject(ToastService);
  query = inject(Queryservice);
  auth = inject(AuthService);

  ngOnInit(): void {
    this.getAllocations();
  }

  getAllocations(){

    const id = this.auth.currentUser()?.id;

    if(!id){
      return
    }

    this.query.getAllocationsByEmployee(id).subscribe({
      next : (response) => {
        this.query.Allocations.set(response);
      },
      error : (err : HttpErrorResponse) => {
          this.toast.show(err.error, 'error');
      }
    })
  }

}
