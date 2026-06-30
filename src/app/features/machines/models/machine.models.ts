export interface MachineResponse {
  machineId: number;
  code?: string;
  qrCode?: string;
  customerId: number;
  locationId: number;
  model?: string;
  brand?: string;
  serialNumber?: string;
  machineStatusId: number;
  machineStatusName?: string;
  machineTypeId?: number;
  machineTypeName?: string;       // "Snacks", "Café", etc. (resuelto del catálogo)
  installationDate?: string;     // "2026-01-15"
  lastMaintenanceDate?: string;
  maintenanceIntervalDays?: number;  // cada cuántos días requiere mantenimiento
  notes?: string;
  createdByUserId?: number;
  updatedByUserId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMachineRequest {
  customerId: number;
  locationId: number;
  model?: string;
  brand?: string;
  serialNumber?: string;
  installationDate?: string;
  lastMaintenanceDate?: string;
  machineTypeId?: number;
  maintenanceIntervalDays?: number;
  notes?: string;
  qrCode?: string;
}

/** Al actualizar NO se cambian cliente/ubicación/estado/QR (van por sus propios endpoints). */
export type UpdateMachineRequest = Omit<CreateMachineRequest, 'customerId' | 'locationId' | 'qrCode'>;

export interface ChangeStatusRequest {
  code: string;   // ACTIVE | INACTIVE | MAINTENANCE | OUT_OF_SERVICE
}

export interface MachineParameter {
  parameterId: number;
  parameterGroup: string;
  parameterCode: string;
  parameterValue: string;
  description?: string;
  sortOrder?: number;
}

export interface MachineEventResponse {
  eventId: number;
  machineId: number;
  eventTypeId: number;
  eventTypeName?: string;
  title: string;
  description?: string;
  performedByUserId?: number;
  eventDate?: string;
  metadata?: string;
  createdAt?: string;
}

export interface MachineDocumentResponse {
  documentId: number;
  machineId: number;
  documentTypeId: number;
  documentTypeName?: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  mimeType?: string;
  uploadedByUserId?: number;
  uploadedAt?: string;
}

export interface MachineDetailResponse {
  machine: MachineResponse;
  events: MachineEventResponse[];
  documents: MachineDocumentResponse[];
}

export interface MachineSearchParams {
  search?: string;
  customerId?: number;
  locationId?: number;
  statusId?: number;
  page?: number;
  size?: number;
}

// ---- Requests de sub-recursos ----

export interface EventRequest {
  eventTypeId: number;
  title: string;
  description?: string;
  metadata?: string;
}

export interface DocumentRequest {
  documentTypeId: number;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  mimeType?: string;
}
