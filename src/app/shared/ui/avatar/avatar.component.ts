import { Component, Input } from '@angular/core';

/** Avatar con iniciales y gradiente de marca. Presentacional. */
@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `<span class="avatar" [attr.data-size]="size">{{ initials }}</span>`,
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() name = '';
  @Input() size: 'md' | 'lg' = 'md';

  get initials(): string {
    const words = (this.name || '').trim().split(/\s+/).slice(0, 2);
    return words.map((w) => w[0]?.toUpperCase() ?? '').join('') || 'C';
  }
}
