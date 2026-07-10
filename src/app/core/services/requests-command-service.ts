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

  createRequest(startDate : string, endDate : string, description : string,employeeId : string, leaveTypeId : string){
    return this.http.post(`${this.baseUrl}/leave-management/leave-request/create`, {
      startDate : startDate,
      endDate : endDate,
      description : description,
      employeeId : employeeId,
      leaveTypeId : leaveTypeId
    });
  }

  cancelRequest(requestId : string){
    return this.http.post(`${this.baseUrl}/leave-management/leave-request/cancel`, {
      LeaveRequestId : requestId
    })
  }

  updateLeaveRequest(requestId : string, startDate : string, endDate : string, description : string){
    return this.http.put(`${this.baseUrl}/leave-management/leave-request/update`, {
      LeaveRequestId  :requestId, 
      newStartDate : startDate, 
      newEndDate : endDate, 
      newDescription : description
    })
  }
  
}
