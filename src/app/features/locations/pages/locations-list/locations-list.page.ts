import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline } from 'ionicons/icons';

import { SuccessDialogService } from '@core/feedback/success-dialog.service';
import { ToastService } from '@core/feedback/toast.service';
import { ApiErrorResponse, ApiMessageResponse } from '@shared/models/api-response.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusPillComponent } from '@shared/ui/status-pill/status-pill.component';
import { LocationFormModalComponent } from '../../components/location-form-modal/location-form-modal.component';
import { LocationsApiService } from '../../data-access/locations-api.service';
import { LocationResponse } from '../../models/location.models';
import { StatusLabel } from '../../models/location.constants';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.page.html',
  styleUrls: ['./locations-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonContent,
    IonSpinner,
    IonIcon,
    LocationFormModalComponent,
    AvatarComponent,
    StatusPillComponent,
  ],
})
export class LocationsListPage implements OnInit {

  private readonly locationsApi = inject(LocationsApiService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly success = inject(SuccessDialogService);

  constructor() {
    addIcons({ eyeOutline, createOutline });
  }

  locations: LocationResponse[] = [];
  loading = false;
  errorMessage = '';

  search = '';
  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;

  // Modal de crear/editar ubicación
  formModalOpen = false;
  editingLocationId: number | null = null;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = '';

    this.locationsApi.search({ search: this.search.trim() || undefined, page: this.page, size: this.size }).subscribe({
      next: (paged) => {
        this.locations = paged.content;
        this.totalElements = paged.totalElements;
        this.totalPages = paged.totalPages;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudieron cargar las ubicaciones.';
      },
    });
  }

  applySearch(): void {
    this.page = 0;
    this.load();
  }

  nextPage(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.load();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.load();
    }
  }

  isActive(location: LocationResponse): boolean {
    return location.locationStatusName === StatusLabel.ACTIVE;
  }

  /** Subtítulo de la tarjeta: tipo · zona/distrito. */
  subtitle(location: LocationResponse): string {
    const place = location.zoneName || location.district || location.addressLine || 'sin zona';
    return `${location.locationTypeName ?? 'Ubicación'} · ${place}`;
  }

  newLocation(): void {
    this.editingLocationId = null;
    this.formModalOpen = true;
  }

  editLocation(location: LocationResponse, event?: Event): void {
    event?.stopPropagation();
    this.editingLocationId = location.locationId;
    this.formModalOpen = true;
  }

  onFormSaved(): void {
    this.formModalOpen = false;
    this.page = 0;
    this.load();
  }

  open(location: LocationResponse): void {
    void this.router.navigateByUrl(`/locations/${location.locationId}`);
  }

  toggleStatus(location: LocationResponse, event: Event): void {
    event.stopPropagation();
    const active = this.isActive(location);
    const action$: Observable<LocationResponse | ApiMessageResponse> = active
      ? this.locationsApi.deactivate(location.locationId)
      : this.locationsApi.activate(location.locationId);

    action$.subscribe({
      next: () => {
        this.load();
        this.success.show(
          active ? 'Ubicación desactivada correctamente' : 'Ubicación activada correctamente',
          active
            ? `La ubicación ${location.locationName} ahora está inactiva.`
            : `La ubicación ${location.locationName} ahora está activa.`,
        );
      },
      error: (error: HttpErrorResponse) => {
        void this.toast.error((error.error as ApiErrorResponse)?.message || 'No se pudo cambiar el estado.');
      },
    });
  }
}
