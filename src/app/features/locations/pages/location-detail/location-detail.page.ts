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
  calendarOutline,
  callOutline,
  mailOutline,
  personOutline,
  timeOutline,
} from 'ionicons/icons';

import { SuccessDialogService } from '@core/feedback/success-dialog.service';
import { ToastService } from '@core/feedback/toast.service';
import { ApiErrorResponse } from '@shared/models/api-response.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { StatusPillComponent } from '@shared/ui/status-pill/status-pill.component';
import { CustomersApiService } from '../../../customers/data-access/customers-api.service';
import { LocationFormModalComponent } from '../../components/location-form-modal/location-form-modal.component';
import { LocationContactsApiService } from '../../data-access/location-contacts-api.service';
import { LocationSchedulesApiService } from '../../data-access/location-schedules-api.service';
import { LocationsApiService } from '../../data-access/locations-api.service';
import {
  LocationContactResponse,
  LocationDetailResponse,
  LocationScheduleResponse,
} from '../../models/location.models';
import { DAYS_OF_WEEK, StatusLabel, dayLabel } from '../../models/location.constants';

type Segment = 'info' | 'contacts' | 'schedules';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton,
    IonContent, IonSpinner, IonModal, IonInput, IonIcon,
    IonSelect, IonSelectOption, IonToggle,
    LocationFormModalComponent,
    ConfirmDialogComponent,
    AvatarComponent,
    StatusPillComponent,
  ],
})
export class LocationDetailPage implements OnInit {

