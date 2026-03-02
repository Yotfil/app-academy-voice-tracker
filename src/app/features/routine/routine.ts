import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Exercises } from '../exercises/exercises';
import { Resume } from '../resume/resume';

@Component({
  selector: 'app-routine',
  imports: [Exercises, Resume, MatButtonModule, MatIconModule],
  templateUrl: './routine.html',
  styleUrl: './routine.css',
})
export class Routine {
  showResume = signal(false);

  toggleView(): void {
    this.showResume.update((v) => !v);
  }
}
