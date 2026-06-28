import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CustomerParameter } from '../models/customer.models';

@Injectable({ providedIn: 'root' })
export class CustomerCatalogApiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.customerApiUrl}/customer-parameters`;

  /** Parámetros activos de un grupo (CUSTOMER_TYPE, DOCUMENT_TYPE, ADDRESS_TYPE...). */
  getByGroup(group: string): Observable<CustomerParameter[]> {
    const params = new HttpParams().set('group', group);
    return this.http.get<CustomerParameter[]>(this.baseUrl, { params });
  }
}
