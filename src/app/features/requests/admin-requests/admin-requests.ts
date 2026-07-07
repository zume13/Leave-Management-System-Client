import { Component, inject, OnInit, signal } from '@angular/core';
import { ToastContainer } from '../../../shared/components/toast-container/toast-container';
import { ToastService } from '../../../core/services/toast-service';
import { Modal } from '../../../shared/modal/modal';
import { RequestsResponse } from '../../../shared/models/query';
import { DatePipe } from '@angular/common';
import { RequestsCommandService } from '../../../core/services/requests-command-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from '../../../shared/models/auth';
import { FormsModule } from '@angular/forms';
import { requestType } from '../../../shared/utilities/types';
import { Queryservice } from '../../../core/services/queryservice';


@Component({
  selector: 'app-admin-requests',
  imports: [ToastContainer, Modal, DatePipe, FormsModule],
  templateUrl: './admin-requests.html',
  styleUrl: './admin-requests.css',
})
export class AdminRequests implements OnInit {

  ngOnInit(): void {
    this.getRequest();
  }

  toast = inject(ToastService);
  command = inject(RequestsCommandService);
  query = inject(Queryservice);
  showModal = signal<boolean>(false);
  showRejectModal = signal<boolean>(false);
  selectedFilter = signal<requestType>('all');
  selectedRequest = signal<RequestsResponse | null>(null);
  rejectionReason = signal('');

  showReqModal(){
    this.showModal.set(true);
  }

  closeReqModal(){
    this.showModal.set(false);
  }

   openRejectModal(){
    this.closeReqModal();
    this.showRejectModal.set(true);
  }

  closeRejectModal(){
    this.showRejectModal.set(false);
  }

  changedFilter(value : requestType){
    this.query.Requests.set([]);
    this.getRequest(value);
  }

  viewRequest(requestId : string){

    const matched  = this.query.Requests().find(values => values.id === requestId);

    if(matched){
      this.selectedRequest.set(matched);
      this.showReqModal()
      return;
    }
    
    this.toast.show('Leave request not found', 'error');
  }

  getRequest(filter : requestType = 'all'){

    if(this.query.Requests().length > 0){
      return;
    }

    switch(filter){
      case 'all' : this.getAllRequest();
        break;
      case 'approved' : this.getAllApproved();
        break;
      case 'rejected' : this.getAllRejected();
        break;
      case 'pending' : this.getAllPending();
        break;
      default : this.getAllRequest();
    }
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

  getAllRequest(){

    console.log('all')
    this.query.getAllRequest().subscribe({
      next : (response) => {
        this.query.Requests.set(response);
      },
      error : (err : HttpErrorResponse) => {
        this.toast.show(err.error, 'error');
      }
    })
  }

  getAllApproved(){

    console.log('app')
    this.query.getApprovedRequests().subscribe({
      next : (response) => {
        this.query.Requests.set(response);
      },
      error : (err : HttpErrorResponse) => {
        this.toast.show(err.error, 'error');
      }
    })
  }

  getAllRejected(){

      console.log('rej')
    this.query.getRejectedRequests().subscribe({
      next : (response) => {
        this.query.Requests.set(response);
      },
      error : (err : HttpErrorResponse) => {
        this.toast.show(err.error, 'error');
      }
    })
  }

  getAllPending(){

    console.log('pend')
    this.query.getPendingRequests().subscribe({
      next : (response) => {
        this.query.Requests.set(response);
      },
      error : (err : HttpErrorResponse) => {
        this.toast.show(err.error, 'error');
      }
    })
  }
}
