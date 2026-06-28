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
import { CustomerFormModalComponent } from '../../components/customer-form-modal/customer-form-modal.component';
import { CustomersApiService } from '../../data-access/customers-api.service';
import { CustomerResponse } from '../../models/customer.models';
import { StatusLabel } from '../../models/customer.constants';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusPillComponent } from '@shared/ui/status-pill/status-pill.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.page.html',
  styleUrls: ['./customers-list.page.scss'],
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
    CustomerFormModalComponent,
    AvatarComponent,
    StatusPillComponent,
  ],
})
export class CustomersListPage implements OnInit {

  private readonly customersApi = inject(CustomersApiService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly success = inject(SuccessDialogService);

  constructor() {
    addIcons({ eyeOutline, createOutline });
  }

  customers: CustomerResponse[] = [];
  loading = false;
  errorMessage = '';

  search = '';
  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;

  // Modal de crear/editar cliente
  formModalOpen = false;
  editingCustomerId: number | null = null;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = '';

    this.customersApi.search({ search: this.search.trim() || undefined, page: this.page, size: this.size }).subscribe({
      next: (paged) => {
        this.customers = paged.content;
        this.totalElements = paged.totalElements;
        this.totalPages = paged.totalPages;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudieron cargar los clientes.';
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

  isActive(customer: CustomerResponse): boolean {
    return customer.customerStatusName === StatusLabel.ACTIVE;
  }

  newCustomer(): void {
    this.editingCustomerId = null;
    this.formModalOpen = true;
  }

  editCustomer(customer: CustomerResponse, event?: Event): void {
    event?.stopPropagation();
    this.editingCustomerId = customer.customerId;
    this.formModalOpen = true;
  }

  onFormSaved(): void {
    this.formModalOpen = false;
    this.page = 0;
    this.load();
  }

  open(customer: CustomerResponse): void {
    void this.router.navigateByUrl(`/customers/${customer.customerId}`);
  }

  toggleStatus(customer: CustomerResponse, event: Event): void {
    event.stopPropagation();
    const active = this.isActive(customer);
    const action$: Observable<CustomerResponse | ApiMessageResponse> = active
      ? this.customersApi.deactivate(customer.customerId)
      : this.customersApi.activate(customer.customerId);

    action$.subscribe({
      next: () => {
        this.load();
        this.success.show(
          active ? 'Cliente desactivado correctamente' : 'Cliente activado correctamente',
          active
            ? `El cliente ${customer.businessName} ahora está inactivo.`
            : `El cliente ${customer.businessName} ahora está activo.`,
        );
      },
      error: (error: HttpErrorResponse) => {
        void this.toast.error((error.error as ApiErrorResponse)?.message || 'No se pudo cambiar el estado.');
      },
    });
  }
}
