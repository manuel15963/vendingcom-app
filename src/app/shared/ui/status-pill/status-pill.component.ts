import { Component, Input } from '@angular/core';

/** Píldora de estado reutilizable (ACTIVO/INACTIVO u otro). Presentacional. */
@Component({
  selector: 'app-status-pill',
  standalone: true,
  template: `<span class="pill" [class.on]="active" [class.sm]="size === 'sm'">{{ label }}</span>`,
  styleUrls: ['./status-pill.component.scss'],
})
export class StatusPillComponent {
  @Input() active = false;
  @Input() label = '';
  @Input() size: 'sm' | 'md' = 'md';
}
