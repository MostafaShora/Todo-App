import { Component, computed, inject, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  imports: [FormsModule, CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {
  private todoService = inject(TodoService);

  totalTodos = this.todoService.totalTodos;

  completedTodos = this.todoService.completedTodos;

  pendingTodos = this.todoService.pendingTodos;

  overdueTodos = this.todoService.overdueCountTodos;
}
