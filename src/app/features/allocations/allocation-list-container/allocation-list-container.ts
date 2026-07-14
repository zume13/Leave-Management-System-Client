import { Component, inject, OnInit, signal } from '@angular/core';
import { ToastService } from '../../../core/services/toast-service';
import { ToastContainer } from "../../../shared/components/toast-container/toast-container";
import { Queryservice } from '../../../core/services/queryservice';
import { AuthService } from '../../../core/services/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestsCommandService } from '../../../core/services/requests-command-service';
import { GetAllocationByEmployeeDto } from '../../../shared/models/query';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../../shared/modal/modal';
import { ProblemDetails } from '../../../shared/models/auth';

@Component({
  selector: 'app-allocation-list-container',
  imports: [ToastContainer, ReactiveFormsModule, Modal],
  templateUrl: './allocation-list-container.html',
  styleUrl: './allocation-list-container.css',
})
export class AllocationListContainer implements OnInit {

  toast = inject(ToastService);
  query = inject(Queryservice);
  auth = inject(AuthService);
  command = inject(RequestsCommandService);
  builder = inject(FormBuilder);

  showCreateModal = signal<boolean>(false);
  selectedAllocation = signal<GetAllocationByEmployeeDto | null>(null);

  LeaveForm = this.builder.nonNullable.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  openCreateModal(allocationId : string){
    this.showCreateModal.set(true);
    const allocation = this.query.Allocations().find(value => value.allocationId === allocationId);

    if(!allocation){
      return 
    }

    this.selectedAllocation.set(allocation);
  }

  closeCreateModal(){
    this.showCreateModal.set(false);
  }

  ngOnInit(): void {

    if(this.query.Allocations().length > 0){
      return
    }

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

  createLeaveRequest(){

    const { startDate, endDate, description } = this.LeaveForm.getRawValue();

    const leaveId = this.selectedAllocation()?.leaveTypeId;

    const employeeId = this.auth.currentUser()?.id;

    if(!leaveId || !employeeId){
      return
    }

    this.command.createRequest(startDate, endDate, description, employeeId, leaveId).subscribe({
      next : () => {
        this.toast.show('Used Allocation', 'success');
        this.getAllocations();
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails

        this.toast.show(problem.detail, 'error');
      }
    });
  }

}
