import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  briefcaseOutline,
  callOutline,
  documentTextOutline,
  earthOutline,
  homeOutline,
  keypadOutline,
  linkOutline,
  mailOutline,
  mapOutline,
  navigateOutline,
  personOutline,
  pricetagOutline,
} from 'ionicons/icons';

import { SuccessDialogService } from '@core/feedback/success-dialog.service';
import { ToastService } from '@core/feedback/toast.service';
import { ApiErrorResponse } from '@shared/models/api-response.models';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { CustomerFormModalComponent } from '../../components/customer-form-modal/customer-form-modal.component';
import { CustomerAddressesApiService } from '../../data-access/customer-addresses-api.service';
import { CustomerCatalogApiService } from '../../data-access/customer-catalog-api.service';
import { CustomerContactsApiService } from '../../data-access/customer-contacts-api.service';
import { CustomerDocumentsApiService } from '../../data-access/customer-documents-api.service';
import { CustomersApiService } from '../../data-access/customers-api.service';
import {
  CustomerAddressResponse,
  CustomerContactResponse,
  CustomerDetailResponse,
  CustomerDocumentResponse,
  CustomerParameter,
} from '../../models/customer.models';
import { CustomerTypeCode, DocumentTypeCode, ParameterGroup, StatusLabel } from '../../models/customer.constants';
import { validateDocumentNumber } from '../../util/document-number.validator';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusPillComponent } from '@shared/ui/status-pill/status-pill.component';
import { LocationMapPickerComponent, PickedLocation } from '../../../locations/components/location-map-picker/location-map-picker.component';

type Segment = 'info' | 'contacts' | 'addresses' | 'documents';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton,
    IonContent, IonSpinner, IonModal, IonInput, IonIcon,
    IonSelect, IonSelectOption, IonToggle,
    CustomerFormModalComponent,
    ConfirmDialogComponent,
    AvatarComponent,
    StatusPillComponent,
    LocationMapPickerComponent,
  ],
})
export class CustomerDetailPage implements OnInit {

  private readonly customersApi = inject(CustomersApiService);
  private readonly contactsApi = inject(CustomerContactsApiService);
  private readonly addressesApi = inject(CustomerAddressesApiService);
  private readonly documentsApi = inject(CustomerDocumentsApiService);
  private readonly catalogApi = inject(CustomerCatalogApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly success = inject(SuccessDialogService);

  customerId!: number;
  detail?: CustomerDetailResponse;
  loading = false;
  errorMessage = '';
  segment: Segment = 'info';

  // Modal de editar cliente
  editModalOpen = false;

  // Diálogo de confirmación (activar / desactivar / guardar cambios)
  confirmState = { open: false, title: '', message: '', confirmText: 'Confirmar', danger: false };
  private pendingAction: (() => void) | null = null;

  addressTypes: CustomerParameter[] = [];
  documentTypes: CustomerParameter[] = [];

  // ---- Modales ----
  contactModalOpen = false;
  editingContactId: number | null = null;
  contactForm = { fullName: '', position: '', email: '', phone: '', isPrimary: false };

  addressModalOpen = false;
  editingAddressId: number | null = null;
  addressForm = { addressTypeId: null as number | null, addressLine: '', district: '', province: '', department: '', country: 'Perú', reference: '', isPrimary: false };

  documentModalOpen = false;
  editingDocumentId: number | null = null;
  documentForm = { documentTypeId: null as number | null, documentNumber: '', fileUrl: '', isPrimary: false };

  saving = false;

  constructor() {
    addIcons({
      personOutline, briefcaseOutline, mailOutline, callOutline,
      pricetagOutline, homeOutline, mapOutline, earthOutline, navigateOutline,
      documentTextOutline, keypadOutline, linkOutline,
    });
  }

  /** Nombre del cliente, para los mensajes del modal de éxito. */
  get customerName(): string {
    return this.detail?.customer.businessName ?? 'el cliente';
  }

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.catalogApi.getByGroup(ParameterGroup.ADDRESS_TYPE).subscribe({ next: (t) => (this.addressTypes = t) });
    this.catalogApi.getByGroup(ParameterGroup.DOCUMENT_TYPE).subscribe({ next: (t) => (this.documentTypes = t) });
    this.load();
  }

  load(): void {
    this.loading = true;
    this.fetchDetail();
  }

  /** Refresca los datos SIN borrar la pantalla (tras guardar o cambiar estado). */
  private reloadSilent(): void {
    this.fetchDetail();
  }

