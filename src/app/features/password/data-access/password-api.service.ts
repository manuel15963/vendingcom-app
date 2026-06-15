import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiEndpoints } from '../../../core/config/api-endpoints';
import { ApiMessageResponse } from '../../../shared/models/api-response.models';
import {
  ChangePasswordRequest,
  PasswordRecoveryConfirmRequest,
  PasswordRecoveryRequest
} from '../../auth/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class PasswordApiService {

  private readonly http = inject(HttpClient);

  changeMyPassword(request: ChangePasswordRequest): Observable<ApiMessageResponse> {
    return this.http.patch<ApiMessageResponse>(apiEndpoints.password.changeMyPassword, request);
  }

  requestRecovery(request: PasswordRecoveryRequest): Observable<ApiMessageResponse> {
    return this.http.post<ApiMessageResponse>(apiEndpoints.password.requestRecovery, request);
  }

  confirmRecovery(request: PasswordRecoveryConfirmRequest): Observable<ApiMessageResponse> {
    return this.http.post<ApiMessageResponse>(apiEndpoints.password.confirmRecovery, request);
  }
}
