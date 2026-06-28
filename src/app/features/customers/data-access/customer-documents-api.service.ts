import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiMessageResponse } from '@shared/models/api-response.models';
import { CustomerDocumentResponse, DocumentRequest } from '../models/customer.models';

@Injectable({ providedIn: 'root' })
export class CustomerDocumentsApiService {

  private readonly http = inject(HttpClient);

  private base(customerId: number): string {
    return `${environment.customerApiUrl}/customers/${customerId}/documents`;
  }

  list(customerId: number): Observable<CustomerDocumentResponse[]> {
    return this.http.get<CustomerDocumentResponse[]>(this.base(customerId));
  }

  create(customerId: number, request: DocumentRequest): Observable<CustomerDocumentResponse> {
    return this.http.post<CustomerDocumentResponse>(this.base(customerId), request);
  }

  update(customerId: number, documentId: number, request: DocumentRequest): Observable<CustomerDocumentResponse> {
    return this.http.put<CustomerDocumentResponse>(`${this.base(customerId)}/${documentId}`, request);
  }

  activate(customerId: number, documentId: number): Observable<CustomerDocumentResponse> {
    return this.http.patch<CustomerDocumentResponse>(`${this.base(customerId)}/${documentId}/activate`, {});
  }

  deactivate(customerId: number, documentId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.base(customerId)}/${documentId}`);
  }
}
