import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
  mimeType?: string;
}

/**
 * Sube archivos (PDF / imágenes) directamente a Supabase Storage usando la API REST.
 * El navegador manda los bytes a Supabase; nosotros solo guardamos la URL resultante
 * en machine_documents. No usa SDK: HttpClient + la anon key (pública).
 */
@Injectable({ providedIn: 'root' })
export class MachineStorageService {

  private readonly http = inject(HttpClient);
  private readonly bucket = 'machine-documents';

  /** Hay configuración de Supabase para poder subir. */
  get configured(): boolean {
    return !!environment.supabaseUrl && !!environment.supabaseAnonKey;
  }

  /**
   * Sube el archivo a `{folder}/{timestamp}-{nombre}` y devuelve su URL pública + metadatos.
   */
  upload(file: File, folder: string): Observable<UploadedFile> {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const objectPath = `${folder}/${Date.now()}-${safeName}`;
    const endpoint = `${environment.supabaseUrl}/storage/v1/object/${this.bucket}/${objectPath}`;

    // Sin x-upsert: cada archivo usa una ruta única (timestamp), así que es un INSERT puro.
    // (Con upsert, Supabase exigiría también permiso de UPDATE en la política del bucket.)
    const headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      Authorization: `Bearer ${environment.supabaseAnonKey}`,
      'Content-Type': file.type || 'application/octet-stream',
    });

    return this.http.post(endpoint, file, { headers }).pipe(
      map(() => ({
        url: `${environment.supabaseUrl}/storage/v1/object/public/${this.bucket}/${objectPath}`,
        name: file.name,
        size: file.size,
        mimeType: file.type || undefined,
      })),
    );
  }
}
