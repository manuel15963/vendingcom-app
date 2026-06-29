import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiMessageResponse, PagedResponse } from '@shared/models/api-response.models';
import {
  CreateLocationRequest,
  LocationDetailResponse,
  LocationResponse,
  LocationSearchParams,
  UpdateLocationRequest,
} from '../models/location.models';

@Injectable({ providedIn: 'root' })
export class LocationsApiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.locationApiUrl}/locations`;

  search(params: LocationSearchParams): Observable<PagedResponse<LocationResponse>> {
    let httpParams = new HttpParams()
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 20);

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.customerId != null) {
      httpParams = httpParams.set('customerId', params.customerId);
    }
    if (params.typeId != null) {
      httpParams = httpParams.set('typeId', params.typeId);
    }
    if (params.statusId != null) {
      httpParams = httpParams.set('statusId', params.statusId);
    }

    return this.http.get<PagedResponse<LocationResponse>>(this.baseUrl, { params: httpParams });
  }

  getById(locationId: number): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${this.baseUrl}/${locationId}`);
  }

  getDetail(locationId: number): Observable<LocationDetailResponse> {
    return this.http.get<LocationDetailResponse>(`${this.baseUrl}/${locationId}/detail`);
  }

  create(request: CreateLocationRequest): Observable<LocationResponse> {
    return this.http.post<LocationResponse>(this.baseUrl, request);
  }

  update(locationId: number, request: UpdateLocationRequest): Observable<LocationResponse> {
    return this.http.put<LocationResponse>(`${this.baseUrl}/${locationId}`, request);
  }

  activate(locationId: number): Observable<LocationResponse> {
    return this.http.patch<LocationResponse>(`${this.baseUrl}/${locationId}/activate`, {});
  }

  deactivate(locationId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.baseUrl}/${locationId}`);
  }
}
