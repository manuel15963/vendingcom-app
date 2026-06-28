export interface ApiMessageResponse {
  code: string;
  message: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  timestamp?: string;
  status?: number;
  code?: string;
  message?: string;
}

/** Respuesta paginada genérica (la usan todas las features). */
export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