  private readonly locationsApi = inject(LocationsApiService);
  private readonly contactsApi = inject(LocationContactsApiService);
  private readonly schedulesApi = inject(LocationSchedulesApiService);
  private readonly customersApi = inject(CustomersApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly success = inject(SuccessDialogService);

  readonly days = DAYS_OF_WEEK;

  locationId!: number;
  detail?: LocationDetailResponse;
  customerName = '';
  loading = false;
  errorMessage = '';
  segment: Segment = 'info';

  // Modal de editar ubicación
  editModalOpen = false;

  // Diálogo de confirmación (activar / desactivar / eliminar / guardar)
  confirmState = { open: false, title: '', message: '', confirmText: 'Confirmar', danger: false };
  private pendingAction: (() => void) | null = null;

  // ---- Modales ----
  contactModalOpen = false;
  editingContactId: number | null = null;
  contactForm = { fullName: '', position: '', email: '', phone: '', isPrimary: false };

  scheduleModalOpen = false;
  editingScheduleId: number | null = null;
  scheduleForm = { dayOfWeek: null as number | null, openingTime: '', closingTime: '', isClosed: false };

  saving = false;

  constructor() {
    addIcons({ personOutline, briefcaseOutline, mailOutline, callOutline, timeOutline, calendarOutline });
  }

  get locationName(): string {
    return this.detail?.location.locationName ?? 'la ubicación';
  }

  ngOnInit(): void {
    this.locationId = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
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
    this.locationsApi.getDetail(this.locationId).subscribe({
      next: (detail) => {
        this.detail = detail;
        this.loading = false;
        this.loadCustomerName(detail.location.customerId);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudo cargar la ubicación.';
      },
    });
  }

  /** Nombre del cliente dueño de la ubicación (otro microservicio). */
  private loadCustomerName(customerId: number): void {
    this.customersApi.getById(customerId).subscribe({
      next: (customer) => (this.customerName = customer.businessName),
      error: () => (this.customerName = `Cliente #${customerId}`),
    });
  }

  editLocation(): void {
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
  openContactModal(contact?: LocationContactResponse): void {
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
      ? this.contactsApi.update(this.locationId, this.editingContactId, req)
      : this.contactsApi.create(this.locationId, req);
    this.handleSave(
      obs,
      editing ? 'Contacto actualizado correctamente' : 'Contacto guardado correctamente',
      editing
        ? 'Los datos del contacto se actualizaron correctamente.'
        : `El contacto fue registrado correctamente para ${this.locationName}.`,
      () => (this.contactModalOpen = false),
    );
  }

  askToggleContact(contact: LocationContactResponse): void {
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

  private toggleContactStatus(contact: LocationContactResponse): void {
    const active = this.isActive(contact.contactStatusName);
    const obs: Observable<unknown> = active
      ? this.contactsApi.deactivate(this.locationId, contact.contactId)
      : this.contactsApi.activate(this.locationId, contact.contactId);
    this.handleAction(
      obs,
      active ? 'Contacto desactivado correctamente' : 'Contacto activado correctamente',
      active ? `El contacto "${contact.fullName}" ahora está inactivo.` : `El contacto "${contact.fullName}" ahora está activo.`,
    );
  }

  // ---------- HORARIOS ----------
  dayName(day: number): string {
    return dayLabel(day);
  }

  /** Texto del horario para mostrar en la fila. */
  scheduleText(schedule: LocationScheduleResponse): string {
    if (schedule.isClosed) {
      return 'Cerrado';
    }
    return `${this.shortTime(schedule.openingTime)} – ${this.shortTime(schedule.closingTime)}`;
  }

  /** "09:00:00" -> "09:00" (para mostrar y para los inputs type=time). */
  private shortTime(value?: string): string {
    return value ? value.slice(0, 5) : '';
  }

  /** Días que aún no tienen horario (excluyendo el que se está editando). */
  get availableDays(): ReadonlyArray<{ value: number; label: string; short: string }> {
    const used = new Set(
      (this.detail?.schedules ?? [])
        .filter((s) => s.scheduleId !== this.editingScheduleId)
        .map((s) => s.dayOfWeek),
    );
    return this.days.filter((d) => !used.has(d.value));
  }

  get canAddSchedule(): boolean {
    const used = new Set((this.detail?.schedules ?? []).map((s) => s.dayOfWeek));
    return this.days.some((d) => !used.has(d.value));
  }

  /** Validación del horario (null = válido). */
  get scheduleError(): string | null {
    if (this.scheduleForm.dayOfWeek == null) {
      return null;
    }
    if (this.scheduleForm.isClosed) {
      return null;
    }
    if (!this.scheduleForm.openingTime || !this.scheduleForm.closingTime) {
      return 'Indica la hora de apertura y de cierre, o marca el día como cerrado.';
    }
    if (this.scheduleForm.openingTime >= this.scheduleForm.closingTime) {
      return 'La hora de apertura debe ser anterior a la de cierre.';
    }
    return null;
  }

  get canSaveSchedule(): boolean {
    return this.scheduleForm.dayOfWeek != null && this.scheduleError === null;
  }

  openScheduleModal(schedule?: LocationScheduleResponse): void {
    this.editingScheduleId = schedule?.scheduleId ?? null;
    this.scheduleForm = {
      dayOfWeek: schedule?.dayOfWeek ?? this.availableDays[0]?.value ?? null,
      openingTime: this.shortTime(schedule?.openingTime),
      closingTime: this.shortTime(schedule?.closingTime),
      isClosed: schedule?.isClosed ?? false,
    };
    this.scheduleModalOpen = true;
  }

  saveSchedule(): void {
    if (!this.canSaveSchedule) {
      return;
    }
    if (this.editingScheduleId) {
      this.openConfirm({
        title: 'Guardar cambios',
        message: '¿Guardar los cambios de este horario?',
        confirmText: 'Guardar',
        action: () => this.persistSchedule(),
      });
      return;
    }
    this.persistSchedule();
  }

  private persistSchedule(): void {
    this.saving = true;
    const closed = this.scheduleForm.isClosed;
    const req = {
      dayOfWeek: this.scheduleForm.dayOfWeek as number,
      isClosed: closed,
      openingTime: closed ? null : this.scheduleForm.openingTime || null,
      closingTime: closed ? null : this.scheduleForm.closingTime || null,
    };
    const editing = this.editingScheduleId != null;
    const obs = this.editingScheduleId
      ? this.schedulesApi.update(this.locationId, this.editingScheduleId, req)
      : this.schedulesApi.create(this.locationId, req);
    this.handleSave(
      obs,
      editing ? 'Horario actualizado correctamente' : 'Horario guardado correctamente',
      editing
        ? `El horario del ${this.dayName(req.dayOfWeek)} se actualizó correctamente.`
        : `El horario del ${this.dayName(req.dayOfWeek)} se registró correctamente.`,
      () => (this.scheduleModalOpen = false),
    );
  }

  askDeleteSchedule(schedule: LocationScheduleResponse): void {
    this.openConfirm({
      title: 'Eliminar horario',
      message: `¿Seguro que deseas eliminar el horario del ${this.dayName(schedule.dayOfWeek)}? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      danger: true,
      action: () => this.deleteSchedule(schedule),
    });
  }

  private deleteSchedule(schedule: LocationScheduleResponse): void {
    this.handleAction(
      this.schedulesApi.delete(this.locationId, schedule.scheduleId),
      'Horario eliminado correctamente',
      `El horario del ${this.dayName(schedule.dayOfWeek)} fue eliminado.`,
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
        void this.toast.error((error.error as ApiErrorResponse)?.message || 'No se pudo completar la acción.');
      },
    });
  }
}
