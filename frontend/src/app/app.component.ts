import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskBoardComponent } from './components/task-board/task-board.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
