import { Component, computed, inject, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stats',
  imports: [FormsModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats {
  private todoService = inject(TodoService);

  search = signal('');

  totalTodos = this.todoService.totalTodos;

  completedTodos = this.todoService.completedTodos;

  pendingTodos = this.todoService.pendingTodos;

  filteredTodos = computed(() => {
    const search = this.search().toLowerCase();

    return this.todoService.todos().filter(todo =>
      todo.title.toLowerCase().includes(search)
    );
  });
}
