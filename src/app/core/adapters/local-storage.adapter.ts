import { Injectable } from '@angular/core';
import type { StoragePort } from '../ports/storage.port';
import type { Rutina } from '../models/rutina.model';

const STORAGE_KEY_PREFIX = 'routine';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageAdapter implements StoragePort {
  saveRoutine(routine: Rutina): void {
    const key = `${STORAGE_KEY_PREFIX}-${routine.fecha}`;
    localStorage.setItem(key, JSON.stringify(routine));
  }

  getRoutine(date: string): Rutina | null {
    const key = `${STORAGE_KEY_PREFIX}-${date}`;
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as Rutina;
    } catch {
      return null;
    }
  }
}
