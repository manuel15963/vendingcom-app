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
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  businessOutline,
  calendarOutline,
  constructOutline,
  cubeOutline,
  documentTextOutline,
  hardwareChipOutline,
  locationOutline,
  openOutline,
  pricetagOutline,
  qrCodeOutline,
  swapHorizontalOutline,
  trashOutline,
  warningOutline,
} from 'ionicons/icons';

import { SuccessDialogService } from '@core/feedback/success-dialog.service';
import { ToastService } from '@core/feedback/toast.service';
import { ApiErrorResponse } from '@shared/models/api-response.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { StatusPillComponent } from '@shared/ui/status-pill/status-pill.component';
import { CustomersApiService } from '../../../customers/data-access/customers-api.service';
import { LocationsApiService } from '../../../locations/data-access/locations-api.service';
import { MachineFormModalComponent } from '../../components/machine-form-modal/machine-form-modal.component';
import { MachineCatalogApiService } from '../../data-access/machine-catalog-api.service';
import { MachineDocumentsApiService } from '../../data-access/machine-documents-api.service';
import { MachineEventsApiService } from '../../data-access/machine-events-api.service';
import { MachinesApiService } from '../../data-access/machines-api.service';
import {
  MachineDetailResponse,
  MachineDocumentResponse,
  MachineParameter,
  MachineResponse,
} from '../../models/machine.models';
import { MACHINE_STATUSES, StatusLabel } from '../../models/machine.constants';
import { getMaintenanceInfo, MaintenanceInfo } from '../../util/maintenance.util';

type Segment = 'info' | 'events' | 'documents';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.page.html',
  styleUrls: ['./machine-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton,
    IonContent, IonSpinner, IonModal, IonInput, IonTextarea, IonIcon,
    IonSelect, IonSelectOption,
    MachineFormModalComponent,
    ConfirmDialogComponent,
    AvatarComponent,
    StatusPillComponent,
  ],
})
export class MachineDetailPage implements OnInit {

