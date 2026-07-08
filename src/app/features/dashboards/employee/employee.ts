import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Queryservice } from '../../../core/services/queryservice';
import { RequestsCommandService } from '../../../core/services/requests-command-service';
import { AuthService } from '../../../core/services/auth-service';
import { ToastService } from '../../../core/services/toast-service';
import { ToastContainer } from "../../../shared/components/toast-container/toast-container";
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [ToastContainer, DatePipe],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit{

  query = inject(Queryservice);
  command = inject(RequestsCommandService);
  auth = inject(AuthService);
  toast = inject(ToastService);

  ngOnInit(): void {
    if(this.query.EmployeeDashBoardData()){
      return;
    }

    this.getEmployeeRequests();
  }

  totalRequests = computed(() => {
    return this.query.EmployeeDashBoardData()?.length ?? 0;
  });

  totalPendingRequest = computed(() => {
    return this.query.EmployeeDashBoardData()?.filter(value => value.status === 'Pending').length ?? 0;
  });

  totalApprovedRequest = computed(() => {
    return this.query.EmployeeDashBoardData()?.filter(value => value.status === 'Approved').length ?? 0;
  });

  totalRejectedRequest = computed(() => {
    return this.query.EmployeeDashBoardData()?.filter(value => value.status === 'Rejected').length ?? 0;
  });

  showCreateModal = signal<boolean>(false);
  showUpdateModal = signal<boolean>(false);
  showCancelModal = signal<boolean>(false);
  showViewModal = signal<boolean>(false);

  getEmployeeRequests(){

    if(this.auth.currentUser()?.id === null){
      console.error('Id not found');
      return;
    }

    this.query.getAllEmployeeRequestsById(this.auth.currentUser()!.id).subscribe({
      next : (response) => {
        console.log(response);
        this.query.EmployeeDashBoardData.set(response);
      },
      error : (err : HttpErrorResponse) => {
        this.toast.show(err.error, 'error');
      }
    })
  }

  openCreateModal(){
    this.showCreateModal.set(true);
  }
  openUpdateModal(requestId : string){
    this.showUpdateModal.set(true);
  }
  openCancelModal(requestId : string){
    this.showCancelModal.set(true);
  }
  openViewModal(requestId : string){
    this.showViewModal.set(true);
  }

  getColor(status : string){
    switch(status){
      case 'Rejected' : 
        return 'bg-red-100 text-red-700';
      case 'Approved'  : 
        return 'bg-green-100 text-green-700';
      case 'Pending' : 
        return 'bg-yellow-100 text-yellow-700';
      default : 
        return 'bg-gray-100 text-gray-700';
    }
  }
}