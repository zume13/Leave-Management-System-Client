import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/auth';
import { jwtDecode } from 'jwt-decode'
import { accessTokenPayload, authResponse, logInRequest, registerRequest } from '../../shared/models/auth';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http = inject(HttpClient)
  router = inject(Router)
  private readonly baseUrl = "https://localhost:7215";
  currentUser = signal<User | null>(null);
  refreshInFlight : Promise<boolean> | null = null;

  constructor(){
    this.restoreUser();
  }

  login(request : logInRequest){
    return this.http.post<authResponse>(
      `${this.baseUrl}/leave-management/employee/auth/login`, 
      request)
      .pipe(
        tap(response => {
          this.setToken(response.accessToken)
        }));
  }

  async restoreUser() : Promise<void> {
    const token =
      localStorage.getItem(
        'accessToken'
      );

    if (!token) {
      return;
    }

    try {

      const payload =
        jwtDecode<accessTokenPayload>(token);

        const IsExpired = payload.exp * 1000 <= Date.now();

        if(IsExpired){
          const refreshed = await this.refreshToken()
          if(!refreshed){
            this.logout()
            return
          }
          return this.restoreUser();
        }

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

  async refreshToken(){
    if(this.refreshInFlight){
      return this.refreshInFlight;
    }
    this.refreshInFlight = this.doRefresh()
    try{
      return await this.refreshInFlight
    }finally{

      this.refreshInFlight = null
    }
  }

  async doRefresh() : Promise<boolean> {
    try{
      const response = await firstValueFrom(
        this.http.post<authResponse>(`${this.baseUrl}/leave-management/employee/auth/refresh-token`, {}, {withCredentials : true})
      );

      localStorage.setItem('accessToken', response.accessToken)
      return true
    }catch{
      return false

    }
  }

   logout() {
    localStorage.removeItem(
      'access_token'
    );

    this.currentUser.set(null);

    this.http.post(`${this.baseUrl}/leave-management/employee/auth/logout`, {}, {withCredentials : true})

    this.router.navigate(['/login']);
  }

  isLoggedIn() : boolean {
    return this.currentUser() !== null
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
   return this.http.post(
      `${this.baseUrl}/leave-management/employee/auth/register`, 
      request);
  }
}
