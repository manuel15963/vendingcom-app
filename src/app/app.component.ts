import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { SuccessDialogComponent } from '@shared/ui/success-dialog/success-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, SuccessDialogComponent],
})
export class AppComponent {}
