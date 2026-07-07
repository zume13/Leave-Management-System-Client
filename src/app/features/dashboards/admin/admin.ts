import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Queryservice } from '../../../core/services/queryservice';
import { ToastService } from '../../../core/services/toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from '../../../shared/models/auth';
import { Modal } from '../../../shared/modal/modal';
import { RequestsResponse } from '../../../shared/models/query';
import { DatePipe } from '@angular/common';
import { RequestsCommandService } from '../../../core/services/requests-command-service';
import { ToastContainer } from "../../../shared/components/toast-container/toast-container";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [Modal, DatePipe, ToastContainer, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{
  query = inject(Queryservice);
  command = inject(RequestsCommandService);
  toast = inject(ToastService);

  showModal = signal<boolean>(false);
  selectedRequest = signal<RequestsResponse | null>(null); 

  showRejectModal = signal<boolean>(false);
  rejectionReason = signal<string>('');
 
  ngOnInit(): void {
    this.getDashboard();
    this.getRequest();
  }

  openModal(request : RequestsResponse){
    this.selectedRequest.set(request);
    this.showModal.set(true);
  }

  closeModal(){
    this.showModal.set(false);
  }

  openRejectModal(){
    this.closeModal();
    this.showRejectModal.set(true);
  }

  closeRejectModal(){
    this.showRejectModal.set(false);
  }

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
      }
    })
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

  approveRequest(requestId : string, employeeId : string){

    this.closeModal();

    this.command.approveRequest(employeeId, requestId).subscribe({
      next : () => {
        this.toast.show('Approved leave request.', 'info');
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails

        this.toast.show(`${problem.detail}`, 'error');
      }
    });
  }

  rejectRequest(requestId : string, employeeId : string, rejectionReason : string){

    this.closeRejectModal();

    const reason = rejectionReason === '' ? 'No reason provided.' : rejectionReason

    this.command.rejectRequest(employeeId, requestId, reason).subscribe({
      next : () => {
        this.toast.show('Rejected leave request.', 'info');
      },
      error : (err : HttpErrorResponse) => {
        console.error(err.error);
        console.error(err.status);

        this.toast.show(`${err.error}`, 'error');
      }
    })
  }
}
