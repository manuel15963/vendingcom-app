export interface CustomerResponse {
  customerId: number;
  businessName: string;
  tradeName?: string;
  customerTypeId: number;
  customerTypeName?: string;
  mainEmail?: string;
  mainPhone?: string;
  website?: string;
  customerStatusId: number;
  customerStatusName?: string;
  createdByUserId?: number;
  updatedByUserId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCustomerRequest {
  businessName: string;
  tradeName?: string;
  customerTypeId: number;
  mainEmail?: string;
  mainPhone?: string;
  website?: string;
}

export type UpdateCustomerRequest = CreateCustomerRequest;

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface CustomerParameter {
  parameterId: number;
  parameterGroup: string;
  parameterCode: string;
  parameterValue: string;
  description?: string;
  sortOrder?: number;
}

export interface CustomerContactResponse {
  contactId: number;
  customerId: number;
  fullName: string;
  position?: string;
  email?: string;
  phone?: string;
  isPrimary: boolean;
  contactStatusId: number;
  contactStatusName?: string;
}

export interface CustomerAddressResponse {
  addressId: number;
  customerId: number;
  addressTypeId: number;
  addressTypeName?: string;
  addressLine: string;
  district?: string;
  province?: string;
  department?: string;
  country?: string;
  reference?: string;
  isPrimary: boolean;
  addressStatusId: number;
  addressStatusName?: string;
}

export interface CustomerDocumentResponse {
  documentId: number;
  customerId: number;
  documentTypeId: number;
  documentTypeName?: string;
  documentNumber: string;
  fileUrl?: string;
  isPrimary: boolean;
  documentStatusId: number;
  documentStatusName?: string;
}

export interface CustomerDetailResponse {
  customer: CustomerResponse;
  contacts: CustomerContactResponse[];
  addresses: CustomerAddressResponse[];
  documents: CustomerDocumentResponse[];
}

export interface CustomerSearchParams {
  search?: string;
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

export interface AddressRequest {
  addressTypeId: number;
  addressLine: string;
  district?: string;
  province?: string;
  department?: string;
  country?: string;
  reference?: string;
  isPrimary?: boolean;
}

export interface DocumentRequest {
  documentTypeId: number;
  documentNumber: string;
  fileUrl?: string;
  isPrimary?: boolean;
}
