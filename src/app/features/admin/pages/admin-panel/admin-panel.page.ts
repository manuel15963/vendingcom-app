import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import { ToastService } from '../../../../core/feedback/toast.service';
import { ApiErrorResponse } from '../../../../shared/models/api-response.models';
import { AuditLogsApiService } from '../../../audit-logs/data-access/audit-logs-api.service';
import { AuthAuditLogResponse } from '../../../audit-logs/models/audit-log.models';
import { AuthApiService } from '../../../auth/data-access/auth-api.service';
import { RolesApiService } from '../../../roles/data-access/roles-api.service';
import { AuthRoleResponse } from '../../../roles/models/role.models';
import { UsersApiService } from '../../../users/data-access/users-api.service';
import { AuthUserResponse, CreateUserRequest, UpdateUserRequest } from '../../../users/models/user.models';

type AdminTab = 'users' | 'roles' | 'audit';
type UserFormMode = 'create' | 'edit';
type UserFormField = 'username' | 'email' | 'password' | 'fullName' | 'phoneNumber' | 'documentNumber' | 'roleCode';

interface UserFormModel {
  userId?: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  documentType: string;
  documentNumber: string;
  roleCode: string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonBadge,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar
  ],
})
export class AdminPanelPage implements OnInit {

  private readonly authApi = inject(AuthApiService);
  private readonly usersApi = inject(UsersApiService);
  private readonly rolesApi = inject(RolesApiService);
  private readonly auditLogsApi = inject(AuditLogsApiService);
  private readonly alertController = inject(AlertController);
  private readonly toast = inject(ToastService);

  activeTab: AdminTab = 'users';
  users: AuthUserResponse[] = [];
  roles: AuthRoleResponse[] = [];
  auditLogs: AuthAuditLogResponse[] = [];
  selectedAuditLog: AuthAuditLogResponse | null = null;

  loadingUsers = false;
  loadingRoles = false;
  loadingAuditLogs = false;
  savingUser = false;
  errorMessage = '';
  formErrorMessage = '';

  userStatusFilter: number | undefined;
  auditActionFilter = '';
  auditUserFilter: number | undefined;

  userFormOpen = false;
  auditDetailOpen = false;
  successModalOpen = false;
  successModalTitle = '';
  successModalMessage = '';
  private pendingSuccessModal: { title: string; message: string } | null = null;
  userFormMode: UserFormMode = 'create';
  userForm: UserFormModel = this.getEmptyUserForm();
  touchedUserFields: Partial<Record<UserFormField, boolean>> = {};

  readonly session = this.authApi.getCurrentSession();
  readonly canManageUsers = this.authApi.hasAnyRole(['ADMIN']);

  get activeUsersCount(): number {
    return this.users.filter((user) => user.userStatus === 1).length;
  }

  get lockedUsersCount(): number {
    return this.users.filter((user) => user.userStatus === 2).length;
  }

  get userModalTitle(): string {
    return this.userFormMode === 'create'
      ? 'Crear usuario'
      : `Editar ${this.userForm.fullName || this.userForm.username}`;
  }

  get userModalDescription(): string {
    return this.userFormMode === 'create'
      ? 'Registra credenciales, datos personales y rol inicial.'
      : `Actualizando datos de @${this.userForm.username}.`;
  }

  get userPrimaryActionLabel(): string {
    return this.userFormMode === 'create' ? 'Crear usuario' : 'Guardar cambios';
  }

  ngOnInit(): void {
    this.loadRoles();
    this.loadUsers();
    this.loadAuditLogs();
  }

  setActiveTab(tab: AdminTab): void {
    this.activeTab = tab;
  }

  loadUsers(): void {
    this.loadingUsers = true;
    this.errorMessage = '';

    this.usersApi.findAll({ status: this.userStatusFilter }).subscribe({
      next: (users) => {
        this.users = users;
        this.loadingUsers = false;
      },
      error: (error) => this.handleLoadError(error, 'No se pudieron cargar los usuarios.')
    });
  }

