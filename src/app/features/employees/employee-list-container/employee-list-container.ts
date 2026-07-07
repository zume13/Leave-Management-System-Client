import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Queryservice } from '../../../core/services/queryservice';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetails } from '../../../shared/models/auth';
import { ToastService } from '../../../core/services/toast-service';
import { ToastContainer } from "../../../shared/components/toast-container/toast-container";
import { subscribeOn } from 'rxjs';
import { Modal } from "../../../shared/modal/modal";
import { EmployeeDto } from '../../../shared/models/query';

@Component({
  selector: 'app-employee-list-container',
  imports: [FormsModule, ToastContainer, Modal],
  templateUrl: './employee-list-container.html',
  styleUrl: './employee-list-container.css',
})
export class EmployeeListContainer implements OnInit {

  query = inject(Queryservice);
  toast = inject(ToastService);


  departments = [
    {
      id: '',
      name: 'Select a department'
    },
    {
      id: '18A713B6-0B45-4E00-B9F0-B25213451EAB',
      name: 'Human Resources'
    },
    {
      id: '08990409-C11F-44B4-B8F6-6C4FDB237CEB',
      name: 'Finance'
    },
    {
      id: 'F924497F-574A-4272-84B1-9AD1E47067A2',
      name: 'Marketing'
    },
    {
      id: '23CDCB51-B303-448F-A882-0B1E0C9EC4E7',
      name: 'Engineering'
    }
  ];
  
  selectedFilter = signal<'all' | 'name' | 'department'>('all');
  employeeName = signal('');
  departmentId = signal('');
  showViewModal = signal<boolean>(false);
  

  ngOnInit(): void {
    this.getEmployees();
  }

  openModal(){
    this.showViewModal.set(true);
  }

  closeModal(){
    this.showViewModal.set(false);
  }

  viewEmployee(employeeId : string){
    const matched = this.query.Employees().find((value) => value.id === employeeId);

    if(!matched){
      this.toast.show('Employee not found', 'error');
      return
    }
      
    this.query.employee.set(matched);
    this.openModal();

  }

  searchEmployeeByName(){

    if(this.employeeName() === ''){
      return 
    }

    this.query.getEmployeeByName(this.employeeName()).subscribe({
      next : (response) => {
        this.query.Employees.set(response);
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails;

        this.toast.show(problem.detail, 'error');
      }
    });
  }

  getEmployeesByDepartment(){

    if(this.departmentId() === ''){
      console.error('null dept id');
      return 
    }
    console.log(this.departmentId());
    this.query.getEmployeeByDepartment(this.departmentId()).subscribe({
      next : (response) => {
        this.query.Employees.set(response);
      },
      error : (err : HttpErrorResponse) => {
        this.toast.show(err.error, 'error');
      }
    })

  }

  changedFilter(value: 'all' | 'name' | 'department'){
    this.selectedFilter.set(value)

    this.query.Employees.set([]);

    if(value === 'all'){
      this.getEmployees();
    }

    if(value !== 'name'){
      this.employeeName.set('');
    }

    if(value !== 'department'){
      this.departmentId.set('');
    }
  }


  getEmployees(){

    if(this.query.Employees().length > 0 && this.selectedFilter() === 'all'){
      return;
    }

    this.query.getAllEmployees().subscribe({
      next : (response) => {
        this.query.Employees.set(response);
      },
      error : (err : HttpErrorResponse) => {
        const problem = err.error as ProblemDetails

        this.toast.show(problem.detail, 'error');
      } 
    });
  }

  search(){

    switch(this.selectedFilter()){
      case 'name' : this.searchEmployeeByName();
        break;
      case 'department' : this.getEmployeesByDepartment();
        break;
      default : this.getEmployees();
    }

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
