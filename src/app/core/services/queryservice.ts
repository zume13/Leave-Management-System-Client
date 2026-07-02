import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { DashboardResponse, RequestsResponse } from '../../shared/models/query';

@Injectable({
  providedIn: 'root',
})
export class Queryservice {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7215'

  DashboardData = signal<DashboardResponse | null>(null);

  Requests = signal<RequestsResponse[]>([]);

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
}