  private fetchDetail(): void {
    this.errorMessage = '';
    this.customersApi.getDetail(this.customerId).subscribe({
      next: (detail) => {
        this.detail = detail;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudo cargar el cliente.';
      },
    });
  }

  editCustomer(): void {
    this.editModalOpen = true;
  }

  onEditSaved(): void {
    this.editModalOpen = false;
    this.reloadSilent();
  }

  isActive(statusName?: string): boolean {
    return statusName === StatusLabel.ACTIVE;
  }

  // ---------- CONTACTOS ----------
  openContactModal(contact?: CustomerContactResponse): void {
    this.editingContactId = contact?.contactId ?? null;
    this.contactForm = {
      fullName: contact?.fullName ?? '',
      position: contact?.position ?? '',
      email: contact?.email ?? '',
      phone: contact?.phone ?? '',
      isPrimary: contact?.isPrimary ?? false,
    };
    this.contactModalOpen = true;
  }

  saveContact(): void {
    if (!this.contactForm.fullName.trim()) {
      return;
    }
    if (this.editingContactId) {
      this.openConfirm({
        title: 'Guardar cambios',
        message: '¿Guardar los cambios de este contacto?',
        confirmText: 'Guardar',
        action: () => this.persistContact(),
      });
      return;
    }
    this.persistContact();
  }

  private persistContact(): void {
    this.saving = true;
    const req = {
      fullName: this.contactForm.fullName.trim(),
      position: this.contactForm.position.trim() || undefined,
      email: this.contactForm.email.trim() || undefined,
      phone: this.contactForm.phone.trim() || undefined,
      isPrimary: this.contactForm.isPrimary,
    };
    const editing = this.editingContactId != null;
    const obs = this.editingContactId
      ? this.contactsApi.update(this.customerId, this.editingContactId, req)
      : this.contactsApi.create(this.customerId, req);
    this.handleSave(
      obs,
      editing ? 'Contacto actualizado correctamente' : 'Contacto guardado correctamente',
      editing
        ? 'Los datos del contacto se actualizaron correctamente.'
        : `El contacto fue registrado correctamente para el cliente ${this.customerName}.`,
      () => (this.contactModalOpen = false),
    );
  }

  askToggleContact(contact: CustomerContactResponse): void {
    const active = this.isActive(contact.contactStatusName);
    this.openConfirm({
      title: active ? 'Desactivar contacto' : 'Activar contacto',
      message: active
        ? `¿Seguro que deseas desactivar a "${contact.fullName}"?`
        : `¿Volver a activar a "${contact.fullName}"?`,
      confirmText: active ? 'Desactivar' : 'Activar',
      danger: active,
      action: () => this.toggleContactStatus(contact),
    });
  }

  private toggleContactStatus(contact: CustomerContactResponse): void {
    const active = this.isActive(contact.contactStatusName);
    const obs: Observable<unknown> = active
      ? this.contactsApi.deactivate(this.customerId, contact.contactId)
      : this.contactsApi.activate(this.customerId, contact.contactId);
    this.handleAction(
      obs,
      active ? 'Contacto desactivado correctamente' : 'Contacto activado correctamente',
      active ? `El contacto "${contact.fullName}" ahora está inactivo.` : `El contacto "${contact.fullName}" ahora está activo.`,
    );
  }

  // ---------- DIRECCIONES ----------
  openAddressModal(address?: CustomerAddressResponse): void {
    this.editingAddressId = address?.addressId ?? null;
    this.addressForm = {
      addressTypeId: address?.addressTypeId ?? null,
      addressLine: address?.addressLine ?? '',
      district: address?.district ?? '',
      province: address?.province ?? '',
      department: address?.department ?? '',
      country: address?.country ?? 'Perú',
      reference: address?.reference ?? '',
      isPrimary: address?.isPrimary ?? false,
    };
    this.addressModalOpen = true;
  }

  /** El mapa eligió un punto: autocompleta los campos de la dirección del cliente. */
  onAddressLocationPicked(loc: PickedLocation): void {
    if (loc.addressLine) this.addressForm.addressLine = loc.addressLine;
    if (loc.district) this.addressForm.district = loc.district;
    if (loc.province) this.addressForm.province = loc.province;
    if (loc.department) this.addressForm.department = loc.department;
    if (loc.country) this.addressForm.country = loc.country;
  }

  saveAddress(): void {
    if (!this.addressForm.addressLine.trim() || this.addressForm.addressTypeId == null) {
      return;
    }
    if (this.editingAddressId) {
      this.openConfirm({
        title: 'Guardar cambios',
        message: '¿Guardar los cambios de esta dirección?',
        confirmText: 'Guardar',
        action: () => this.persistAddress(),
      });
      return;
    }
    this.persistAddress();
  }

