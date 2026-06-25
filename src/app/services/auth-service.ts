import { inject, Injectable, signal } from '@angular/core';
import { User } from '../shared/models/auth';
import { jwtDecode } from 'jwt-decode'
import { accessTokenPayload, authResponse, logInRequest, registerRequest } from '../shared/models/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(){
    this.restoreUser();
  }

  currentUser = signal<User | null>(null)
  http = inject(HttpClient)
  router = inject(Router)
  private readonly baseUrl = "https://localhost:7215";

  login(request : logInRequest){
    this.http.post<authResponse>(
      `${this.baseUrl}/leave-management/employee/auth/login`, 
      request);
  }

  restoreUser() {
    const token =
      localStorage.getItem(
        'access_token'
      );

    if (!token) {
      return;
    }

    try {

      const payload =
        jwtDecode<accessTokenPayload>(token);

      this.currentUser.set({
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role
      });

    } catch {

      this.logout();
    }
  }

  //try refreshToken endpoint to renew-user
   logout() {

    localStorage.removeItem(
      'access_token'
    );

    this.currentUser.set(null);

    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    this.currentUser() !== null
  }

  setToken(token : string){
    localStorage.setItem('accessToken', token);

    const payload = jwtDecode<accessTokenPayload>(token);

    this.currentUser.set({
      id : payload.sub,
      email : payload.email,
      name : payload.name,
      role : payload.role
    });
  }

  getRole(){
    return this.currentUser()?.role;
  }

  register(request : registerRequest){
    this.http.post(
      `${this.baseUrl}/leave-management/employee/auth/register`, 
      request);
  }
}
