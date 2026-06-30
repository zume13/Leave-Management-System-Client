
export interface accessTokenPayload{
    sub : string, 
    email : string,
    name : string,
    role : 'Admin' | 'Manager' | 'Employee',
    exp : number
}

export interface logInRequest{
    email : string,
    password : string
}

export interface User {
    id : string,
    email: string,
    name : string,
    role : string
}

export interface authResponse{
    accessToken : string
}

export interface registerRequest{
    
    Email : string,
    EmployeeName : string,
    Password : string,
    DepartmentId : string
}

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
}

export interface DepartmentResponse{
    id : string,
    name : string
}

export interface MenuItems{
    label : string,
    route : string
}