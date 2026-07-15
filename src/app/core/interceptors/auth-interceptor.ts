import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('accessToken'); 
  const authReq = token 
    ? req.clone({ setHeaders : { Authorization: `Bearer ${token}` } })
    : req;

    return next(authReq).pipe(
      catchError((err : HttpErrorResponse) => {
        if(err.status === 401 && !req.url.includes('/auth/refresh-token')){
          console.log('error');

          return from(auth.refreshToken()).pipe(
            switchMap(refreshed => {
              if(!refreshed){
                console.log('cleared token');
                auth.clearToken();
                router.navigateByUrl('/login');
                return throwError(() => err);
              }

              const newToken = localStorage.getItem('accessToken');
              const newAuthReq = req.clone({ setHeaders : { Authorization : `Bearer ${newToken}` }});
              return next(newAuthReq);
            })
          )
        }
        return throwError(() => err);
      })
    )

};
