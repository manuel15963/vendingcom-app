import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService, LoginResponse } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner
  ],
})
export class HomePage {

  private readonly authService = inject(AuthService);

  username = 'admin';
  password = '123456';

  loading = false;
  errorMessage = '';
  successMessage = '';

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response: LoginResponse) => {
        this.loading = false;
        this.successMessage = `Bienvenido ${response.username}. Login correcto.`;
        console.log('LOGIN OK:', response);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'No se pudo iniciar sesión.';
        console.error('LOGIN ERROR:', error);
      }
    });
  }
}