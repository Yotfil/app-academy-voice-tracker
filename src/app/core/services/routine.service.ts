import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import dayjs from 'dayjs';
import ejerciciosJson from '../../../assets/data/ejercicios.json';
import type { Rutina } from '../models/rutina.model';
import { STORAGE_PORT } from '../ports/storage.port';

function getTodayDateString(): string {
  return dayjs().format('YYYY-MM-DD');
}

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private readonly storagePort = inject(STORAGE_PORT);

  /** Sustituir el `of(ejerciciosJson)` por `this.http.get<Rutina>(API_URL)` cuando exista la API. */
  loadDefaultRoutine(): Observable<Rutina> {
    return of(ejerciciosJson as unknown as Rutina);
  }

  ensureDailyRoutine(): Observable<Rutina> {
    const today = getTodayDateString();
    const existing = this.storagePort.getRoutine(today);
    if (existing !== null) return of(existing);
    return this.loadDefaultRoutine().pipe(
      map((rutina) => ({ ...rutina, fecha: today })),
      tap((rutina) => this.storagePort.saveRoutine(rutina))
    );
  }
}
