import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../shared/services/toast';
import { Priority } from '../../core/types/priority.type';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  private todoService = inject(TodoService);

  private toastService = inject(ToastService);

  riority = signal<Priority>('Medium');

  isPriorityOpen = signal(false);
  taskTitle = '';
  priority: Priority = 'Medium';

  addTask() {
    const title = this.taskTitle.trim();
    if (!title) return;

    this.todoService.addTodo(title, this.priority);

    this.toastService.show(
      'Success',
      'Task added successfully'
    );

    this.taskTitle = '';
    this.priority = 'Medium';

  }

  togglePriority() {
    this.isPriorityOpen.update(v => !v);
  }

  selectPriority(priority: Priority) {
    this.priority = priority;
    this.isPriorityOpen.set(false);
  }
}
