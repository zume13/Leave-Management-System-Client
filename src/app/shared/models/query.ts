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

