export interface AuthUserResponse {
  userId: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber?: string | null;
  documentType?: string | null;
  documentNumber?: string | null;
  userStatus: number;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  documentType?: string;
  documentNumber?: string;
  roleCode: string;
}

export interface UpdateUserRequest {
  username: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  documentType?: string;
  documentNumber?: string;
  updatedByUserId: number;
}

export interface FindUsersParams {
  status?: number;
}
