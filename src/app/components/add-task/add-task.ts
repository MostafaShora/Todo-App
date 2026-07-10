import { Component, inject } from '@angular/core';
import { TodoService } from '../../core/services/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  private todoService = inject(TodoService);

  taskTitle = '';

  addTask() {
    const title = this.taskTitle.trim();
    if(!title) return;

    this.todoService.addTodo(title);

    this.taskTitle = '';
  
  }
}
