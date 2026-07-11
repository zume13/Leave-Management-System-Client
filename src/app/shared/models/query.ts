export interface DashboardResponse{
    totalEmployees: number | null
    pendingLeaveRequests : number | null
    approvedLeaveRequests : number | null
    rejectedLeaveRequests : number | null
}

export interface RequestsResponse{
  id: string;
  employeeId: string;
  leaveName: string;
  employeeName: string,
  requestDate: string;
  processedDate: string | null;
  startDate: string;
  endDate: string;
  leaveDays: number;
  status: string;
  description: string | null;
  rejectionReason: string | null;
  processedBy: string | null;
}

export interface EmployeeDto {
  id: string;
  name: string;
  email: string;
  status: string;
  department: string;
}

export interface LeavesDto{
    leaveId: string;
    leaveName: string;
    leaveDays: number;
}

export interface GetAllRequestsByEmployeeDto {
  id: string;
  leaveName : string;
  requestDate: string;
  processedDate: string | null;
  startDate: string;
  endDate: string;
  leaveDays: number;
  status: string;
  description: string | null;
  rejectionReason: string | null;
  processedBy: string | null;
}

export interface UpdateLeaveRequestCommand {
  leaveRequestId: string;
  newStartDate: string;
  newEndDate: string;
  newDescription: string;
}

export interface GetAllocationByEmployeeDto {
  allocationId: string;
  leaveName: string;
  leaveBalance: number;
  yearOfValidity: number;
}