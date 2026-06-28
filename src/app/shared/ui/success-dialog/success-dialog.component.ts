import { Component, inject } from '@angular/core';
import { IonModal } from '@ionic/angular/standalone';

import { SuccessDialogService } from '@core/feedback/success-dialog.service';

/**
 * Ventana emergente de éxito (check verde). Se monta una sola vez en el root.
 * Su contenido lo controla SuccessDialogService.
 */
@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
  standalone: true,
  imports: [IonModal],
})
export class SuccessDialogComponent {

  private readonly svc = inject(SuccessDialogService);
  readonly state = this.svc.state;

  close(): void {
    this.svc.close();
  }
}
