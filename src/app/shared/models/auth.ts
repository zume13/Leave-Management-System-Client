
export interface accessTokenPayload{
    sub : string, 
    email : string,
    name : string,
    role : 'admin' | 'manager' | 'employee';
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
    name : string,
    email : string,
    password : string,
    deptId : string
}