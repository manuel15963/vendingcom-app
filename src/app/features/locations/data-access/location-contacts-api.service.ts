import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiMessageResponse } from '@shared/models/api-response.models';
import { ContactRequest, LocationContactResponse } from '../models/location.models';

@Injectable({ providedIn: 'root' })
export class LocationContactsApiService {

  private readonly http = inject(HttpClient);

  private base(locationId: number): string {
    return `${environment.locationApiUrl}/locations/${locationId}/contacts`;
  }

  list(locationId: number): Observable<LocationContactResponse[]> {
    return this.http.get<LocationContactResponse[]>(this.base(locationId));
  }

  create(locationId: number, request: ContactRequest): Observable<LocationContactResponse> {
    return this.http.post<LocationContactResponse>(this.base(locationId), request);
  }

  update(locationId: number, contactId: number, request: ContactRequest): Observable<LocationContactResponse> {
    return this.http.put<LocationContactResponse>(`${this.base(locationId)}/${contactId}`, request);
  }

  activate(locationId: number, contactId: number): Observable<LocationContactResponse> {
    return this.http.patch<LocationContactResponse>(`${this.base(locationId)}/${contactId}/activate`, {});
  }

  deactivate(locationId: number, contactId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.base(locationId)}/${contactId}`);
  }
}
