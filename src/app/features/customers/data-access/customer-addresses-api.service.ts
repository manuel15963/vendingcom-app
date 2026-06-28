import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiMessageResponse } from '@shared/models/api-response.models';
import { AddressRequest, CustomerAddressResponse } from '../models/customer.models';

@Injectable({ providedIn: 'root' })
export class CustomerAddressesApiService {

  private readonly http = inject(HttpClient);

  private base(customerId: number): string {
    return `${environment.customerApiUrl}/customers/${customerId}/addresses`;
  }

  list(customerId: number): Observable<CustomerAddressResponse[]> {
    return this.http.get<CustomerAddressResponse[]>(this.base(customerId));
  }

  create(customerId: number, request: AddressRequest): Observable<CustomerAddressResponse> {
    return this.http.post<CustomerAddressResponse>(this.base(customerId), request);
  }

  update(customerId: number, addressId: number, request: AddressRequest): Observable<CustomerAddressResponse> {
    return this.http.put<CustomerAddressResponse>(`${this.base(customerId)}/${addressId}`, request);
  }

  activate(customerId: number, addressId: number): Observable<CustomerAddressResponse> {
    return this.http.patch<CustomerAddressResponse>(`${this.base(customerId)}/${addressId}/activate`, {});
  }

  deactivate(customerId: number, addressId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.base(customerId)}/${addressId}`);
  }
}
