import { Component, inject, OnInit, signal } from '@angular/core';
import { Queryservice } from '../../../core/services/queryservice';
import { ToastService } from '../../../core/services/toast-service';
import { DashboardResponse } from '../../../shared/models/query';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from '../../../shared/models/auth';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{
  query = inject(Queryservice);
  toast = inject(ToastService);
 
  ngOnInit(): void {
    this.getDashboard();
    this.getRequest();
  }

  openModal(){}

  getRequest()
  {

    if(this.query.Requests().length > 0){
      return;
    }

    this.query.getAllRequest().subscribe({
      next : (response) => {
        this.query.Requests.set(response);
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails
        this.toast.show(problem.detail, 'error');
        console.error(problem.detail);
      }
    })
  }

  getDashboard(){

    if(this.query.DashboardData() !== null){
      return;
    }


    this.query.getDashboardData().subscribe({
      next : (response) => {
        this.query.DashboardData.set(response);
      },
      error : (err) => {
        this.toast.show('Internal Server Error', 'error');
        console.error(err);
      }
    })
  }
}
