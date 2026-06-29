export interface LocationResponse {
  locationId: number;
  locationCode?: string;
  customerId: number;
  locationName: string;
  locationTypeId: number;
  locationTypeName?: string;
  zoneId?: number;
  zoneName?: string;
  addressLine: string;
  district?: string;
  province?: string;
  department?: string;
  country?: string;
  postalCode?: string;
  reference?: string;
  latitude?: number;
  longitude?: number;
  locationStatusId: number;
  locationStatusName?: string;
  createdByUserId?: number;
  updatedByUserId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLocationRequest {
  customerId: number;
  locationName: string;
  locationTypeId: number;
  zoneId?: number;
  addressLine: string;
  district?: string;
  province?: string;
  department?: string;
  country?: string;
  postalCode?: string;
  reference?: string;
  latitude?: number;
  longitude?: number;
}

/** Al actualizar NO se cambia el cliente: el backend ignora customerId. */
export type UpdateLocationRequest = Omit<CreateLocationRequest, 'customerId'>;

export interface LocationParameter {
  parameterId: number;
  parameterGroup: string;
  parameterCode: string;
  parameterValue: string;
  description?: string;
  sortOrder?: number;
}

export interface LocationContactResponse {
  contactId: number;
  locationId: number;
  fullName: string;
  position?: string;
  email?: string;
  phone?: string;
  isPrimary: boolean;
  contactStatusId: number;
  contactStatusName?: string;
}

export interface LocationScheduleResponse {
  scheduleId: number;
  locationId: number;
  dayOfWeek: number;
  /** Formato "HH:mm:ss" (o "HH:mm") que devuelve el backend. */
  openingTime?: string;
  closingTime?: string;
  isClosed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LocationDetailResponse {
  location: LocationResponse;
  contacts: LocationContactResponse[];
  schedules: LocationScheduleResponse[];
}

export interface LocationSearchParams {
  search?: string;
  customerId?: number;
  typeId?: number;
  statusId?: number;
  page?: number;
  size?: number;
}

// ---- Requests de sub-recursos ----

export interface ContactRequest {
  fullName: string;
  position?: string;
  email?: string;
  phone?: string;
  isPrimary?: boolean;
}

export interface ScheduleRequest {
  dayOfWeek: number;
  openingTime?: string | null;
  closingTime?: string | null;
  isClosed?: boolean;
}
