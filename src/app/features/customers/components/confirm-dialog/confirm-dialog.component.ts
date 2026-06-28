import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonModal, IonSpinner } from '@ionic/angular/standalone';

/**
 * Diálogo de confirmación reutilizable y a tono con el diseño.
 * variant 'danger' lo pinta en rojo (para acciones destructivas).
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, IonModal, IonSpinner],
})
export class ConfirmDialogComponent {

  @Input() open = false;
  @Input() title = '¿Estás seguro?';
  @Input() message = '';
  @Input() confirmText = 'Confirmar';
  @Input() variant: 'primary' | 'danger' = 'primary';
  @Input() busy = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}
