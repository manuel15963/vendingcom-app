import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import {
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
import { PASSWORD_HINT, getPasswordError, isPasswordValid } from '../../../../core/validation/password-policy';
import { PasswordApiService } from '../../../password/data-access/password-api.service';
import { ApiErrorResponse, ApiMessageResponse } from '../../../../shared/models/api-response.models';
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
type FeedbackTone = 'success' | 'warning' | 'danger';
type AuditDataSource = 'old' | 'new';

interface AuditDataField {
  key: string;
  label: string;
}

interface AuditChange {
  label: string;
  before: string;
  after: string;
}

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
  userStatus?: number;
}

interface PendingUserAction {
  type: 'activate' | 'lock' | 'deactivate';
  userId: number;
  title: string;
  message: string;
  confirmLabel: string;
  tone: 'primary' | 'warning' | 'danger';
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
  private readonly passwordApi = inject(PasswordApiService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly passwordHint = PASSWORD_HINT;

  activeTab: AdminTab = 'users';
  users: AuthUserResponse[] = [];
  allUsers: AuthUserResponse[] = [];
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
  confirmationModalOpen = false;
  successModalTitle = '';
  successModalMessage = '';
  successModalTone: FeedbackTone = 'success';
  private pendingSuccessModal: { title: string; message: string; tone?: FeedbackTone } | null = null;
  pendingUserAction: PendingUserAction | null = null;

  resetPasswordModalOpen = false;
  resetTargetUser: AuthUserResponse | null = null;
  resetNewPassword = '';
  resetPasswordTouched = false;
  savingResetPassword = false;

  userFormMode: UserFormMode = 'create';
  userForm: UserFormModel = this.getEmptyUserForm();
  touchedUserFields: Partial<Record<UserFormField, boolean>> = {};
  readonly auditIdentityFields: AuditDataField[] = [
    { key: 'username', label: 'Usuario' },
    { key: 'fullName', label: 'Nombre' },
    { key: 'email', label: 'Correo' },
    { key: 'phoneNumber', label: 'Telefono' },
    { key: 'documentNumber', label: 'Documento' },
    { key: 'userStatus', label: 'Estado' },
  ];

  private readonly auditDataCache = new Map<string, Record<string, unknown> | null>();

  readonly session = this.authApi.getCurrentSession();
  readonly canManageUsers = this.authApi.hasAnyRole(['ADMIN']);

  get displayName(): string {
    return this.session?.fullName || this.session?.username || 'Administrador';
  }

  get displayRole(): string {
    const firstRole = this.session?.roles?.[0];
    const role = typeof firstRole === 'string' ? firstRole : firstRole?.roleName || firstRole?.roleCode || 'Administrador';

    return this.formatRole(role);
  }

  get userInitials(): string {
    const words = this.displayName.trim().split(/\s+/).slice(0, 2);

    return words.map((word) => word[0]?.toUpperCase() || '').join('') || 'VC';
  }

  get userFormInitials(): string {
    const name = this.userForm.fullName || this.userForm.username || 'Usuario';
    const words = name.trim().split(/\s+/).slice(0, 2);

    return words.map((word) => word[0]?.toUpperCase() || '').join('') || 'US';
  }

  get activeUsersCount(): number {
    return this.users.filter((user) => user.userStatus === 1).length;
  }

  get lockedUsersCount(): number {
    return this.users.filter((user) => user.userStatus === 2).length;
  }

  get inactiveUsersCount(): number {
    return this.users.filter((user) => user.userStatus === 0).length;
  }

  get activeUsersPercent(): number {
    return this.getPercent(this.activeUsersCount, this.users.length);
  }

  get lockedUsersPercent(): number {
    return this.getPercent(this.lockedUsersCount, this.users.length);
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

  get userModalIcon(): string {
    return this.userFormMode === 'create' ? 'assets/dashboard/icons/users.svg' : 'assets/profile/icons/edit.svg';
  }

  get editingStatusLabel(): string {
    return this.getUserStatusLabel(this.userForm.userStatus ?? 1);
  }

  get editingStatusClass(): string {
    return this.getStatusClass(this.userForm.userStatus ?? 1);
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
        if (this.userStatusFilter === undefined) {
          this.allUsers = users;
        }
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
      userStatus: user.userStatus,
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
        this.showSuccessModal(successModal.title, successModal.message, successModal.tone);
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

  activateUser(userId: number): void {
    this.openConfirmationModal({
      type: 'activate',
      userId,
      title: 'Activar usuario',
      message: 'Este usuario podra iniciar sesion nuevamente y recuperar el acceso al sistema.',
      confirmLabel: 'Activar usuario',
      tone: 'primary',
    });
  }

  lockUser(userId: number): void {
    this.openConfirmationModal({
      type: 'lock',
      userId,
      title: 'Bloquear usuario',
      message: 'El usuario no podra acceder hasta que un administrador lo active nuevamente.',
      confirmLabel: 'Bloquear usuario',
      tone: 'warning',
    });
  }

  deactivateUser(userId: number): void {
    this.openConfirmationModal({
      type: 'deactivate',
      userId,
      title: 'Eliminar usuario',
      message: 'Se realizara una eliminacion logica. El usuario quedara inactivo y no podra acceder al sistema.',
      confirmLabel: 'Eliminar usuario',
      tone: 'danger',
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

  closeConfirmationModal(): void {
    this.confirmationModalOpen = false;
    this.pendingUserAction = null;
  }

  confirmPendingUserAction(): void {
    if (!this.pendingUserAction) {
      return;
    }

    const action = this.pendingUserAction;
    const request: Observable<AuthUserResponse | ApiMessageResponse> = action.type === 'activate'
      ? this.usersApi.activate(action.userId)
      : action.type === 'lock'
        ? this.usersApi.lock(action.userId)
        : this.usersApi.deactivate(action.userId);
    const successTitle = action.type === 'activate'
      ? 'Usuario activado'
      : action.type === 'lock'
        ? 'Usuario bloqueado'
        : 'Usuario eliminado';
    const successMessage = action.type === 'activate'
      ? 'La cuenta fue activada correctamente. El usuario ya puede volver a iniciar sesion.'
      : action.type === 'lock'
        ? 'La cuenta fue bloqueada correctamente. El usuario no podra acceder hasta que sea activado.'
        : 'El usuario fue eliminado de forma logica y ya no podra acceder al sistema.';
    const errorMessage = action.type === 'activate'
      ? 'No se pudo activar el usuario.'
      : action.type === 'lock'
        ? 'No se pudo bloquear el usuario.'
        : 'No se pudo eliminar el usuario.';

    request.subscribe({
      next: () => {
        this.closeConfirmationModal();
        window.setTimeout(() => {
          this.showSuccessModal(successTitle, successMessage, action.type === 'lock' ? 'warning' : action.type === 'deactivate' ? 'danger' : 'success');
        }, 120);
        this.loadUsers();
      },
      error: (error) => {
        this.closeConfirmationModal();
        this.handleLoadError(error, errorMessage);
      }
    });
  }

  openResetPasswordModal(user: AuthUserResponse): void {
    this.resetTargetUser = user;
    this.resetNewPassword = '';
    this.resetPasswordTouched = false;
    this.resetPasswordModalOpen = true;
  }

  closeResetPasswordModal(): void {
    this.resetPasswordModalOpen = false;
    this.resetTargetUser = null;
    this.resetNewPassword = '';
    this.resetPasswordTouched = false;
  }

  get resetPasswordError(): string | null {
    return this.resetPasswordTouched ? getPasswordError(this.resetNewPassword) : null;
  }

  get canSubmitResetPassword(): boolean {
    return isPasswordValid(this.resetNewPassword);
  }

  submitResetPassword(): void {
    this.resetPasswordTouched = true;

    if (!this.resetTargetUser || !this.canSubmitResetPassword) {
      return;
    }

    const targetUser = this.resetTargetUser;
    this.savingResetPassword = true;

    this.passwordApi.resetUserPassword(targetUser.userId, { newPassword: this.resetNewPassword.trim() }).subscribe({
      next: () => {
        this.savingResetPassword = false;
        this.closeResetPasswordModal();
        window.setTimeout(() => {
          this.showSuccessModal(
            'Contrasena restablecida',
            `La contrasena de ${targetUser.fullName || targetUser.username} se restablecio correctamente.`,
          );
        }, 120);
      },
      error: (error: HttpErrorResponse) => {
        this.savingResetPassword = false;
        const apiError = error.error as ApiErrorResponse | undefined;
        void this.toast.error(apiError?.message || 'No se pudo restablecer la contrasena.');
      }
    });
  }

  logout(): void {
    this.authApi.logout();
    void this.router.navigateByUrl('/login');
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

  getStatusClass(status: number): string {
    const classes: Record<number, string> = {
      0: 'inactive',
      1: 'active',
      2: 'locked',
    };

    return classes[status] || 'inactive';
  }

  getRoleOptions(): AuthRoleResponse[] {
    return this.roles.filter((role) => role.roleStatus === 1);
  }

  getAuditUserLabel(userId?: number | null): string {
    if (!userId) {
      return '-';
    }

    const user = this.allUsers.find((item) => item.userId === userId) || this.users.find((item) => item.userId === userId);

    return user ? `${user.fullName || user.username}` : `Usuario #${userId}`;
  }

  getAuditActionLabel(actionType?: string | null): string {
    const actionMap: Record<string, string> = {
      LOGIN_SUCCESS: 'Inicio correcto',
      LOGIN_FAILED: 'Inicio fallido',
      USER_CREATED: 'Usuario creado',
      USER_UPDATED: 'Usuario actualizado',
      USER_LOCKED: 'Usuario bloqueado',
      USER_ACTIVATED: 'Usuario activado',
      USER_DELETED: 'Usuario eliminado',
      PASSWORD_CHANGED: 'Contrasena cambiada',
      PASSWORD_RECOVERY_REQUESTED: 'Recuperacion solicitada',
      PASSWORD_RESET: 'Contrasena restablecida',
    };
    const normalizedAction = (actionType || '').trim().toUpperCase();

    return actionMap[normalizedAction] || this.formatAuditToken(normalizedAction || 'Evento');
  }

  getAuditActionClass(actionType?: string | null): string {
    const normalizedAction = (actionType || '').trim().toUpperCase();

    if (normalizedAction.includes('FAILED') || normalizedAction.includes('DELETED')) {
      return 'danger';
    }

    if (normalizedAction.includes('LOCK') || normalizedAction.includes('RECOVERY') || normalizedAction.includes('PASSWORD')) {
      return 'warning';
    }

    if (normalizedAction.includes('LOGIN') || normalizedAction.includes('CREATED') || normalizedAction.includes('UPDATED') || normalizedAction.includes('ACTIVATED')) {
      return 'success';
    }

    return 'info';
  }

  getAuditSubject(auditLog: AuthAuditLogResponse): string {
    const parsedData = this.getAuditParsedData(auditLog, 'new') || this.getAuditParsedData(auditLog, 'old');
    const fullName = this.getParsedText(parsedData, 'fullName');
    const username = this.getParsedText(parsedData, 'username');

    if (fullName && username) {
      return `${fullName} (@${username})`;
    }

    return fullName || username || this.getAuditUserLabel(auditLog.affectedUserId);
  }

  getAuditDataValue(auditLog: AuthAuditLogResponse, source: AuditDataSource, key: string): string {
    const parsedData = this.getAuditParsedData(auditLog, source);

    if (key === 'documentNumber') {
      const documentType = this.getParsedText(parsedData, 'documentType') || 'Documento';
      const documentNumber = this.getParsedText(parsedData, 'documentNumber');

      return documentNumber ? `${documentType} ${documentNumber}` : '-';
    }

    return this.formatAuditValue(parsedData?.[key], key);
  }

  getAuditChanges(auditLog: AuthAuditLogResponse): AuditChange[] {
    const oldData = this.getAuditParsedData(auditLog, 'old');
    const newData = this.getAuditParsedData(auditLog, 'new');

    if (!oldData || !newData) {
      return [];
    }

    const keys = Array.from(new Set([...Object.keys(oldData), ...Object.keys(newData)]));

    return keys
      .filter((key) => JSON.stringify(oldData[key] ?? null) !== JSON.stringify(newData[key] ?? null))
      .map((key) => ({
        label: this.getAuditFieldLabel(key),
        before: this.formatAuditValue(oldData[key], key),
        after: this.formatAuditValue(newData[key], key),
      }));
  }

  getAuditRawData(auditLog: AuthAuditLogResponse, source: AuditDataSource): string {
    const rawData = source === 'old' ? auditLog.oldData : auditLog.newData;

    return rawData?.trim() || '-';
  }

  getRoleDisplayName(role: AuthRoleResponse): string {
    return this.formatRole(role.roleName || role.roleCode);
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
      const passwordError = getPasswordError(password);
      if (passwordError) {
        return passwordError;
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
      userStatus: 1,
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

  private showSuccessModal(title: string, message: string, tone: FeedbackTone = 'success'): void {
    this.successModalTitle = title;
    this.successModalMessage = message;
    this.successModalTone = tone;
    this.successModalOpen = true;
  }

  private openConfirmationModal(action: PendingUserAction): void {
    this.pendingUserAction = action;
    this.confirmationModalOpen = true;
  }

  private getPercent(value: number, total: number): number {
    return total ? Math.round((value / total) * 100) : 0;
  }

  private formatRole(role: string): string {
    const roleMap: Record<string, string> = {
      ADMIN: 'Administrador',
      ADMINISTRADOR: 'Administrador',
      SUPERVISOR: 'Supervisor',
      OPERATOR: 'Operador',
      OPERADOR: 'Operador',
      USER: 'Usuario',
      USUARIO: 'Usuario',
    };
    const normalizedRole = role.trim().toUpperCase();

    return roleMap[normalizedRole] || role;
  }

  private getAuditParsedData(auditLog: AuthAuditLogResponse, source: AuditDataSource): Record<string, unknown> | null {
    const rawData = source === 'old' ? auditLog.oldData : auditLog.newData;

    if (!rawData?.trim()) {
      return null;
    }

    if (this.auditDataCache.has(rawData)) {
      return this.auditDataCache.get(rawData) || null;
    }

    try {
      const parsedData = JSON.parse(rawData) as unknown;
      const normalizedData = parsedData && typeof parsedData === 'object' && !Array.isArray(parsedData)
        ? parsedData as Record<string, unknown>
        : null;

      this.auditDataCache.set(rawData, normalizedData);
      return normalizedData;
    } catch {
      this.auditDataCache.set(rawData, null);
      return null;
    }
  }

  private getParsedText(parsedData: Record<string, unknown> | null, key: string): string {
    const value = parsedData?.[key];

    return typeof value === 'string' ? value.trim() : '';
  }

  private getAuditFieldLabel(key: string): string {
    const labels: Record<string, string> = {
      userId: 'ID usuario',
      username: 'Usuario',
      email: 'Correo',
      fullName: 'Nombre',
      phoneNumber: 'Telefono',
      documentType: 'Tipo documento',
      documentNumber: 'Documento',
      userStatus: 'Estado',
      createdAt: 'Creado',
      updatedAt: 'Actualizado',
      lastLoginAt: 'Ultimo login',
    };

    return labels[key] || this.formatAuditToken(key);
  }

  private formatAuditValue(value: unknown, key?: string): string {
    if (value === null || value === undefined || value === '') {
      return '-';
    }

    if (key === 'userStatus' && typeof value === 'number') {
      return this.getUserStatusLabel(value);
    }

    if ((key === 'createdAt' || key === 'updatedAt' || key === 'lastLoginAt') && typeof value === 'string') {
      return new Intl.DateTimeFormat('es-PE', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'America/Lima',
      }).format(new Date(value));
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

  private formatAuditToken(value: string): string {
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
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

}
