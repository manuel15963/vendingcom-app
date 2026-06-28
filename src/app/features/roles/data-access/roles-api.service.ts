import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiEndpoints } from '@core/config/api-endpoints';
import { AuthRoleResponse, FindRolesParams } from '../models/role.models';

@Injectable({
  providedIn: 'root'
})
export class RolesApiService {

  private readonly http = inject(HttpClient);

  findAll(params: FindRolesParams = {}): Observable<AuthRoleResponse[]> {
    return this.http.get<AuthRoleResponse[]>(apiEndpoints.roles.base, {
      params: new HttpParams().set('activeOnly', params.activeOnly ?? false),
    });
  }

  findByRoleCode(roleCode: string): Observable<AuthRoleResponse> {
    return this.http.get<AuthRoleResponse>(apiEndpoints.roles.search, {
      params: new HttpParams().set('roleCode', roleCode),
    });
  }
}
