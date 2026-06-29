import { Routes } from '@angular/router';

import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'password/recovery',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/password/pages/request-recovery/request-recovery.page').then((m) => m.RequestRecoveryPage),
  },
  {
    path: 'password/recovery/confirm',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/password/pages/confirm-recovery/confirm-recovery.page').then((m) => m.ConfirmRecoveryPage),
  },
  {
    path: 'password/change',
    canActivate: [authGuard],
    loadComponent: () => import('./features/password/pages/change-password/change-password.page').then((m) => m.ChangePasswordPage),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/profile/pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/admin/pages/admin-panel/admin-panel.page').then((m) => m.AdminPanelPage),
  },
  {
    path: 'customers',
    canActivate: [authGuard],
    loadComponent: () => import('./features/customers/pages/customers-list/customers-list.page').then((m) => m.CustomersListPage),
  },
  {
    path: 'customers/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/customers/pages/customer-detail/customer-detail.page').then((m) => m.CustomerDetailPage),
  },
  {
    path: 'locations',
    canActivate: [authGuard],
    loadComponent: () => import('./features/locations/pages/locations-list/locations-list.page').then((m) => m.LocationsListPage),
  },
  {
    path: 'locations/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/locations/pages/location-detail/location-detail.page').then((m) => m.LocationDetailPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
