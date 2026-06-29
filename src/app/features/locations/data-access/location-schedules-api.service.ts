import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiMessageResponse } from '@shared/models/api-response.models';
import { LocationScheduleResponse, ScheduleRequest } from '../models/location.models';

@Injectable({ providedIn: 'root' })
export class LocationSchedulesApiService {

  private readonly http = inject(HttpClient);

  private base(locationId: number): string {
    return `${environment.locationApiUrl}/locations/${locationId}/schedules`;
  }

  list(locationId: number): Observable<LocationScheduleResponse[]> {
    return this.http.get<LocationScheduleResponse[]>(this.base(locationId));
  }

  create(locationId: number, request: ScheduleRequest): Observable<LocationScheduleResponse> {
    return this.http.post<LocationScheduleResponse>(this.base(locationId), request);
  }

  update(locationId: number, scheduleId: number, request: ScheduleRequest): Observable<LocationScheduleResponse> {
    return this.http.put<LocationScheduleResponse>(`${this.base(locationId)}/${scheduleId}`, request);
  }

  /** Los horarios se eliminan de forma definitiva (no se desactivan). */
  delete(locationId: number, scheduleId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.base(locationId)}/${scheduleId}`);
  }
}
