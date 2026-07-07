import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RequestsCommandService {

  private http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

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

  updateLeave(leaveId : string, leaveName : string, leaveDays : number){

    console.log('ror');
    return this.http.put(`${this.baseUrl}/leave-management/leave-type/update`, {
       LeaveTypeId : leaveId, 
       NewName : leaveName,
       NewDays : leaveDays
    });
  }

  deleteLeave(leaveId : string){
    return this.http.delete(`${this.baseUrl}/leave-management/leave-type/delete/${leaveId}`);
  }

  createLeave(leaveName : string, leaveDays : number){
    return this.http.post(`${this.baseUrl}/leave-management/leave-type/create`, {
        Name : leaveName,
        DefaultDays : leaveDays
    });
  }
  
}
