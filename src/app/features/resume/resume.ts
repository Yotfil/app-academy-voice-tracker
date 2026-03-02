import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import dayjs from 'dayjs';
import type { Grupo } from '../../core/models/grupo.model';
import { LocalStorageAdapter } from '../../core/adapters/local-storage.adapter';

@Component({
  selector: 'app-resume',
  imports: [MatIconModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume implements OnInit {
  private readonly storage = inject(LocalStorageAdapter);

  groups = signal<Grupo[]>([]);
  today = dayjs().format('DD/MM/YYYY');

  ngOnInit(): void {
    const routine = this.storage.getRoutine(dayjs().format('YYYY-MM-DD'));
    this.groups.set(routine?.grupos ?? []);
  }

  get totalEjercicios(): number {
    return this.groups().reduce((acc, g) => acc + g.ejercicios.length, 0);
  }

  get totalHechos(): number {
    return this.groups().reduce(
      (acc, g) => acc + g.ejercicios.filter((e) => e.hecho).length,
      0
    );
  }
}
