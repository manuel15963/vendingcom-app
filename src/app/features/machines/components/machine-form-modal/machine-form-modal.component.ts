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
  barcodeOutline,
  businessOutline,
  constructOutline,
  cubeOutline,
  documentTextOutline,
  hardwareChipOutline,
  locationOutline,
  pricetagOutline,
} from 'ionicons/icons';

import { SuccessDialogService } from '@core/feedback/success-dialog.service';
import { ToastService } from '@core/feedback/toast.service';
import { ApiErrorResponse } from '@shared/models/api-response.models';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { CustomersApiService } from '../../../customers/data-access/customers-api.service';
import { CustomerResponse } from '../../../customers/models/customer.models';
import { LocationsApiService } from '../../../locations/data-access/locations-api.service';
import { LocationResponse } from '../../../locations/models/location.models';
import { MachineCatalogApiService } from '../../data-access/machine-catalog-api.service';
import { MachinesApiService } from '../../data-access/machines-api.service';
import { MachineParameter } from '../../models/machine.models';
import { ParameterGroup } from '../../models/machine.constants';

/**
 * Modal reutilizable para crear o editar una máquina.
 * - machineId = null   -> "crear" (incluye selectores de cliente y ubicación)
 * - machineId = number -> "editar" (cliente/ubicación no se cambian)
 */
@Component({
  selector: 'app-machine-form-modal',
  templateUrl: './machine-form-modal.component.html',
  styleUrls: ['./machine-form-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonModal, IonInput, IonSelect, IonSelectOption, IonSpinner, IonIcon, ConfirmDialogComponent],
})
export class MachineFormModalComponent implements OnChanges {

  @Input() open = false;
  @Input() machineId: number | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private readonly machinesApi = inject(MachinesApiService);
  private readonly catalogApi = inject(MachineCatalogApiService);
  private readonly customersApi = inject(CustomersApiService);
  private readonly locationsApi = inject(LocationsApiService);
  private readonly toast = inject(ToastService);
  private readonly success = inject(SuccessDialogService);

  customers: CustomerResponse[] = [];
  locations: LocationResponse[] = [];
  machineTypes: MachineParameter[] = [];
  loading = false;
  saving = false;
  errorMessage = '';
  editConfirmOpen = false;

  form = {
    customerId: null as number | null,
    locationId: null as number | null,
    machineTypeId: null as number | null,
    model: '',
    brand: '',
    serialNumber: '',
    maintenanceIntervalDays: null as number | null,
    notes: '',
  };

  constructor() {
    addIcons({
      businessOutline, locationOutline, hardwareChipOutline, pricetagOutline,
      barcodeOutline, documentTextOutline, cubeOutline, constructOutline,
    });
    this.customersApi.search({ size: 200 }).subscribe({
      next: (paged) => (this.customers = paged.content),
      error: () => void this.toast.error('No se pudieron cargar los clientes.'),
    });
    this.locationsApi.search({ size: 200 }).subscribe({
      next: (paged) => (this.locations = paged.content),
      error: () => void this.toast.error('No se pudieron cargar las ubicaciones.'),
    });
    this.catalogApi.getByGroup(ParameterGroup.MACHINE_TYPE).subscribe({
      next: (types) => (this.machineTypes = types),
      error: () => (this.machineTypes = []),
    });
  }

  get isEdit(): boolean {
    return this.machineId != null;
  }

  get title(): string {
    return this.isEdit ? 'Editar máquina' : 'Nueva máquina';
  }

  get canSubmit(): boolean {
    return this.isEdit ? true : (this.form.customerId != null && this.form.locationId != null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open) {
      this.prepareForm();
    }
  }

  private prepareForm(): void {
    this.errorMessage = '';

    if (this.machineId == null) {
      this.form = { customerId: null, locationId: null, machineTypeId: null, model: '', brand: '', serialNumber: '', maintenanceIntervalDays: null, notes: '' };
      return;
    }

    this.loading = true;
    this.machinesApi.getById(this.machineId).subscribe({
      next: (machine) => {
        this.form = {
          customerId: machine.customerId,
          locationId: machine.locationId,
          machineTypeId: machine.machineTypeId ?? null,
          model: machine.model ?? '',
          brand: machine.brand ?? '',
          serialNumber: machine.serialNumber ?? '',
          maintenanceIntervalDays: machine.maintenanceIntervalDays ?? null,
          notes: machine.notes ?? '',
        };
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudo cargar la máquina.';
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

  private persist(): void {
    this.saving = true;
    this.errorMessage = '';

    const common = {
      model: this.form.model.trim() || undefined,
      brand: this.form.brand.trim() || undefined,
      serialNumber: this.form.serialNumber.trim() || undefined,
      machineTypeId: this.form.machineTypeId ?? undefined,
      maintenanceIntervalDays: this.form.maintenanceIntervalDays ? Number(this.form.maintenanceIntervalDays) : undefined,
      notes: this.form.notes.trim() || undefined,
    };

    const label = this.form.model.trim() || this.form.serialNumber.trim() || 'la máquina';
    const request$ = this.isEdit
      ? this.machinesApi.update(this.machineId as number, common)
      : this.machinesApi.create({
          ...common,
          customerId: this.form.customerId as number,
          locationId: this.form.locationId as number,
        });

    request$.subscribe({
      next: () => {
        this.saving = false;
        this.saved.emit();
        if (this.isEdit) {
          this.success.show('Máquina actualizada correctamente', `Los datos de ${label} se actualizaron correctamente.`);
        } else {
          this.success.show('Máquina creada correctamente', `${label} fue registrada correctamente con su código QR.`);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.saving = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudo guardar la máquina.';
      },
    });
  }
}
