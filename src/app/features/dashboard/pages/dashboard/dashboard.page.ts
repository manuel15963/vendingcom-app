import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import { AuthApiService } from '../../../auth/data-access/auth-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton
  ],
})
export class DashboardPage {

  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  readonly session = this.authApi.getCurrentSession();
  readonly canOpenAdmin = this.authApi.hasAnyRole(['ADMIN', 'SUPERVISOR']);

  logout(): void {
    this.authApi.logout();
    void this.router.navigateByUrl('/login');
  }
}
