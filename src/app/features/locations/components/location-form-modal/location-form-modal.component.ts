import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonInput,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  businessOutline,
  earthOutline,
  homeOutline,
  informationCircleOutline,
  keypadOutline,
  locateOutline,
  mapOutline,
  navigateOutline,
  pricetagOutline,
  storefrontOutline,
} from 'ionicons/icons';

import { SuccessDialogService } from '@core/feedback/success-dialog.service';
import { ToastService } from '@core/feedback/toast.service';
import { ApiErrorResponse } from '@shared/models/api-response.models';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { LocationMapPickerComponent, PickedLocation } from '../location-map-picker/location-map-picker.component';
import { CustomersApiService } from '../../../customers/data-access/customers-api.service';
import { CustomerResponse } from '../../../customers/models/customer.models';
import { LocationCatalogApiService } from '../../data-access/location-catalog-api.service';
import { LocationsApiService } from '../../data-access/locations-api.service';
import { LocationParameter } from '../../models/location.models';
import { ParameterGroup } from '../../models/location.constants';

/**
 * Modal reutilizable para crear o editar una ubicación.
 * - locationId = null   -> modo "crear" (incluye selector de cliente)
 * - locationId = number -> modo "editar" (el cliente no se cambia)
 */
@Component({
  selector: 'app-location-form-modal',
  templateUrl: './location-form-modal.component.html',
  styleUrls: ['./location-form-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonModal, IonInput, IonSelect, IonSelectOption, IonSpinner, IonIcon, ConfirmDialogComponent, LocationMapPickerComponent],
})
export class LocationFormModalComponent implements OnChanges {

  @Input() open = false;
  @Input() locationId: number | null = null;
  /** Cliente preseleccionado (cuando se crea desde la ficha de un cliente). */
  @Input() lockedCustomerId: number | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private readonly locationsApi = inject(LocationsApiService);
  private readonly catalogApi = inject(LocationCatalogApiService);
  private readonly customersApi = inject(CustomersApiService);
  private readonly toast = inject(ToastService);
  private readonly success = inject(SuccessDialogService);

  customers: CustomerResponse[] = [];
  locationTypes: LocationParameter[] = [];
  zones: LocationParameter[] = [];
  loading = false;
  saving = false;
  errorMessage = '';
  editConfirmOpen = false;

  form = {
    customerId: null as number | null,
    locationName: '',
    locationTypeId: null as number | null,
    zoneId: null as number | null,
    addressLine: '',
    district: '',
    province: '',
    department: '',
    country: 'Perú',
    postalCode: '',
    reference: '',
    latitude: null as number | null,
    longitude: null as number | null,
  };

  constructor() {
    addIcons({
      businessOutline, storefrontOutline, pricetagOutline, mapOutline, homeOutline,
      navigateOutline, earthOutline, keypadOutline, informationCircleOutline, locateOutline,
    });
    this.catalogApi.getByGroup(ParameterGroup.LOCATION_TYPE).subscribe({
      next: (types) => (this.locationTypes = types),
      error: () => void this.toast.error('No se pudieron cargar los tipos de ubicación.'),
    });
    this.catalogApi.getByGroup(ParameterGroup.LOCATION_ZONE).subscribe({
      next: (zones) => (this.zones = zones),
    });
    this.customersApi.search({ size: 200 }).subscribe({
      next: (paged) => (this.customers = paged.content),
      error: () => void this.toast.error('No se pudieron cargar los clientes.'),
    });
  }

  get isEdit(): boolean {
    return this.locationId != null;
  }

  get title(): string {
    return this.isEdit ? 'Editar ubicación' : 'Nueva ubicación';
  }

  /** Latitud y longitud deben ir juntas (ambas o ninguna) — regla del backend. */
  get geoError(): string | null {
    const hasLat = this.form.latitude != null && `${this.form.latitude}`.trim() !== '';
    const hasLng = this.form.longitude != null && `${this.form.longitude}`.trim() !== '';
    return hasLat !== hasLng ? 'La latitud y la longitud deben ingresarse juntas (ambas o ninguna).' : null;
  }

  get canSubmit(): boolean {
    const baseOk = this.form.locationName.trim().length > 0
      && this.form.locationTypeId != null
      && this.form.addressLine.trim().length > 0
      && this.geoError === null;
    return this.isEdit ? baseOk : baseOk && this.form.customerId != null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open) {
      this.prepareForm();
    }
  }

  private prepareForm(): void {
    this.errorMessage = '';

    if (this.locationId == null) {
      this.form = {
        customerId: this.lockedCustomerId, locationName: '', locationTypeId: null, zoneId: null,
        addressLine: '', district: '', province: '', department: '', country: 'Perú',
        postalCode: '', reference: '', latitude: null, longitude: null,
      };
      return;
    }

    this.loading = true;
    this.locationsApi.getById(this.locationId).subscribe({
      next: (location) => {
        this.form = {
          customerId: location.customerId,
          locationName: location.locationName,
          locationTypeId: location.locationTypeId,
          zoneId: location.zoneId ?? null,
          addressLine: location.addressLine,
          district: location.district ?? '',
          province: location.province ?? '',
          department: location.department ?? '',
          country: location.country ?? 'Perú',
          postalCode: location.postalCode ?? '',
          reference: location.reference ?? '',
          latitude: location.latitude ?? null,
          longitude: location.longitude ?? null,
        };
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudo cargar la ubicación.';
      },
    });
  }

  close(): void {
    this.closed.emit();
  }

  save(): void {
    if (!this.canSubmit || this.saving) {
      return;
    }
    if (this.isEdit) {
      this.editConfirmOpen = true;
      return;
    }
    this.persist();
  }

  onEditConfirm(): void {
    this.editConfirmOpen = false;
    this.persist();
  }

  /** El mapa eligió un punto: rellena coordenadas y dirección (los campos siguen editables). */
  onLocationPicked(loc: PickedLocation): void {
    this.form.latitude = loc.latitude;
    this.form.longitude = loc.longitude;
    if (loc.addressLine) this.form.addressLine = loc.addressLine;
    if (loc.district) this.form.district = loc.district;
    if (loc.province) this.form.province = loc.province;
    if (loc.department) this.form.department = loc.department;
    if (loc.country) this.form.country = loc.country;
    if (loc.postalCode) this.form.postalCode = loc.postalCode;
  }

  private toNumber(value: number | null): number | undefined {
    return value != null && `${value}`.trim() !== '' ? Number(value) : undefined;
  }

  private persist(): void {
    this.saving = true;
    this.errorMessage = '';

    const common = {
      locationName: this.form.locationName.trim(),
      locationTypeId: this.form.locationTypeId as number,
      zoneId: this.form.zoneId ?? undefined,
      addressLine: this.form.addressLine.trim(),
      district: this.form.district.trim() || undefined,
      province: this.form.province.trim() || undefined,
      department: this.form.department.trim() || undefined,
      country: this.form.country.trim() || undefined,
      postalCode: this.form.postalCode.trim() || undefined,
      reference: this.form.reference.trim() || undefined,
      latitude: this.toNumber(this.form.latitude),
      longitude: this.toNumber(this.form.longitude),
    };

    const name = this.form.locationName.trim();
    const request$ = this.isEdit
      ? this.locationsApi.update(this.locationId as number, common)
      : this.locationsApi.create({ ...common, customerId: this.form.customerId as number });

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.saved.emit();
        if (this.isEdit) {
          this.success.show('Ubicación actualizada correctamente', `Los datos de la ubicación ${name} se actualizaron correctamente.`);
        } else {
          this.success.show('Ubicación creada correctamente', `La ubicación ${name} fue registrada correctamente.`);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.saving = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudo guardar la ubicación.';
      },
    });
  }
}
