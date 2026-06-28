import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';

import { ApiErrorResponse } from '@shared/models/api-response.models';
import { PASSWORD_HINT, getPasswordError, isPasswordValid } from '@core/validation/password-policy';
import { PasswordApiService } from '../../data-access/password-api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner
  ],
})
export class ChangePasswordPage {

  private readonly passwordApi = inject(PasswordApiService);
  private readonly router = inject(Router);

  currentPassword = '';
  newPassword = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  readonly passwordHint = PASSWORD_HINT;

  get newPasswordError(): string | null {
    return this.newPassword ? getPasswordError(this.newPassword) : null;
  }

  get canSubmit(): boolean {
    return !!this.currentPassword && isPasswordValid(this.newPassword);
  }

  changePassword(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.passwordApi.changeMyPassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = response.message;
        void this.router.navigateByUrl('/dashboard');
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiErrorResponse | undefined;

        this.loading = false;
        this.errorMessage = apiError?.message || 'No se pudo cambiar la contrasena.';
      }
    });
  }
}
