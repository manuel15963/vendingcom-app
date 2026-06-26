import { environment } from '../../../environments/environment';

const authBaseUrl = `${environment.apiUrl}/auth`;
const authPasswordBaseUrl = `${authBaseUrl}/password`;

export const apiEndpoints = {
  auth: {
    login: `${authBaseUrl}/login`,
    me: `${authBaseUrl}/me`,
  },
  password: {
    changeMyPassword: `${authPasswordBaseUrl}/me`,
    resetUserPassword: (userId: number) => `${authPasswordBaseUrl}/users/${userId}`,
    requestRecovery: `${authPasswordBaseUrl}/recovery/request`,
    confirmRecovery: `${authPasswordBaseUrl}/recovery/confirm`,
  },
  users: {
    base: `${authBaseUrl}/users`,
    byId: (userId: number) => `${authBaseUrl}/users/${userId}`,
    search: `${authBaseUrl}/users/search`,
    activate: (userId: number) => `${authBaseUrl}/users/${userId}/activate`,
    lock: (userId: number) => `${authBaseUrl}/users/${userId}/lock`,
  },
  roles: {
    base: `${authBaseUrl}/roles`,
    search: `${authBaseUrl}/roles/search`,
  },
  auditLogs: {
    base: `${authBaseUrl}/audit-logs`,
    byUser: (userId: number) => `${authBaseUrl}/audit-logs/user/${userId}`,
    byAction: (actionType: string) => `${authBaseUrl}/audit-logs/action/${actionType}`,
  },
};
