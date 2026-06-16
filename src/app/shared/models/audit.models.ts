export interface AuditLog {
  auditLogId: number;
  affectedUserId?: number;
  action: string;
  tableName?: string;
  affectedRecordId?: number;
  oldData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  executedByUserId?: number;
  executedAt: string;
}