  private persistAddress(): void {
    this.saving = true;
    const req = {
      addressTypeId: this.addressForm.addressTypeId as number,
      addressLine: this.addressForm.addressLine.trim(),
      district: this.addressForm.district.trim() || undefined,
      province: this.addressForm.province.trim() || undefined,
      department: this.addressForm.department.trim() || undefined,
      country: this.addressForm.country.trim() || undefined,
      reference: this.addressForm.reference.trim() || undefined,
      isPrimary: this.addressForm.isPrimary,
    };
    const editing = this.editingAddressId != null;
    const obs = this.editingAddressId
      ? this.addressesApi.update(this.customerId, this.editingAddressId, req)
      : this.addressesApi.create(this.customerId, req);
    this.handleSave(
      obs,
      editing ? 'Dirección actualizada correctamente' : 'Dirección guardada correctamente',
      editing
        ? 'Los datos de la dirección se actualizaron correctamente.'
        : `La dirección fue registrada correctamente para el cliente ${this.customerName}.`,
      () => (this.addressModalOpen = false),
    );
  }

  askToggleAddress(address: CustomerAddressResponse): void {
    const active = this.isActive(address.addressStatusName);
    this.openConfirm({
      title: active ? 'Desactivar dirección' : 'Activar dirección',
      message: active
        ? `¿Seguro que deseas desactivar la dirección "${address.addressTypeName}"?`
        : `¿Volver a activar la dirección "${address.addressTypeName}"?`,
      confirmText: active ? 'Desactivar' : 'Activar',
      danger: active,
      action: () => this.toggleAddressStatus(address),
    });
  }

  private toggleAddressStatus(address: CustomerAddressResponse): void {
    const active = this.isActive(address.addressStatusName);
    const obs: Observable<unknown> = active
      ? this.addressesApi.deactivate(this.customerId, address.addressId)
      : this.addressesApi.activate(this.customerId, address.addressId);
    this.handleAction(
      obs,
      active ? 'Dirección desactivada correctamente' : 'Dirección activada correctamente',
      active ? `La dirección "${address.addressTypeName}" ahora está inactiva.` : `La dirección "${address.addressTypeName}" ahora está activa.`,
    );
  }

  // ---------- DOCUMENTOS ----------
  /** Tipos permitidos por el tipo de cliente (empresa/institución → RUC, persona → DNI/CE/Pasaporte). */
  private documentTypesByCustomer(): CustomerParameter[] {
    const personCodes: string[] = [DocumentTypeCode.DNI, DocumentTypeCode.CE, DocumentTypeCode.PASAPORTE];
    const isPerson = this.detail?.customer.customerTypeName === CustomerTypeCode.PERSONA;
    return this.documentTypes.filter((t) =>
      isPerson ? personCodes.includes(t.parameterCode) : t.parameterCode === DocumentTypeCode.RUC,
    );
  }

  /** Tipos para el modal: por tipo de cliente y SIN los ya registrados (salvo el que se está editando). */
  get availableDocumentTypes(): CustomerParameter[] {
    const used = new Set(
      (this.detail?.documents ?? [])
        .filter((d) => d.documentId !== this.editingDocumentId)
        .map((d) => d.documentTypeId),
    );
    return this.documentTypesByCustomer().filter((t) => !used.has(t.parameterId));
  }

  /** ¿Queda algún tipo de documento por registrar? (habilita el botón Agregar). */
  get canAddDocument(): boolean {
    const used = new Set((this.detail?.documents ?? []).map((d) => d.documentTypeId));
    return this.documentTypesByCustomer().some((t) => !used.has(t.parameterId));
  }

  /** Error de formato del número según el tipo seleccionado (null = válido). Lógica en el util. */
  get documentNumberError(): string | null {
    const code = this.documentTypes.find((t) => t.parameterId === this.documentForm.documentTypeId)?.parameterCode;
    return validateDocumentNumber(code, this.documentForm.documentNumber);
  }

  get canSaveDocument(): boolean {
    return !!this.documentForm.documentNumber.trim()
      && this.documentForm.documentTypeId != null
      && this.documentNumberError === null;
  }

