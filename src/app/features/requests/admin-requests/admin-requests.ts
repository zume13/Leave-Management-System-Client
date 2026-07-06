import { Component, inject, signal } from '@angular/core';
import { ToastContainer } from '../../../shared/components/toast-container/toast-container';
import { ToastService } from '../../../core/services/toast-service';
import { Modal } from '../../../shared/modal/modal';
import { RequestsResponse } from '../../../shared/models/query';
import { DatePipe } from '@angular/common';
import { RequestsCommandService } from '../../../core/services/requests-command-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from '../../../shared/models/auth';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-requests',
  imports: [ToastContainer, Modal, DatePipe, FormsModule],
  templateUrl: './admin-requests.html',
  styleUrl: './admin-requests.css',
})
export class AdminRequests {

  toast = inject(ToastService);
  command = inject(RequestsCommandService);
  showModal = signal<boolean>(false);
  showRejectModal = signal<boolean>(false);
  selectedRequest = signal<RequestsResponse | null>(null);
  rejectionReason = signal('');

  showReqModal(){

  }

  closeReqModal(){

  }

   openRejectModal(){
    this.closeReqModal();
    this.showRejectModal.set(true);
  }

  closeRejectModal(){
    this.showRejectModal.set(false);
  }

  viewRequest(requestId : string){

  }

   approveRequest(requestId : string, employeeId : string){

    this.closeReqModal();

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

   getStatusColor(status : string){
    switch(status){
      case 'Rejected' : 
        return 'bg-red-100 text-red-700';
      case 'Approved' : 
        return 'bg-green-100 text-green-700';
      case 'Pending' : 
        return 'bg-yellow-100 text-yellow-700';
      case 'Active' : 
        return 'bg-blue-100 text-blue-700';
      default : 
        return 'bg-gray-100 text-gray-700';
    }
  }

}
