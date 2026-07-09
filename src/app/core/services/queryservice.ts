import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { DashboardResponse, EmployeeDto, GetAllRequestsByEmployeeDto, LeavesDto, RequestsResponse } from '../../shared/models/query';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Queryservice {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  DashboardData = signal<DashboardResponse | null>(null);

  EmployeeDashBoardData = signal<GetAllRequestsByEmployeeDto[] | null>(null);

  Requests = signal<RequestsResponse[]>([]);

  Employees = signal<EmployeeDto[]>([]);

  Leaves = signal<LeavesDto[]>([]);

  employee = signal<EmployeeDto | null>(null);

  getDashboardData(){
    return this.http.get<DashboardResponse>(`${this.baseUrl}/leave-management/employee/dashboard`);
  }

  getAllEmployeeRequestsById(EmployeeId : string){
    return this.http.get<GetAllRequestsByEmployeeDto[]>(`${this.baseUrl}/leave-management/leave-request/employee/${EmployeeId}`, {
      params : {
        PageNumber : 1, 
        PageSize : 10
      }
    });
  }
 
  getAllRequest(){
    return this.http.get<RequestsResponse[]>(`${this.baseUrl}/leave-management/leave-request/all`, 
      { 
        params : 
        {
          pageNumber : 1,
          pageSize : 10
        }
      });
  }

  getAllEmployees(){
    return this.http.get<EmployeeDto[]>(`${this.baseUrl}/leave-management/employee/all`);
  }

  getEmployeeByName(name : string){
    return this.http.get<EmployeeDto[]>(`${this.baseUrl}/leave-management/employee/search-by-name`, 
      {
          params : 
        {
          name : name,
          pageNumber : 1,
          pageSize : 10
        }
      });
  }

  getEmployeeById(employeeId : string){
    return this.http.get<EmployeeDto>(`${this.baseUrl}/leave-management/employee/${employeeId}`);
  }

  getEmployeeByDepartment(departmentId : string){
    return this.http.get<EmployeeDto[]>(`${this.baseUrl}/leave-management/employee/in-department/${departmentId}`, 
        {
          params : {
            pageSize : 10,
            pageNumber : 1
          }
        }
    );
  }

  getPendingRequests(){

    return this.http.get<RequestsResponse[]>(`${this.baseUrl}/leave-management/leave-request/pending`, 
      { 
        params : 
        {
          pageNumber : 1,
          pageSize : 10
        }
      });
  
  }

  getApprovedRequests(){

    return this.http.get<RequestsResponse[]>(`${this.baseUrl}/leave-management/leave-request/approved`, 
      { 
        params : 
        {
          pageNumber : 1,
          pageSize : 10
        }
      });
  

  }

  getRejectedRequests(){

    return this.http.get<RequestsResponse[]>(`${this.baseUrl}/leave-management/leave-request/rejected`, 
      { 
        params : 
        {
          pageNumber : 1,
          pageSize : 10
        }
      });
  

  }

  getLeaves(){
    return this.http.get<LeavesDto[]>(`${this.baseUrl}/leave-management/leave-type/all`, {
      params : {
        pageSize : 10,
        pageNumber : 1
      }
    });
  }
}
