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
  callOutline,
  globeOutline,
  mailOutline,
  peopleOutline,
  pricetagOutline,
} from 'ionicons/icons';

import { SuccessDialogService } from '@core/feedback/success-dialog.service';
import { ToastService } from '@core/feedback/toast.service';
import { ApiErrorResponse } from '@shared/models/api-response.models';
import { CustomerCatalogApiService } from '../../data-access/customer-catalog-api.service';
import { CustomersApiService } from '../../data-access/customers-api.service';
import { CustomerParameter } from '../../models/customer.models';
import { ParameterGroup } from '../../models/customer.constants';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';

/**
 * Modal reutilizable para crear o editar un cliente.
 * - customerId = null  -> modo "crear"
 * - customerId = number -> modo "editar" (carga los datos del cliente)
 */
@Component({
  selector: 'app-customer-form-modal',
  templateUrl: './customer-form-modal.component.html',
  styleUrls: ['./customer-form-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonModal, IonInput, IonSelect, IonSelectOption, IonSpinner, IonIcon, ConfirmDialogComponent],
})
export class CustomerFormModalComponent implements OnChanges {

  @Input() open = false;
  @Input() customerId: number | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private readonly customersApi = inject(CustomersApiService);
  private readonly catalogApi = inject(CustomerCatalogApiService);
  private readonly toast = inject(ToastService);
  private readonly success = inject(SuccessDialogService);

  customerTypes: CustomerParameter[] = [];
  loading = false;
  saving = false;
  errorMessage = '';
  editConfirmOpen = false;

  form = {
    businessName: '',
    tradeName: '',
    customerTypeId: null as number | null,
    mainEmail: '',
    mainPhone: '',
    website: '',
  };

  constructor() {
    addIcons({ businessOutline, peopleOutline, pricetagOutline, mailOutline, callOutline, globeOutline });
    this.catalogApi.getByGroup(ParameterGroup.CUSTOMER_TYPE).subscribe({
      next: (types) => (this.customerTypes = types),
      error: () => void this.toast.error('No se pudieron cargar los tipos de cliente.'),
    });
  }

  get isEdit(): boolean {
    return this.customerId != null;
  }

  get title(): string {
    return this.isEdit ? 'Editar cliente' : 'Nuevo cliente';
  }

  get canSubmit(): boolean {
    return this.form.businessName.trim().length > 0 && this.form.customerTypeId != null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cada vez que se abre el modal, preparamos el formulario (reset o carga).
    if (changes['open'] && this.open) {
      this.prepareForm();
    }
  }

  private prepareForm(): void {
    this.errorMessage = '';

    if (this.customerId == null) {
      this.form = { businessName: '', tradeName: '', customerTypeId: null, mainEmail: '', mainPhone: '', website: '' };
      return;
    }

    this.loading = true;
    this.customersApi.getById(this.customerId).subscribe({
      next: (customer) => {
        this.form = {
          businessName: customer.businessName,
          tradeName: customer.tradeName || '',
          customerTypeId: customer.customerTypeId,
          mainEmail: customer.mainEmail || '',
          mainPhone: customer.mainPhone || '',
          website: customer.website || '',
        };
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudo cargar el cliente.';
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

    // Al editar pedimos confirmación; al crear, se guarda directo.
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

    const request = {
      businessName: this.form.businessName.trim(),
      tradeName: this.form.tradeName.trim() || undefined,
      customerTypeId: this.form.customerTypeId as number,
      mainEmail: this.form.mainEmail.trim() || undefined,
      mainPhone: this.form.mainPhone.trim() || undefined,
      website: this.form.website.trim() || undefined,
    };

    const request$ = this.isEdit
      ? this.customersApi.update(this.customerId as number, request)
      : this.customersApi.create(request);

    const name = this.form.businessName.trim();
    request$.subscribe({
      next: () => {
        this.saving = false;
        this.saved.emit();
        if (this.isEdit) {
          this.success.show('Cliente actualizado correctamente', `Los datos del cliente ${name} se actualizaron correctamente.`);
        } else {
          this.success.show('Cliente creado correctamente', `El cliente ${name} fue registrado correctamente.`);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.saving = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudo guardar el cliente.';
      },
    });
  }
}
