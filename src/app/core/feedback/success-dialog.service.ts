import { Injectable, signal } from '@angular/core';

export interface SuccessDialogState {
  open: boolean;
  title: string;
  message: string;
}

/**
 * Modal de éxito global (ventana emergente bonita).
 * Se dispara desde cualquier parte con `show(titulo, mensaje)` y se pinta
 * una sola vez en el root (<app-success-dialog/>).
 */
@Injectable({ providedIn: 'root' })
export class SuccessDialogService {

  readonly state = signal<SuccessDialogState>({ open: false, title: '', message: '' });

  show(title: string, message = ''): void {
    this.state.set({ open: true, title, message });
  }

  close(): void {
    this.state.update((s) => ({ ...s, open: false }));
  }
}
