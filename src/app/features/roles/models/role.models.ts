export interface AuthRoleResponse {
  roleId: number;
  roleCode: string;
  roleName: string;
  roleDescription?: string | null;
  roleStatus: number;
}

export interface FindRolesParams {
  activeOnly?: boolean;
}