  openDocumentModal(document?: CustomerDocumentResponse): void {
    this.editingDocumentId = document?.documentId ?? null;
    this.documentForm = {
      documentTypeId: document?.documentTypeId ?? null,
      documentNumber: document?.documentNumber ?? '',
      fileUrl: document?.fileUrl ?? '',
      isPrimary: document?.isPrimary ?? false,
    };
    // Si es nuevo y solo hay un tipo válido (ej. RUC para empresa), lo preseleccionamos.
    if (!document && this.documentForm.documentTypeId == null) {
      const available = this.availableDocumentTypes;
      if (available.length === 1) {
        this.documentForm.documentTypeId = available[0].parameterId;
      }
    }
    this.documentModalOpen = true;
  }

  saveDocument(): void {
    if (!this.documentForm.documentNumber.trim() || this.documentForm.documentTypeId == null) {
      return;
    }
    if (this.editingDocumentId) {
      this.openConfirm({
        title: 'Guardar cambios',
        message: '¿Guardar los cambios de este documento?',
        confirmText: 'Guardar',
        action: () => this.persistDocument(),
      });
      return;
    }
    this.persistDocument();
  }

  private persistDocument(): void {
    this.saving = true;
    const req = {
      documentTypeId: this.documentForm.documentTypeId as number,
      documentNumber: this.documentForm.documentNumber.trim(),
      fileUrl: this.documentForm.fileUrl.trim() || undefined,
      isPrimary: this.documentForm.isPrimary,
    };
    const editing = this.editingDocumentId != null;
    const obs = this.editingDocumentId
      ? this.documentsApi.update(this.customerId, this.editingDocumentId, req)
      : this.documentsApi.create(this.customerId, req);
    this.handleSave(
      obs,
      editing ? 'Documento actualizado correctamente' : 'Documento guardado correctamente',
      editing
        ? 'Los datos del documento se actualizaron correctamente.'
        : `El documento fue registrado correctamente para el cliente ${this.customerName}.`,
      () => (this.documentModalOpen = false),
    );
  }

  askToggleDocument(document: CustomerDocumentResponse): void {
    const active = this.isActive(document.documentStatusName);
    this.openConfirm({
      title: active ? 'Desactivar documento' : 'Activar documento',
      message: active
        ? `¿Seguro que deseas desactivar el documento "${document.documentTypeName}: ${document.documentNumber}"?`
        : `¿Volver a activar el documento "${document.documentTypeName}: ${document.documentNumber}"?`,
      confirmText: active ? 'Desactivar' : 'Activar',
      danger: active,
      action: () => this.toggleDocumentStatus(document),
    });
  }

  private toggleDocumentStatus(document: CustomerDocumentResponse): void {
    const active = this.isActive(document.documentStatusName);
    const obs: Observable<unknown> = active
      ? this.documentsApi.deactivate(this.customerId, document.documentId)
      : this.documentsApi.activate(this.customerId, document.documentId);
    this.handleAction(
      obs,
      active ? 'Documento desactivado correctamente' : 'Documento activado correctamente',
      active ? `El documento "${document.documentTypeName}" ahora está inactivo.` : `El documento "${document.documentTypeName}" ahora está activo.`,
    );
  }

  // ---------- confirmación ----------
  private openConfirm(opts: {
    title: string;
    message: string;
    confirmText: string;
    danger?: boolean;
    action: () => void;
  }): void {
    this.confirmState = {
      open: true,
      title: opts.title,
      message: opts.message,
      confirmText: opts.confirmText,
      danger: !!opts.danger,
    };
    this.pendingAction = opts.action;
  }

  onConfirmAccept(): void {
    const action = this.pendingAction;
    this.confirmState.open = false;
    this.pendingAction = null;
    action?.();
  }

  onConfirmCancel(): void {
    this.confirmState.open = false;
    this.pendingAction = null;
  }

  // ---------- helpers ----------
  private handleSave(obs: Observable<unknown>, successTitle: string, successMessage: string, closeModal: () => void): void {
    obs.subscribe({
      next: () => {
        this.saving = false;
        closeModal();
        this.reloadSilent();
        this.success.show(successTitle, successMessage);
      },
      error: (error: HttpErrorResponse) => {
        this.saving = false;
        void this.toast.error((error.error as ApiErrorResponse)?.message || 'No se pudo guardar.');
      },
    });
  }

  private handleAction(obs: Observable<unknown>, successTitle: string, successMessage: string): void {
    obs.subscribe({
      next: () => {
        this.reloadSilent();
        this.success.show(successTitle, successMessage);
      },
      error: (error: HttpErrorResponse) => {
        void this.toast.error((error.error as ApiErrorResponse)?.message || 'No se pudo cambiar el estado.');
      },
    });
  }
}
