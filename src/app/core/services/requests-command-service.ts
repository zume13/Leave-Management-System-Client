import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestsCommandService {

  private http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7215'

  approveRequest(employeeId : string, leaveRequestId : string){
    return this.http.post(`${this.baseUrl}/leave-management/leave-request/approve`, 
      {
        employeeId,
        leaveRequestId
      }
    );
  }

  rejectRequest(employeeId : string, leaveRequestId : string, rejectionReason : string | null){
    return this.http.post(`${this.baseUrl}/leave-management/leave-request/reject`, 
      {
        employeeId,
        leaveRequestId,
        Reason : rejectionReason
      }
    );
  }
  
}
