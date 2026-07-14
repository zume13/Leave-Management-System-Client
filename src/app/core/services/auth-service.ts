import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/auth';
import { jwtDecode } from 'jwt-decode'
import { accessTokenPayload, authResponse, logInRequest, registerRequest } from '../../shared/models/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http = inject(HttpClient)
  router = inject(Router)
  private readonly baseUrl = environment.baseUrl;
  currentUser = signal<User | null>(null);
  refreshInFlight : Promise<boolean> | null = null;

  private readonly _token = signal<string | null>(localStorage.getItem('accessToken'));

  readonly isLoggedIn = computed(() => this._token() !== null);

  constructor(){
    this.restoreUser();
    window.addEventListener('storage', () => {
        this._token.set(localStorage.getItem('accessToken'));
      });
  }

  login(request : logInRequest){

    return this.http.post<authResponse>(
      `${this.baseUrl}/leave-management/employee/auth/login`, 
      request, {withCredentials : true})
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
             this.clearToken();
             this.router.navigateByUrl('/login')
            return
          }
          return  await this.restoreUser();
        }

      this.currentUser.set({
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role
      });

    } catch {
      this.clearToken();
      this.router.navigateByUrl('/login')
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

      this.setToken(response.accessToken);
      return true
    }catch{
      return false
    }
  }

  clearToken() {
  localStorage.removeItem('accessToken');
  this._token.set(null);
  this.currentUser.set(null);
}

  logout() {
    return this.http.post(`${this.baseUrl}/leave-management/employee/auth/logout`, {}, {withCredentials : true});
  }

  setToken(token : string){
    localStorage.setItem('accessToken', token);
    this._token.set(token);
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
