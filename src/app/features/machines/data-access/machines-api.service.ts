import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiMessageResponse, PagedResponse } from '@shared/models/api-response.models';
import {
  ChangeStatusRequest,
  CreateMachineRequest,
  MachineDetailResponse,
  MachineResponse,
  MachineSearchParams,
  UpdateMachineRequest,
} from '../models/machine.models';

@Injectable({ providedIn: 'root' })
export class MachinesApiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.machineApiUrl}/machines`;

  search(params: MachineSearchParams): Observable<PagedResponse<MachineResponse>> {
    let httpParams = new HttpParams()
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 20);

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.customerId != null) {
      httpParams = httpParams.set('customerId', params.customerId);
    }
    if (params.locationId != null) {
      httpParams = httpParams.set('locationId', params.locationId);
    }
    if (params.statusId != null) {
      httpParams = httpParams.set('statusId', params.statusId);
    }

    return this.http.get<PagedResponse<MachineResponse>>(this.baseUrl, { params: httpParams });
  }

  getById(machineId: number): Observable<MachineResponse> {
    return this.http.get<MachineResponse>(`${this.baseUrl}/${machineId}`);
  }

  getDetail(machineId: number): Observable<MachineDetailResponse> {
    return this.http.get<MachineDetailResponse>(`${this.baseUrl}/${machineId}/detail`);
  }

  create(request: CreateMachineRequest): Observable<MachineResponse> {
    return this.http.post<MachineResponse>(this.baseUrl, request);
  }

  update(machineId: number, request: UpdateMachineRequest): Observable<MachineResponse> {
    return this.http.put<MachineResponse>(`${this.baseUrl}/${machineId}`, request);
  }

  activate(machineId: number): Observable<MachineResponse> {
    return this.http.patch<MachineResponse>(`${this.baseUrl}/${machineId}/activate`, {});
  }

  changeStatus(machineId: number, code: string): Observable<MachineResponse> {
    const body: ChangeStatusRequest = { code };
    return this.http.patch<MachineResponse>(`${this.baseUrl}/${machineId}/status`, body);
  }

  deactivate(machineId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.baseUrl}/${machineId}`);
  }
}
