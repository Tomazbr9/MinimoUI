import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { inject } from '@angular/core';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [

      {
            path: '',
            component: HomeComponent,
            pathMatch: 'full',
            canActivate: [() => inject(AuthGuard).canActivate()]

      },

      {
            path: 'login',
            loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
      },
      
      {
            path: 'register',
            loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
      }
];
