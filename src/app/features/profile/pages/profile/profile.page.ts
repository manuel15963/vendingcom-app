import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
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
    IonBadge,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar
  ],
})
export class ProfilePage implements OnInit {

  private readonly authApi = inject(AuthApiService);
  private readonly toast = inject(ToastService);

  profile: AuthenticatedUserResponse | null = null;
  loading = false;
  errorMessage = '';

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
}
