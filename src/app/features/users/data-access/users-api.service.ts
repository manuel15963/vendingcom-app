import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiEndpoints } from '../../../core/config/api-endpoints';
import { ApiMessageResponse } from '../../../shared/models/api-response.models';
import {
  AuthUserResponse,
  CreateUserRequest,
  FindUsersParams,
  UpdateUserRequest
} from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private readonly http = inject(HttpClient);

  findAll(params: FindUsersParams = {}): Observable<AuthUserResponse[]> {
    return this.http.get<AuthUserResponse[]>(apiEndpoints.users.base, {
      params: this.buildFindAllParams(params),
    });
  }

  findById(userId: number): Observable<AuthUserResponse> {
    return this.http.get<AuthUserResponse>(apiEndpoints.users.byId(userId));
  }

  findByUsername(username: string): Observable<AuthUserResponse> {
    return this.http.get<AuthUserResponse>(apiEndpoints.users.search, {
      params: new HttpParams().set('username', username),
    });
  }

  create(request: CreateUserRequest): Observable<AuthUserResponse> {
    return this.http.post<AuthUserResponse>(apiEndpoints.users.base, request);
  }

  update(userId: number, request: UpdateUserRequest): Observable<AuthUserResponse> {
    return this.http.put<AuthUserResponse>(apiEndpoints.users.byId(userId), request);
  }

  deactivate(userId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(apiEndpoints.users.byId(userId));
  }

  activate(userId: number): Observable<AuthUserResponse> {
    return this.http.patch<AuthUserResponse>(apiEndpoints.users.activate(userId), {});
  }

  lock(userId: number): Observable<AuthUserResponse> {
    return this.http.patch<AuthUserResponse>(apiEndpoints.users.lock(userId), {});
  }

  private buildFindAllParams(params: FindUsersParams): HttpParams {
    let httpParams = new HttpParams();

    if (params.status !== undefined) {
      httpParams = httpParams.set('status', params.status);
    }

    return httpParams;
  }
}
