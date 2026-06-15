import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';

import { ApiErrorResponse } from '../../../../shared/models/api-response.models';
import { PasswordApiService } from '../../data-access/password-api.service';

@Component({
  selector: 'app-confirm-recovery',
  templateUrl: './confirm-recovery.page.html',
  styleUrls: ['./confirm-recovery.page.scss'],
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
export class ConfirmRecoveryPage {

  private readonly passwordApi = inject(PasswordApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  email = this.route.snapshot.queryParamMap.get('email') || '';
  code = '';
  newPassword = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  confirmRecovery(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.passwordApi.confirmRecovery({
      email: this.email,
      code: this.code,
      newPassword: this.newPassword
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = response.message;
        void this.router.navigateByUrl('/login');
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiErrorResponse | undefined;

        this.loading = false;
        this.errorMessage = apiError?.message || 'No se pudo restablecer la contrasena.';
      }
    });
  }
}
