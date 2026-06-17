import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent
} from '@ionic/angular/standalone';

import { AuthApiService } from '../../../auth/data-access/auth-api.service';

interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  tone: 'blue' | 'green' | 'purple' | 'orange';
  icon: string;
  points: number[];
}

interface DashboardActivity {
  title: string;
  detail: string;
  time: string;
  tone: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    RouterLink
  ],
})
export class DashboardPage {

  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  readonly session = this.authApi.getCurrentSession();
  readonly canOpenAdmin = this.authApi.hasAnyRole(['ADMIN', 'SUPERVISOR']);
  readonly userInitials = this.getUserInitials();
  readonly displayName = this.session?.fullName || this.session?.username || 'usuario';

  readonly metrics: DashboardMetric[] = [
    {
      label: 'Usuarios activos',
      value: '128',
      change: '+12 este mes',
      tone: 'blue',
      icon: 'assets/dashboard/icons/users.svg',
      points: [24, 22, 25, 21, 21, 32, 29, 24],
    },
    {
      label: 'Maquinas registradas',
      value: '24',
      change: '+2 este mes',
      tone: 'green',
      icon: 'assets/dashboard/icons/vending.svg',
      points: [18, 20, 17, 20, 16, 16, 23, 28],
    },
    {
      label: 'Roles definidos',
      value: '6',
      change: 'Sin cambios',
      tone: 'purple',
      icon: 'assets/dashboard/icons/roles.svg',
      points: [16, 18, 15, 15, 15, 20, 17, 27],
    },
    {
      label: 'Eventos recientes',
      value: '156',
      change: '+18 este mes',
      tone: 'orange',
      icon: 'assets/dashboard/icons/audit.svg',
      points: [15, 18, 16, 20, 16, 16, 25, 31],
    },
  ];

  readonly activities: DashboardActivity[] = [
    {
      title: 'Nuevo usuario registrado',
      detail: 'admin.juarez@empresa.com',
      time: 'Hace 10 min',
      tone: 'green',
      icon: 'assets/dashboard/icons/users.svg',
    },
    {
      title: 'Rol actualizado',
      detail: 'Rol ADMIN modificado',
      time: 'Hace 35 min',
      tone: 'blue',
      icon: 'assets/dashboard/icons/roles.svg',
    },
    {
      title: 'Maquina registrada',
      detail: 'Maquina #VM-0024 agregada',
      time: 'Hace 1 hora',
      tone: 'orange',
      icon: 'assets/dashboard/icons/vending.svg',
    },
    {
      title: 'Usuario desactivado',
      detail: 'juan.perez@empresa.com',
      time: 'Hace 2 horas',
      tone: 'purple',
      icon: 'assets/dashboard/icons/profile.svg',
    },
    {
      title: 'Intento de acceso fallido',
      detail: 'IP: 190.23.45.67',
      time: 'Hace 3 horas',
      tone: 'orange',
      icon: 'assets/dashboard/icons/activity.svg',
    },
  ];

  logout(): void {
    this.authApi.logout();
    void this.router.navigateByUrl('/login');
  }

  private getUserInitials(): string {
    const source = this.session?.fullName || this.session?.username || 'VC';
    const words = source.trim().split(/\s+/).slice(0, 2);

    return words.map((word) => word[0]?.toUpperCase() || '').join('') || 'VC';
  }
}
