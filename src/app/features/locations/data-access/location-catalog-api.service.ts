import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { LocationParameter } from '../models/location.models';

@Injectable({ providedIn: 'root' })
export class LocationCatalogApiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.locationApiUrl}/location-parameters`;

  /** Parámetros activos de un grupo (LOCATION_TYPE, LOCATION_ZONE...). */
  getByGroup(group: string): Observable<LocationParameter[]> {
    const params = new HttpParams().set('group', group);
    return this.http.get<LocationParameter[]>(this.baseUrl, { params });
  }
}
