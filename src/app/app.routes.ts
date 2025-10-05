import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [

      {
            path: '',
            loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
            canActivate: [AuthGuard],
      },

      {
            path: 'urls',
            loadComponent: () => import('./pages/urls/urls.component').then(m => m.UrlsComponent),
            canActivate: [AuthGuard]
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
