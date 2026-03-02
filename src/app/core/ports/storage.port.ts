import { InjectionToken } from '@angular/core';
import type { Rutina } from '../models/rutina.model';

export interface StoragePort {
  saveRoutine(routine: Rutina): void;
  getRoutine(date: string): Rutina | null;
}
export const STORAGE_PORT = new InjectionToken<StoragePort>('STORAGE_PORT');