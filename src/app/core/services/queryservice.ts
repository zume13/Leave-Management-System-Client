import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { DashboardResponse, EmployeeDto, RequestsResponse } from '../../shared/models/query';

@Injectable({
  providedIn: 'root',
})
export class Queryservice {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7215'

  DashboardData = signal<DashboardResponse | null>(null);

  Requests = signal<RequestsResponse[]>([]);

  Employees = signal<EmployeeDto[]>([]);

  getDashboardData(){
    return this.http.get<DashboardResponse>(`${this.baseUrl}/leave-management/employee/dashboard`);
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
}
