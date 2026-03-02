import { Component, input, output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import type { Ejercicio } from '../../core/models/ejercicio.model';

@Component({
  selector: 'app-exercise',
  imports: [MatSlideToggleModule, MatIconModule],
  templateUrl: './exercise.html',
  styleUrl: './exercise.css',
})
export class Exercise {
  /** Ejercicio a mostrar */
  exercise = input.required<Ejercicio>();
  /** Número de orden en la lista (ej. 1, 2, 3) */
  index = input<number>(0);
  /** Nombre del icono Material (ej. 'front_hand') para el placeholder izquierdo */
  icon = input<string | null>(null);

  /** Se emite cuando cambia el estado "hecho" del ejercicio */
  doneChange = output<boolean>();

  get durationLabel(): string {
    const dur = this.exercise().duracion;
    return dur >= 60 ? `${Math.floor(dur / 60)} min` : `${dur} seg`;
  }

  onToggle(checked: boolean): void {
    this.doneChange.emit(checked);
  }
}
