import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonInput,
  IonSpinner
} from '@ionic/angular/standalone';

import { ApiErrorResponse } from '../../../../shared/models/api-response.models';
import { AuthApiService } from '../../data-access/auth-api.service';
import { LoginResponse } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonContent,
    IonInput,
    IonButton,
    IonSpinner
  ],
})
export class LoginPage {

  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  username = 'admin';
  password = '123software';
  rememberMe = true;
  showPassword = false;

  loading = false;
  errorMessage = '';
  errorToastOpen = false;
  errorToastTitle = '';
  errorToastMessage = '';
  successMessage = '';
  private errorToastTimer: number | undefined;

  constructor() {
    if (!this.authApi.isAuthenticated()) {
      this.authApi.logout();
    }
  }

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username.trim() || !this.password.trim()) {
      this.openLoginErrorToast('Datos incompletos', 'Ingresa tu usuario y contrasena para continuar.');
      return;
    }

    this.loading = true;

    this.authApi.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response: LoginResponse) => {
        this.loading = false;
        this.successMessage = `Bienvenido ${response.username}. Login correcto.`;
        void this.router.navigateByUrl('/dashboard');
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiErrorResponse | undefined;

        this.loading = false;
        this.openLoginErrorToast(
          this.getErrorTitle(error, apiError),
          this.getFallbackErrorMessage(error, apiError)
        );
      }
    });
  }

  closeErrorToast(): void {
    this.errorToastOpen = false;

    if (this.errorToastTimer) {
      window.clearTimeout(this.errorToastTimer);
      this.errorToastTimer = undefined;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
  }

  private openLoginErrorToast(title: string, message: string): void {
    if (this.errorToastTimer) {
      window.clearTimeout(this.errorToastTimer);
    }

    this.errorMessage = message;
    this.errorToastTitle = title;
    this.errorToastMessage = message;
    this.errorToastOpen = true;
    this.errorToastTimer = window.setTimeout(() => {
      this.errorToastOpen = false;
      this.errorToastTimer = undefined;
    }, 3800);
  }

  private getErrorTitle(error: HttpErrorResponse, apiError?: ApiErrorResponse): string {
    if (error.status === 0) {
      return 'Servicio no disponible';
    }

    const apiMessage = (apiError?.message || '').toLowerCase();

    if (error.status === 401 || error.status === 403) {
      if (apiMessage.includes('bloque') || apiMessage.includes('locked')) {
        return 'Usuario bloqueado';
      }

      if (apiMessage.includes('inactivo') || apiMessage.includes('inactive')) {
        return 'Usuario inactivo';
      }

      return 'Credenciales incorrectas';
    }

    return 'No se pudo iniciar sesion';
  }

  private getFallbackErrorMessage(error: HttpErrorResponse, apiError?: ApiErrorResponse): string {
    const apiMessage = apiError?.message || '';
    const normalizedMessage = apiMessage.toLowerCase();

    if (error.status === 0) {
      return 'No pudimos conectar con autenticacion. Intenta nuevamente en unos segundos.';
    }

    if (error.status === 401 || error.status === 403) {
      if (normalizedMessage.includes('bloque') || normalizedMessage.includes('locked')) {
        return 'Tu cuenta esta bloqueada y no puede iniciar sesion por ahora.';
      }

      if (normalizedMessage.includes('inactivo') || normalizedMessage.includes('inactive')) {
        return 'Tu cuenta esta inactiva. Solicita la activacion a un administrador.';
      }

      return 'El usuario o la contrasena no coinciden.';
    }

    return apiMessage || 'Ocurrio un problema al validar tus credenciales. Intenta nuevamente.';
  }
}