  private readonly machinesApi = inject(MachinesApiService);
  private readonly eventsApi = inject(MachineEventsApiService);
  private readonly documentsApi = inject(MachineDocumentsApiService);
  private readonly catalogApi = inject(MachineCatalogApiService);
  private readonly customersApi = inject(CustomersApiService);
  private readonly locationsApi = inject(LocationsApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly success = inject(SuccessDialogService);

  readonly statuses = MACHINE_STATUSES;

  machineId!: number;
  detail?: MachineDetailResponse;
  customerName = '';
  locationName = '';
  loading = false;
  errorMessage = '';
  segment: Segment = 'info';

  // Modal de editar máquina
  editModalOpen = false;

  // Diálogo de confirmación reutilizable
  confirmState = { open: false, title: '', message: '', confirmText: 'Confirmar', danger: false };
  private pendingAction: (() => void) | null = null;

  // Cambiar estado
  statusModalOpen = false;
  statusForm = { code: '' };

  // Eventos
  eventTypes: MachineParameter[] = [];
  eventModalOpen = false;
  eventForm = { eventTypeId: null as number | null, title: '', description: '' };

  // Documentos
  documentTypes: MachineParameter[] = [];
  documentModalOpen = false;
  documentForm = { documentTypeId: null as number | null, fileName: '', fileUrl: '', mimeType: '' };

  saving = false;

  constructor() {
    addIcons({
      businessOutline, locationOutline, hardwareChipOutline, pricetagOutline,
      calendarOutline, documentTextOutline, qrCodeOutline, swapHorizontalOutline,
      constructOutline, addOutline, openOutline, trashOutline, cubeOutline, warningOutline,
    });
  }

  get machine(): MachineResponse | undefined {
    return this.detail?.machine;
  }

  get displayName(): string {
    return this.machine?.model || this.machine?.code || 'la máquina';
  }

  /** Estado del mantenimiento preventivo (para la alerta de la cabecera y la ficha). */
  get maintenance(): MaintenanceInfo | null {
    return this.machine ? getMaintenanceInfo(this.machine) : null;
  }

  ngOnInit(): void {
    this.machineId = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
    this.loadCatalogs();
  }

  load(): void {
    this.loading = true;
    this.fetchDetail();
  }

  private reloadSilent(): void {
    this.fetchDetail();
  }

  private fetchDetail(): void {
    this.errorMessage = '';
    this.machinesApi.getDetail(this.machineId).subscribe({
      next: (detail) => {
        this.detail = detail;
        this.loading = false;
        this.loadCustomerName(detail.machine.customerId);
        this.loadLocationName(detail.machine.locationId);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudo cargar la máquina.';
      },
    });
  }

  private loadCatalogs(): void {
    this.catalogApi.getByGroup('EVENT_TYPE').subscribe({
      next: (types) => (this.eventTypes = types),
      error: () => (this.eventTypes = []),
    });
    this.catalogApi.getByGroup('DOCUMENT_TYPE').subscribe({
      next: (types) => (this.documentTypes = types),
      error: () => (this.documentTypes = []),
    });
  }

  /** Nombre del cliente dueño (customer-service). */
  private loadCustomerName(customerId: number): void {
    this.customersApi.getById(customerId).subscribe({
      next: (customer) => (this.customerName = customer.businessName),
      error: () => (this.customerName = `Cliente #${customerId}`),
    });
  }

  /** Nombre de la ubicación (location-service). */
  private loadLocationName(locationId: number): void {
    this.locationsApi.getById(locationId).subscribe({
      next: (location) => (this.locationName = location.locationName),
      error: () => (this.locationName = `Ubicación #${locationId}`),
    });
  }

  isActive(statusName?: string): boolean {
    return statusName === StatusLabel.ACTIVE;
  }

  editMachine(): void {
    this.editModalOpen = true;
  }

  onEditSaved(): void {
    this.editModalOpen = false;
    this.reloadSilent();
  }

  // ---------- CAMBIAR ESTADO ----------
  private currentStatusCode(): string {
    const name = this.machine?.machineStatusName;
    return MACHINE_STATUSES.find((s) => s.label === name)?.code ?? '';
  }

  openStatusModal(): void {
    this.statusForm = { code: this.currentStatusCode() };
    this.statusModalOpen = true;
  }

  applyStatus(): void {
    const code = this.statusForm.code;
    if (!code || code === this.currentStatusCode()) {
      this.statusModalOpen = false;
      return;
    }
    const label = MACHINE_STATUSES.find((s) => s.code === code)?.label ?? code;
    this.openConfirm({
      title: 'Cambiar estado',
      message: `¿Cambiar el estado de ${this.displayName} a "${label}"?`,
      confirmText: 'Cambiar estado',
      action: () => this.persistStatus(code, label),
    });
  }

  private persistStatus(code: string, label: string): void {
    this.handleSave(
      this.machinesApi.changeStatus(this.machineId, code),
      'Estado actualizado correctamente',
      `${this.displayName} ahora está en estado "${label}".`,
      () => (this.statusModalOpen = false),
    );
  }

  // ---------- EVENTOS ----------
  openEventModal(): void {
    this.eventForm = { eventTypeId: this.eventTypes[0]?.parameterId ?? null, title: '', description: '' };
    this.eventModalOpen = true;
  }

  get canSaveEvent(): boolean {
    return this.eventForm.eventTypeId != null && this.eventForm.title.trim().length > 0;
  }

  saveEvent(): void {
    if (!this.canSaveEvent) {
      return;
    }
    this.handleSave(
      this.eventsApi.create(this.machineId, {
        eventTypeId: this.eventForm.eventTypeId as number,
        title: this.eventForm.title.trim(),
        description: this.eventForm.description.trim() || undefined,
      }),
      'Evento registrado correctamente',
      `El evento "${this.eventForm.title.trim()}" fue agregado al historial.`,
      () => (this.eventModalOpen = false),
    );
  }

  // ---------- DOCUMENTOS ----------
  openDocumentModal(): void {
    this.documentForm = { documentTypeId: this.documentTypes[0]?.parameterId ?? null, fileName: '', fileUrl: '', mimeType: '' };
    this.documentModalOpen = true;
  }

  get canSaveDocument(): boolean {
    return (
      this.documentForm.documentTypeId != null &&
      this.documentForm.fileName.trim().length > 0 &&
      this.documentForm.fileUrl.trim().length > 0
    );
  }

  saveDocument(): void {
    if (!this.canSaveDocument) {
      return;
    }
    this.handleSave(
      this.documentsApi.create(this.machineId, {
        documentTypeId: this.documentForm.documentTypeId as number,
        fileName: this.documentForm.fileName.trim(),
        fileUrl: this.documentForm.fileUrl.trim(),
        mimeType: this.documentForm.mimeType.trim() || undefined,
      }),
      'Documento agregado correctamente',
      `"${this.documentForm.fileName.trim()}" se adjuntó a la máquina.`,
      () => (this.documentModalOpen = false),
    );
  }

  askDeleteDocument(document: MachineDocumentResponse): void {
    this.openConfirm({
      title: 'Eliminar documento',
      message: `¿Seguro que deseas eliminar "${document.fileName}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      danger: true,
      action: () => this.deleteDocument(document),
    });
  }

  private deleteDocument(document: MachineDocumentResponse): void {
    this.handleAction(
      this.documentsApi.delete(this.machineId, document.documentId),
      'Documento eliminado correctamente',
      `"${document.fileName}" fue eliminado.`,
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
    this.saving = true;
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
        void this.toast.error((error.error as ApiErrorResponse)?.message || 'No se pudo completar la acción.');
      },
    });
  }
}
