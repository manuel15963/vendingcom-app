import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircle, alertCircle, informationCircle } from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private readonly toastController: ToastController) {
    addIcons({ checkmarkCircle, alertCircle, informationCircle });
  }

  async success(message: string): Promise<void> {
    await this.show(message, 'success', 'checkmark-circle');
  }

  async error(message: string): Promise<void> {
    await this.show(message, 'danger', 'alert-circle');
  }

  async info(message: string): Promise<void> {
    await this.show(message, 'primary', 'information-circle');
  }

  private async show(message: string, color: string, icon: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      color,
      icon,
      duration: 2600,
      position: 'top',
      cssClass: 'vc-toast',
    });

    await toast.present();
  }
}
