import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { MachineParameter } from '../models/machine.models';

@Injectable({ providedIn: 'root' })
export class MachineCatalogApiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.machineApiUrl}/machine-parameters`;

  /** Parámetros activos de un grupo (MACHINE_STATUS, EVENT_TYPE, DOCUMENT_TYPE). */
  getByGroup(group: string): Observable<MachineParameter[]> {
    const params = new HttpParams().set('group', group);
    return this.http.get<MachineParameter[]>(this.baseUrl, { params });
  }
}
