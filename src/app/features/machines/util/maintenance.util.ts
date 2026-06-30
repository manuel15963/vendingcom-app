import { MachineResponse } from '../models/machine.models';

export type MaintenanceState = 'none' | 'ok' | 'soon' | 'overdue';

export interface MaintenanceInfo {
  /** Próxima fecha de mantenimiento calculada (o null si no hay datos suficientes). */
  nextDate: Date | null;
  /** Días que faltan (negativo = vencido). null si no aplica. */
  daysLeft: number | null;
  state: MaintenanceState;
}

type MaintenanceFields = Pick<MachineResponse, 'installationDate' | 'lastMaintenanceDate' | 'maintenanceIntervalDays'>;

const MS_PER_DAY = 86_400_000;
const SOON_THRESHOLD_DAYS = 7;

/**
 * Calcula el estado del mantenimiento preventivo:
 * próxima fecha = (último mantenimiento ?? instalación) + intervalo de días.
 * Si no hay intervalo o no hay fecha base, el estado es 'none'.
 */
export function getMaintenanceInfo(machine: MaintenanceFields): MaintenanceInfo {
  const interval = machine.maintenanceIntervalDays;
  const baseStr = machine.lastMaintenanceDate || machine.installationDate;

  if (!interval || interval <= 0 || !baseStr) {
    return { nextDate: null, daysLeft: null, state: 'none' };
  }

  const base = new Date(`${baseStr}T00:00:00`);
  if (Number.isNaN(base.getTime())) {
    return { nextDate: null, daysLeft: null, state: 'none' };
  }

  const nextDate = new Date(base);
  nextDate.setDate(nextDate.getDate() + interval);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysLeft = Math.round((nextDate.getTime() - today.getTime()) / MS_PER_DAY);

  let state: MaintenanceState = 'ok';
  if (daysLeft < 0) {
    state = 'overdue';
  } else if (daysLeft <= SOON_THRESHOLD_DAYS) {
    state = 'soon';
  }

  return { nextDate, daysLeft, state };
}
