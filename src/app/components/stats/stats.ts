import { Component, computed, inject, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/i18n/language.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-stats',
  imports: [FormsModule, CommonModule, TranslocoPipe],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {
  private todoService = inject(TodoService);
  protected language = inject(LanguageService);

  totalTodos = this.todoService.totalTodos;

  completedTodos = this.todoService.completedTodos;

  pendingTodos = this.todoService.pendingTodos;

  overdueTodos = this.todoService.overdueCountTodos;
}
