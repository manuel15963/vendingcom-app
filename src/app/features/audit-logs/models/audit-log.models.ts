export interface AuthAuditLogResponse {
  auditLogId: number;
  affectedUserId?: number | null;
  actionType: string;
  affectedTableName?: string | null;
  affectedRecordId?: number | null;
  actionDescription?: string | null;
  oldData?: string | null;
  newData?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  executedByUserId?: number | null;
  executedAt: string;
}