  loadRoles(): void {
    this.loadingRoles = true;
    this.errorMessage = '';

    this.rolesApi.findAll({ activeOnly: false }).subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loadingRoles = false;
        this.ensureDefaultRoleSelected();
      },
      error: (error) => this.handleLoadError(error, 'No se pudieron cargar los roles.')
    });
  }

  loadAuditLogs(): void {
    this.loadingAuditLogs = true;
    this.errorMessage = '';

    const request = this.auditUserFilter
      ? this.auditLogsApi.findByAffectedUserId(this.auditUserFilter)
      : this.auditActionFilter
        ? this.auditLogsApi.findByActionType(this.auditActionFilter)
        : this.auditLogsApi.findAll();

    request.subscribe({
      next: (auditLogs) => {
        this.auditLogs = auditLogs;
        this.loadingAuditLogs = false;
      },
      error: (error) => this.handleLoadError(error, 'No se pudo cargar la auditoria.')
    });
  }

  clearUserFilters(): void {
    this.userStatusFilter = undefined;
    this.loadUsers();
  }

  setUserStatusFilter(status: number | undefined): void {
    this.userStatusFilter = status;
    this.loadUsers();
  }

  clearAuditFilters(): void {
    this.auditUserFilter = undefined;
    this.auditActionFilter = '';
    this.loadAuditLogs();
  }

  openCreateUserModal(): void {
    this.activeTab = 'users';
    this.userFormMode = 'create';
    this.userForm = this.getEmptyUserForm();
    this.formErrorMessage = '';
    this.touchedUserFields = {};
    this.ensureDefaultRoleSelected();
    this.userFormOpen = true;
  }

  openEditUserModal(user: AuthUserResponse): void {
    this.activeTab = 'users';
    this.userFormMode = 'edit';
    this.userForm = {
      userId: user.userId,
      username: user.username,
      email: user.email,
      password: '',
      fullName: user.fullName,
      phoneNumber: user.phoneNumber || '',
      documentType: user.documentType || '',
      documentNumber: user.documentNumber || '',
      roleCode: '',
    };
    this.formErrorMessage = '';
    this.touchedUserFields = {};
    this.userFormOpen = true;
  }

  closeUserModal(): void {
    this.userFormOpen = false;
    this.formErrorMessage = '';
    this.touchedUserFields = {};

    if (this.pendingSuccessModal) {
      const successModal = this.pendingSuccessModal;
      this.pendingSuccessModal = null;

      window.setTimeout(() => {
        this.showSuccessModal(successModal.title, successModal.message);
      }, 120);
    }
  }

  saveUser(): void {
    this.markAllUserFieldsAsTouched();
    const validationMessage = this.getUserFormValidationMessage();

    if (validationMessage) {
      this.formErrorMessage = validationMessage;
      return;
    }

    this.savingUser = true;
    this.errorMessage = '';
    this.formErrorMessage = '';

    const isCreateMode = this.userFormMode === 'create';
    const successName = this.userForm.fullName.trim() || this.userForm.username.trim();
    const request = this.userFormMode === 'create'
      ? this.usersApi.create(this.buildCreateUserRequest())
      : this.usersApi.update(this.userForm.userId as number, this.buildUpdateUserRequest());

    request.subscribe({
      next: () => {
        this.savingUser = false;
        this.pendingSuccessModal = {
          title: isCreateMode ? 'Usuario creado' : 'Usuario actualizado',
          message: isCreateMode
            ? `${successName} fue registrado correctamente y ya queda disponible en el modulo de acceso.`
            : `Los datos de ${successName} se actualizaron correctamente.`,
        };
        this.userFormOpen = false;
        this.loadUsers();
      },
      error: (error) => {
        this.savingUser = false;
        this.handleFormError(error, 'No se pudo guardar el usuario.');
      }
    });
  }

  async activateUser(userId: number): Promise<void> {
    const confirmed = await this.confirmAction(
      'Activar usuario',
      'El usuario podra iniciar sesion nuevamente.'
    );

    if (!confirmed) {
      return;
    }

    this.usersApi.activate(userId).subscribe({
      next: () => {
        void this.toast.success('Usuario activado.');
        this.loadUsers();
      },
      error: (error) => this.handleLoadError(error, 'No se pudo activar el usuario.')
    });
  }

  async lockUser(userId: number): Promise<void> {
    const confirmed = await this.confirmAction(
      'Bloquear usuario',
      'El usuario no podra acceder hasta que sea activado.'
    );

    if (!confirmed) {
      return;
    }

    this.usersApi.lock(userId).subscribe({
      next: () => {
        void this.toast.success('Usuario bloqueado.');
        this.loadUsers();
      },
      error: (error) => this.handleLoadError(error, 'No se pudo bloquear el usuario.')
    });
  }

  async deactivateUser(userId: number): Promise<void> {
    const confirmed = await this.confirmAction(
      'Desactivar usuario',
      'El usuario quedara inactivo de forma logica.'
    );

    if (!confirmed) {
      return;
    }

    this.usersApi.deactivate(userId).subscribe({
      next: () => {
        void this.toast.success('Usuario desactivado.');
        this.loadUsers();
      },
      error: (error) => this.handleLoadError(error, 'No se pudo desactivar el usuario.')
    });
  }

  openAuditDetail(auditLog: AuthAuditLogResponse): void {
    this.selectedAuditLog = auditLog;
    this.auditDetailOpen = true;
  }

  closeAuditDetail(): void {
    this.auditDetailOpen = false;
    this.selectedAuditLog = null;
  }

  closeSuccessModal(): void {
    this.successModalOpen = false;
  }

  getUserStatusLabel(status: number): string {
    const labels: Record<number, string> = {
      0: 'Inactivo',
      1: 'Activo',
      2: 'Bloqueado',
    };

    return labels[status] || 'Desconocido';
  }

  getStatusColor(status: number): string {
    const colors: Record<number, string> = {
      0: 'medium',
      1: 'success',
      2: 'warning',
    };

    return colors[status] || 'medium';
  }

  getRoleOptions(): AuthRoleResponse[] {
    return this.roles.filter((role) => role.roleStatus === 1);
  }

  selectRole(roleCode: string): void {
    this.userForm.roleCode = roleCode;
    this.markUserFieldAsTouched('roleCode');
  }

  selectDocumentType(documentType: string): void {
    this.userForm.documentType = documentType;
    if (!documentType) {
      this.userForm.documentNumber = '';
    }
    this.markUserFieldAsTouched('documentNumber');
  }

  isUserFormValid(): boolean {
    return !this.getUserFormValidationMessage();
  }

  markUserFieldAsTouched(field: UserFormField): void {
    this.touchedUserFields[field] = true;
  }

  shouldShowUserFieldError(field: UserFormField): boolean {
    return Boolean(this.touchedUserFields[field] && this.getUserFieldError(field));
  }

  getUserFieldError(field: UserFormField): string {
    const username = this.userForm.username.trim();
    const email = this.userForm.email.trim();
    const password = this.userForm.password.trim();
    const fullName = this.userForm.fullName.trim();
    const phoneNumber = this.userForm.phoneNumber.trim();
    const documentNumber = this.userForm.documentNumber.trim();
    const roleCode = this.userForm.roleCode.trim();

    if (field === 'username') {
      if (!username) {
        return 'El usuario es obligatorio.';
      }
      if (username.length > 50) {
        return 'Maximo 50 caracteres.';
      }
    }

    if (field === 'email') {
      if (!email) {
        return 'El correo es obligatorio.';
      }
      if (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Ingresa un correo valido de maximo 120 caracteres.';
      }
    }

    if (field === 'password' && this.userFormMode === 'create') {
      if (!password) {
        return 'La contrasena es obligatoria.';
      }
      if (password.length < 6) {
        return 'Debe tener al menos 6 caracteres.';
      }
    }

    if (field === 'fullName') {
      if (!fullName) {
        return 'El nombre completo es obligatorio.';
      }
      if (fullName.length > 150) {
        return 'Maximo 150 caracteres.';
      }
    }

    if (field === 'phoneNumber' && phoneNumber && !/^[0-9]{9}$/.test(phoneNumber)) {
      return 'Debe tener exactamente 9 digitos.';
    }

    if (field === 'documentNumber' && this.userForm.documentType === 'DNI') {
      if (!documentNumber) {
        return 'El DNI es obligatorio.';
      }
      if (!/^[0-9]{8}$/.test(documentNumber)) {
        return 'El DNI debe tener exactamente 8 digitos.';
      }
    }

    if (field === 'roleCode' && this.userFormMode === 'create' && !roleCode) {
      return 'Selecciona un rol inicial.';
    }

    return '';
  }

  private markAllUserFieldsAsTouched(): void {
    const fields: UserFormField[] = ['username', 'email', 'password', 'fullName', 'phoneNumber', 'documentNumber', 'roleCode'];

    fields.forEach((field) => this.markUserFieldAsTouched(field));
  }

  private getUserFormValidationMessage(): string {
    const fields: UserFormField[] = ['username', 'email', 'password', 'fullName', 'phoneNumber', 'documentNumber', 'roleCode'];

    return fields.map((field) => this.getUserFieldError(field)).find(Boolean) || '';
  }

  private buildCreateUserRequest(): CreateUserRequest {
    return {
      username: this.userForm.username.trim(),
      email: this.userForm.email.trim(),
      password: this.userForm.password.trim(),
      fullName: this.userForm.fullName.trim(),
      phoneNumber: this.userForm.phoneNumber.trim(),
      documentType: this.userForm.documentType.trim(),
      documentNumber: this.userForm.documentNumber.trim(),
      roleCode: this.userForm.roleCode.trim(),
    };
  }

  private buildUpdateUserRequest(): UpdateUserRequest {
    return {
      username: this.userForm.username.trim(),
      email: this.userForm.email.trim(),
      fullName: this.userForm.fullName.trim(),
      phoneNumber: this.userForm.phoneNumber.trim(),
      documentType: this.userForm.documentType.trim(),
      documentNumber: this.userForm.documentNumber.trim(),
      updatedByUserId: this.session?.userId || 0,
    };
  }

  private getEmptyUserForm(): UserFormModel {
    return {
      username: '',
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      documentType: 'DNI',
      documentNumber: '',
      roleCode: '',
    };
  }

  private ensureDefaultRoleSelected(): void {
    if (this.userFormMode !== 'create' || this.userForm.roleCode) {
      return;
    }

    const defaultRole = this.getRoleOptions()[0];

    if (defaultRole) {
      this.userForm.roleCode = defaultRole.roleCode;
    }
  }

  private showSuccessModal(title: string, message: string): void {
    this.successModalTitle = title;
    this.successModalMessage = message;
    this.successModalOpen = true;
  }

  private handleFormError(error: HttpErrorResponse, fallbackMessage: string): void {
    const apiError = error.error as ApiErrorResponse | undefined;

    this.formErrorMessage = apiError?.message || fallbackMessage;
    void this.toast.error(this.formErrorMessage);
  }

  private handleLoadError(error: HttpErrorResponse, fallbackMessage: string): void {
    const apiError = error.error as ApiErrorResponse | undefined;

    this.loadingUsers = false;
    this.loadingRoles = false;
    this.loadingAuditLogs = false;
    this.errorMessage = apiError?.message || fallbackMessage;
    void this.toast.error(this.errorMessage);
  }

  private async confirmAction(header: string, message: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
        },
      ],
    });

    await alert.present();

    const result = await alert.onDidDismiss();

    return result.role === 'confirm';
  }
}
