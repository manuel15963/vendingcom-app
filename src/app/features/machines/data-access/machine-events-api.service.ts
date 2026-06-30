import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { EventRequest, MachineEventResponse } from '../models/machine.models';

@Injectable({ providedIn: 'root' })
export class MachineEventsApiService {

  private readonly http = inject(HttpClient);

  private base(machineId: number): string {
    return `${environment.machineApiUrl}/machines/${machineId}/events`;
  }

  list(machineId: number): Observable<MachineEventResponse[]> {
    return this.http.get<MachineEventResponse[]>(this.base(machineId));
  }

  create(machineId: number, request: EventRequest): Observable<MachineEventResponse> {
    return this.http.post<MachineEventResponse>(this.base(machineId), request);
  }
}
