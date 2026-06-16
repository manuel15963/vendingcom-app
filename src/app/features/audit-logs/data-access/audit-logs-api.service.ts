import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiEndpoints } from '../../../core/config/api-endpoints';
import { AuthAuditLogResponse } from '../models/audit-log.models';

@Injectable({
  providedIn: 'root'
})
export class AuditLogsApiService {

  private readonly http = inject(HttpClient);

  findAll(): Observable<AuthAuditLogResponse[]> {
    return this.http.get<AuthAuditLogResponse[]>(apiEndpoints.auditLogs.base);
  }

  findByAffectedUserId(userId: number): Observable<AuthAuditLogResponse[]> {
    return this.http.get<AuthAuditLogResponse[]>(apiEndpoints.auditLogs.byUser(userId));
  }

  findByActionType(actionType: string): Observable<AuthAuditLogResponse[]> {
    return this.http.get<AuthAuditLogResponse[]>(apiEndpoints.auditLogs.byAction(actionType));
  }
}
