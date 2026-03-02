import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Exercises } from '../exercises/exercises';

@Component({
  selector: 'app-routine',
  imports: [Exercises, MatButtonModule, MatIconModule],
  templateUrl: './routine.html',
  styleUrl: './routine.css',
})
export class Routine {

}
