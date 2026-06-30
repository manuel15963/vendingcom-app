import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { constructOutline, createOutline, eyeOutline, warningOutline } from 'ionicons/icons';

import { ApiErrorResponse } from '@shared/models/api-response.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusPillComponent } from '@shared/ui/status-pill/status-pill.component';
import { MachineFormModalComponent } from '../../components/machine-form-modal/machine-form-modal.component';
import { MachinesApiService } from '../../data-access/machines-api.service';
import { MachineResponse } from '../../models/machine.models';
import { StatusLabel } from '../../models/machine.constants';
import { MaintenanceState, getMaintenanceInfo } from '../../util/maintenance.util';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.page.html',
  styleUrls: ['./machines-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonContent,
    IonSpinner,
    IonIcon,
    MachineFormModalComponent,
    AvatarComponent,
    StatusPillComponent,
  ],
})
export class MachinesListPage implements OnInit {

  private readonly machinesApi = inject(MachinesApiService);
  private readonly router = inject(Router);

  constructor() {
    addIcons({ eyeOutline, createOutline, warningOutline, constructOutline });
  }

  machines: MachineResponse[] = [];
  loading = false;
  errorMessage = '';

  search = '';
  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;

  // Modal de crear/editar máquina
  formModalOpen = false;
  editingMachineId: number | null = null;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = '';

    this.machinesApi.search({ search: this.search.trim() || undefined, page: this.page, size: this.size }).subscribe({
      next: (paged) => {
        this.machines = paged.content;
        this.totalElements = paged.totalElements;
        this.totalPages = paged.totalPages;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = (error.error as ApiErrorResponse)?.message || 'No se pudieron cargar las máquinas.';
      },
    });
  }

  applySearch(): void {
    this.page = 0;
    this.load();
  }

  nextPage(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.load();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.load();
    }
  }

  /** Solo "Activa" se muestra en verde; el resto (inactiva, mantenimiento, fuera de servicio) en gris. */
  isActive(machine: MachineResponse): boolean {
    return machine.machineStatusName === StatusLabel.ACTIVE;
  }

  /** Subtítulo: código · tipo/marca/serie. */
  subtitle(machine: MachineResponse): string {
    const extra = machine.machineTypeName || machine.brand || machine.serialNumber || 'sin tipo';
    return `${machine.code ?? 's/código'} · ${extra}`;
  }

  /** Estado del mantenimiento preventivo (para el aviso en la tarjeta). */
  maintenanceState(machine: MachineResponse): MaintenanceState {
    return getMaintenanceInfo(machine).state;
  }

  newMachine(): void {
    this.editingMachineId = null;
    this.formModalOpen = true;
  }

  editMachine(machine: MachineResponse, event?: Event): void {
    event?.stopPropagation();
    this.editingMachineId = machine.machineId;
    this.formModalOpen = true;
  }

  onFormSaved(): void {
    this.formModalOpen = false;
    this.page = 0;
    this.load();
  }

  open(machine: MachineResponse): void {
    void this.router.navigateByUrl(`/machines/${machine.machineId}`);
  }
}
