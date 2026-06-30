import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ApiMessageResponse } from '@shared/models/api-response.models';
import { DocumentRequest, MachineDocumentResponse } from '../models/machine.models';

@Injectable({ providedIn: 'root' })
export class MachineDocumentsApiService {

  private readonly http = inject(HttpClient);

  private base(machineId: number): string {
    return `${environment.machineApiUrl}/machines/${machineId}/documents`;
  }

  list(machineId: number): Observable<MachineDocumentResponse[]> {
    return this.http.get<MachineDocumentResponse[]>(this.base(machineId));
  }

  create(machineId: number, request: DocumentRequest): Observable<MachineDocumentResponse> {
    return this.http.post<MachineDocumentResponse>(this.base(machineId), request);
  }

  /** Los documentos se eliminan de forma definitiva. */
  delete(machineId: number, documentId: number): Observable<ApiMessageResponse> {
    return this.http.delete<ApiMessageResponse>(`${this.base(machineId)}/${documentId}`);
  }
}
