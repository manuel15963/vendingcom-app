import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiMessageResponse, PagedResponse } from '@shared/models/api-response.models';
import {
  CreateCustomerRequest,
  CustomerDetailResponse,
  CustomerResponse,
  CustomerSearchParams,
  UpdateCustomerRequest,
} from '../models/customer.models';

@Injectable({ providedIn: 'root' })
export class CustomersApiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.customerApiUrl}/customers`;

  search(params: CustomerSearchParams): Observable<PagedResponse<CustomerResponse>> {
    let httpParams = new HttpParams()
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 20);

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.typeId != null) {
      httpParams = httpParams.set('typeId', params.typeId);
    }
    if (params.statusId != null) {
      httpParams = httpParams.set('statusId', params.statusId);
    }

    return this.http.get<PagedResponse<CustomerResponse>>(this.baseUrl, { params: httpParams });
  }

  getById(customerId: number): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.baseUrl}/${customerId}`);
  }

  getDetail(customerId: number): Observable<CustomerDetailResponse> {
    return this.http.get<CustomerDetailResponse>(`${this.baseUrl}/${customerId}/detail`);
  }

  create(request: CreateCustomerRequest): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(this.baseUrl, request);
  }

  update(customerId: number, request: UpdateCustomerRequest): Observable<CustomerResponse> {
    return this.http.put<CustomerResponse>(`${this.baseUrl}/${customerId}`, request);
  }

  activate(customerId: number): Observable<CustomerResponse> {
    return this.http.patch<CustomerResponse>(`${this.baseUrl}/${customerId}/activate`, {});
  }

  deactivate(customerId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.baseUrl}/${customerId}`);
  }
}
