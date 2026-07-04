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

  Employee = signal<EmployeeDto | null>(null);

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
    console.log('hit')
    return this.http.get<EmployeeDto[]>(`${this.baseUrl}/leave-management/employee/all`);
  }

  getEmployeeById(employeeId : string){
    return this.http.get<EmployeeDto>(`${this.baseUrl}/leave-management/employee/${employeeId}`);
  }
}
