import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { RoutineService } from './core/services/routine.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly routineService = inject(RoutineService);

  ngOnInit(): void {
    this.routineService.ensureDailyRoutine().pipe(take(1)).subscribe();
  }
}
