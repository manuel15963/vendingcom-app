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

import { ApiErrorResponse } from '../../../../shared/models/api-response.models';
import { PasswordApiService } from '../../data-access/password-api.service';

@Component({
  selector: 'app-request-recovery',
  templateUrl: './request-recovery.page.html',
  styleUrls: ['./request-recovery.page.scss'],
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
export class RequestRecoveryPage {

  private readonly passwordApi = inject(PasswordApiService);
  private readonly router = inject(Router);

  email = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  requestRecovery(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.passwordApi.requestRecovery({ email: this.email }).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = response.message;
        void this.router.navigate(['/password/recovery/confirm'], {
          queryParams: { email: this.email },
        });
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiErrorResponse | undefined;

        this.loading = false;
        this.errorMessage = apiError?.message || 'No se pudo solicitar el codigo.';
      }
    });
  }
}
