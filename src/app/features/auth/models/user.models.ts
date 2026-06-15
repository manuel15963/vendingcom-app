export interface AuthUser {
  userId: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  documentType?: string;
  documentNumber?: string;
  userStatus: number;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthRoleDetail {
  roleId: number;
  roleCode: string;
  roleName: string;
  roleDescription?: string;
  roleStatus: number;
}

export interface AuthParameter {
  parameterId: number;
  parameterGroup: string;
  parameterCode: string;
  parameterValue: string;
  parameterDescription?: string;
  sortOrder: number;
  parameterStatus: number;
}
