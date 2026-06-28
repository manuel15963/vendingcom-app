import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiMessageResponse } from '../../../shared/models/api-response.models';
import { ContactRequest, CustomerContactResponse } from '../models/customer.models';

@Injectable({ providedIn: 'root' })
export class CustomerContactsApiService {

  private readonly http = inject(HttpClient);

  private base(customerId: number): string {
    return `${environment.customerApiUrl}/customers/${customerId}/contacts`;
  }

  list(customerId: number): Observable<CustomerContactResponse[]> {
    return this.http.get<CustomerContactResponse[]>(this.base(customerId));
  }

  create(customerId: number, request: ContactRequest): Observable<CustomerContactResponse> {
    return this.http.post<CustomerContactResponse>(this.base(customerId), request);
  }

  update(customerId: number, contactId: number, request: ContactRequest): Observable<CustomerContactResponse> {
    return this.http.put<CustomerContactResponse>(`${this.base(customerId)}/${contactId}`, request);
  }

  activate(customerId: number, contactId: number): Observable<CustomerContactResponse> {
    return this.http.patch<CustomerContactResponse>(`${this.base(customerId)}/${contactId}/activate`, {});
  }

  deactivate(customerId: number, contactId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.base(customerId)}/${contactId}`);
  }
}
