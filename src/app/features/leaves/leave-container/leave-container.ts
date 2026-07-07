import { Component, inject, OnInit, signal } from '@angular/core';
import { Modal } from '../../../shared/modal/modal';
import { FormsModule } from '@angular/forms';
import { LeavesDto } from '../../../shared/models/query';
import { Queryservice } from '../../../core/services/queryservice';
import { RequestsCommandService } from '../../../core/services/requests-command-service';
import { ToastContainer } from "../../../shared/components/toast-container/toast-container";
import { ToastService } from '../../../core/services/toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from '../../../shared/models/auth';

@Component({
  selector: 'app-leave-container',
  imports: [Modal, FormsModule, ToastContainer],
  templateUrl: './leave-container.html',
  styleUrl: './leave-container.css',
})
export class LeaveContainer implements OnInit{

  query = inject(Queryservice);
  command = inject(RequestsCommandService);
  toast = inject(ToastService);

  showCreateModal = signal<boolean>(false);
  showEditModal = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);

  LeaveName = signal('');
  LeaveDays = signal<number | null>(null);
  SelectedLeave = signal<LeavesDto | null>(null);

  ngOnInit(): void {
    if(this.query.Leaves().length > 0){
      return;
    }
    this.getLeaves();
  }

  createLeave(){

        if (
        this.LeaveName().trim() === '' ||
        this.LeaveDays() === null ||
        this.LeaveDays()!.toString().trim() === ''
    ) {
        this.toast.show('Fill up all fields', 'error');
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(this.LeaveName().trim())) {
        this.toast.show('Leave name should contain letters only.', 'error');
        return;
    }

    if (!/^\d+$/.test(this.LeaveDays()!.toString())) {
        this.toast.show('Leave days should contain numbers only.', 'error');
        return;
    }

    this.command.createLeave(this.LeaveName(), this.LeaveDays()!).subscribe({
      next : () => {
        this.getLeaves();
        this.toast.show('Leave created successfully', 'success');
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails

        this.toast.show(problem.detail, 'error');
      }
    })
    this.closeCreateModal();
    this.LeaveName.set('');
    this.LeaveDays.set(null);
  }

  updateLeave(leaveId : string){

     if (
        this.LeaveName().trim() === '' ||
        this.LeaveDays() === null ||
        this.LeaveDays()!.toString().trim() === ''
    ) {
        this.toast.show('Fill up all fields', 'error');
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(this.LeaveName().trim())) {
        this.toast.show('Leave name should contain letters only.', 'error');
        return;
    }

    if (!/^\d+$/.test(this.LeaveDays()!.toString())) {
        this.toast.show('Leave days should contain numbers only.', 'error');
        return;
    }

    this.command.updateLeave(leaveId, this.LeaveName(), this.LeaveDays()!).subscribe({
      next : (response) => {
        this.getLeaves();
        this.toast.show('Leave successfully modified.', 'success');
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails

        this.toast.show(problem.detail, 'error');
      }
    });
    this.closeEditModal();
    this.LeaveName.set('');
    this.LeaveDays.set(null);
  }

  deleteLeave(leaveId : string){

    this.command.deleteLeave(leaveId).subscribe({
      next : () => {
        this.getLeaves();
        this.toast.show('Leave successfully removed.', 'success');
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails

        this.toast.show(problem.detail, 'error');
      }
    })
      this.closeDeleteModal();
      this.LeaveName.set('');
      this.LeaveDays.set(null);
    }

  getLeaves(){

    this.query.getLeaves().subscribe({
      next : (response) => {
        this.query.Leaves.set(response);
      },
      error : (err : HttpErrorResponse) => {
        this.toast.show(err.error, 'error');
      }
    })
  }

  openCreateModal(){
    this.showCreateModal.set(true);
  }

  closeCreateModal(){
    this.showCreateModal.set(false);
  }

  openEditModal(leaveId : string){
    const matched = this.query.Leaves().find(value => value.leaveId === leaveId);

    if(matched){
      this.SelectedLeave.set(matched);
      this.showEditModal.set(true);
      return;
    }

    this.toast.show('Leave not found', 'error');
  }

  closeEditModal(){
    this.showEditModal.set(false);
  }

  openDeleteModal(leaveId : string){
    const matched = this.query.Leaves().find(value => value.leaveId === leaveId);

    if(matched){
      this.SelectedLeave.set(matched);
      this.showDeleteModal.set(true);
      return;
    }

    this.toast.show('Leave not found', 'error');
  }

  closeDeleteModal(){
    this.showDeleteModal.set(false);
  }
}
