import { Component, inject, OnInit, signal } from '@angular/core';
import { take } from 'rxjs/operators';
import dayjs from 'dayjs';
import { Exercise } from '../exercise/exercise';
import type { Grupo } from '../../core/models/grupo.model';
import { RoutineService } from '../../core/services/routine.service';
import { LocalStorageAdapter } from '../../core/adapters/local-storage.adapter';

@Component({
  selector: 'app-exercises',
  imports: [Exercise],
  templateUrl: './exercises.html',
  styleUrl: './exercises.css',
})
export class Exercises implements OnInit {
  private readonly routineService = inject(RoutineService);
  private readonly storage = inject(LocalStorageAdapter);

  groups = signal<Grupo[]>([]);

  ngOnInit(): void {
    this.loadRoutineGroups();
  }

  private loadRoutineGroups(): void {
    const today = this.getTodayDateString();
    const routine = this.storage.getRoutine(today);
    if (routine) return void this.groups.set(routine.grupos);
    this.routineService
      .ensureDailyRoutine()
      .pipe(take(1))
      .subscribe((rutina) => this.groups.set(rutina.grupos));
  }

  markExerciseDone(groupIndex: number, exerciseIndex: number, done: boolean): void {
    this.groups.update((groups) => {
      const updated = groups.map((group, gi) => {
        if (gi !== groupIndex) return group;
        return {
          ...group,
          ejercicios: group.ejercicios.map((ejercicio, ei) => {
            if (ei !== exerciseIndex) return ejercicio;
            return {
              ...ejercicio,
              hecho: done,
              horaRealizado: done ? dayjs().format('HH:mm') : null,
            };
          }),
        };
      });
      this.syncToStorage(updated);
      return updated;
    });
  }

  private syncToStorage(groups: Grupo[]): void {
    const today = this.getTodayDateString();
    this.storage.saveRoutine({ grupos: groups, fecha: today });
  }

  private getTodayDateString(): string {
    return dayjs().format('YYYY-MM-DD');
  }
}
