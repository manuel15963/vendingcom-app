export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthRole {
  roleId: number;
  roleCode: string;
  roleName: string;
  roleDescription?: string;
  roleStatus: number;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
  username: string;
  email: string;
  fullName: string;
  userStatus: number;
  lastLoginAt?: string;
  roles: AuthRole[];
  message: string;
}

export interface AuthenticatedUserResponse {
  userId: number;
  username: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface PasswordRecoveryRequest {
  email: string;
}

export interface PasswordRecoveryConfirmRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface AuthSession {
  token: string;
  userId: number;
  username: string;
  email: string;
  fullName: string;
  userStatus: number;
  roles: Array<AuthRole | string>;
  expiresAt: string;
}
