import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(component => component.Dashboard)
  },
  {
    path: 'routine', loadComponent: () => import('./features/routine/routine').then(component => component.Routine),
  },
  {
    path: 'exercises', loadComponent: () => import('./features/exercises/exercises').then(component => component.Exercises)
  },
  {
    path: 'exercise/:id', loadComponent: () => import('./features/exercise/exercise').then(component => component.Exercise)
  },
  {
    path: 'tools', loadComponent: () => import('./features/tools/tools').then(component => component.Tools)
  },
  {
    path: 'profile', loadComponent: () => import('./features/profile/profile').then(component => component.Profile)
  },
  {
    path: 'not-found', loadComponent: () => import('./shared/components/not-found/not-found').then(component => component.NotFound)
  },

  {
    path: '', redirectTo: 'routine', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'routine'
  }
];
