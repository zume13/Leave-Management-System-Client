import { Component, inject, signal, computed, OnInit, effect } from '@angular/core';
import { Queryservice } from '../../../core/services/queryservice';
import { RequestsCommandService } from '../../../core/services/requests-command-service';
import { AuthService } from '../../../core/services/auth-service';
import { ToastService } from '../../../core/services/toast-service';
import { ToastContainer } from "../../../shared/components/toast-container/toast-container";
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe, NgClass } from '@angular/common';
import { Modal } from '../../../shared/modal/modal';
import { GetAllRequestsByEmployeeDto, UpdateLeaveRequestCommand } from '../../../shared/models/query';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProblemDetails } from '../../../shared/models/auth';

@Component({
  selector: 'app-employee',
  imports: [ToastContainer, DatePipe, Modal, FormsModule, NgClass, ReactiveFormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit{

  query = inject(Queryservice);
  command = inject(RequestsCommandService);
  auth = inject(AuthService);
  toast = inject(ToastService);
  builder = inject(FormBuilder);

  leaveTypes = new Map<string, string> ([
    ["Vacation Leave", "DECC14C1-2016-4622-B238-13232EE54D1B"],
    ["Maternity Leave", "EBF174D3-D5BD-4976-B7DC-CE1DEA47D287"],
    ["Sick Leave", "BB1A0633-F67D-4D19-A1F5-F6F114D5FA41"]
  ]);
      
  ngOnInit(): void {
    if(this.query.EmployeeDashBoardData()){
      return;
    }

    this.getEmployeeRequests();
  }

  totalRequests = computed(() => {
    const requests = this.query.EmployeeDashBoardData() ?? [];
    return requests.length 
  });

  totalPendingRequest = computed(() => {
    const requests = this.query.EmployeeDashBoardData() ?? [];

    return requests.filter(x => x.status === 'Pending').length;
  });

  totalApprovedRequest = computed(() => {
    const requests = this.query.EmployeeDashBoardData() ?? [];
    return requests.filter(value => value.status === 'Approved').length 
  });

  totalRejectedRequest = computed(() => {
    const requests = this.query.EmployeeDashBoardData()?.filter(value => value.status === 'Rejected') ?? [];
    return requests.filter(value => value.status === 'Rejected').length 
  });

  showCreateModal = signal<boolean>(false);
  showUpdateModal = signal<boolean>(false);
  showCancelModal = signal<boolean>(false);
  showViewModal = signal<boolean>(false);

  updateForm = this.builder.nonNullable.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  selectedRequest = signal<GetAllRequestsByEmployeeDto | null>(null);

  getEmployeeRequests(){

    if(this.auth.currentUser()?.id === null){
      console.error('Id not found');
      return;
    }

    this.query.getAllEmployeeRequestsById(this.auth.currentUser()!.id).subscribe({
      next : (response) => {
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
    this.closeViewModal();
  }
  openCancelModal(requestId : string){
    this.closeViewModal();
    this.showCancelModal.set(true);
  }
  openViewModal(requestId : string){
    const matched = 
      this.query.EmployeeDashBoardData()?.find(
        value => value.id === requestId);

    if(!matched){
      return
    }

    this.selectedRequest.set(matched);
    
    this.showViewModal.set(true);
  }

  closeCreateModal(){
    this.showCreateModal.set(false);
  }
  closeUpdateModal(){
    this.showUpdateModal.set(false);
  }
  closeCancelModal(){
    this.showCancelModal.set(false);
  }
  closeViewModal(){
    this.showViewModal.set(false);
  }

  updateRequest(){

    const { startDate, endDate, description } = this.updateForm.getRawValue();

    if(this.updateForm.invalid){
      this.updateForm.markAllAsTouched();
      console.log('form');
      return
    }

    const requestId = this.selectedRequest()?.id;

    if(!requestId){
      console.log('i');
      return
    }

    this.command.updateLeaveRequest(requestId, startDate, endDate, description).subscribe({
      next : () => {
        this.toast.show('Updated leave request', 'success');
        this.getEmployeeRequests();
        this.closeUpdateModal();
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails

        this.toast.show(problem.detail, 'error');
        this.closeUpdateModal();
      }
    })
  }

  cancelLeaveRequest(){

    const id = this.selectedRequest()?.id;

    if(!id){
      return 
    }
    this.command.cancelRequest(id).subscribe({
      next : () => {
        this.toast.show('Cancelled leave request', 'success');
        this.getEmployeeRequests();
        this.closeCancelModal();
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails

        this.toast.show(problem.detail, 'error');
        this.closeCancelModal();
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
}