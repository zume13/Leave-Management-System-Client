import { Routes } from '@angular/router';
import { BlankComponent } from './features/auth/blank-component/blank-component';
import { homeRedirectGuardGuard } from './core/guards/home-redirect-guard-guard';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { adminGuardGuard } from './core/guards/admin-guard-guard';
import { employeeGuardGuard } from './core/guards/employee-guard-guard';

export const routes: Routes = [
    {
        path : '',
        pathMatch : 'full',
        canActivate : [homeRedirectGuardGuard],
        component : BlankComponent
    },
    {
        path : 'login',
        loadComponent : () => import('./features/auth/login/login').then(m => m.Login)
    },
    {
        path : 'register',
        loadComponent : () => import('./features/auth/register/register').then(m => m.Register)
    },
    {
        path: 'admin/dashboard',
        canActivate : [authGuardGuard, adminGuardGuard],
        loadComponent : () => import('./features/dashboards/admin/admin').then(m => m.Admin)
        
    },
    {
        path : 'employee/dashboard',
        canActivate : [authGuardGuard, employeeGuardGuard],
        loadComponent : () => import('./features/dashboards/employee/employee').then(m => m.Employee)
    },
        {
        path : '**',
        loadComponent : () => import('./features/auth/not-found/not-found').then(m => m.NotFound)
    }
];
