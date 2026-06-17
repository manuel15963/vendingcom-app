import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';

import { ToastService } from '../../../../core/feedback/toast.service';
import { ApiErrorResponse } from '../../../../shared/models/api-response.models';
import { AuthApiService } from '../../../auth/data-access/auth-api.service';
import { AuthenticatedUserResponse } from '../../../auth/models/auth.models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonSpinner,
    IonText
  ],
})
export class ProfilePage implements OnInit {

  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  profile: AuthenticatedUserResponse | null = null;
  loading = false;
  errorMessage = '';

  readonly session = this.authApi.getCurrentSession();

  get displayName(): string {
    return this.profile?.fullName || this.session?.fullName || this.session?.username || 'Usuario';
  }

  get displayEmail(): string {
    return this.profile?.email || this.session?.email || 'correo no disponible';
  }

  get userInitials(): string {
    const words = this.displayName.trim().split(/\s+/).slice(0, 2);

    return words.map((word) => word[0]?.toUpperCase() || '').join('') || 'VC';
  }

  get primaryRole(): string {
    const firstRole = this.profile?.roles?.[0] || this.session?.roles?.[0] || 'USUARIO';
    const roleCode = typeof firstRole === 'string' ? firstRole : firstRole.roleCode;
    const roleName = typeof firstRole === 'string' ? firstRole : firstRole.roleName;

    return this.formatRole(roleName || roleCode);
  }

  get statusLabel(): string {
    if (this.session?.userStatus === 0) {
      return 'Inactivo';
    }

    if (this.session?.userStatus === 2) {
      return 'Bloqueado';
    }

    return 'Activo';
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authApi.me().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiErrorResponse | undefined;

        this.loading = false;
        this.errorMessage = apiError?.message || 'No se pudo cargar el perfil.';
        void this.toast.error(this.errorMessage);
      }
    });
  }

  logout(): void {
    this.authApi.logout();
    void this.router.navigateByUrl('/login');
  }

  private formatRole(role: string): string {
    const roleMap: Record<string, string> = {
      ADMIN: 'ADMINISTRADOR',
      SUPERVISOR: 'SUPERVISOR',
      OPERATOR: 'OPERADOR',
      USUARIO: 'USUARIO',
      USER: 'USUARIO'
    };
    const normalizedRole = role.trim().toUpperCase();

    return roleMap[normalizedRole] || normalizedRole;
  }
}
