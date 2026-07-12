import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from "@vercel/analytics"


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ToDoApp');

  constructor() {
    inject();
  }

}
