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
