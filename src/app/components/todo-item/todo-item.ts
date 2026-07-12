import { Component, computed, inject, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoService } from '../../core/services/todo';
import { getRelativeDueDate } from '../../core/utils/date.utils';

@Component({
  selector: 'app-todo-item',
  imports: [DatePipe, CommonModule, FormsModule, DragDropModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {

  private todoService = inject(TodoService);

  todo = input.required<Todo>();

  delete = output<Todo>();

  toggle = output<number>();

  edit = output<Todo>();


  onDelete() {
    this.delete.emit(this.todo())
  }

  onToggle() {
    this.toggle.emit(this.todo().id)
  }

  onEdit() {
    this.edit.emit(this.todo());
  }

  isOverdue() {
    return this.todoService.isOverdue(this.todo());
  }

  relativeDueDate = computed(() => {
    const dueDate = this.todo().dueDate;

    return dueDate ? getRelativeDueDate(dueDate) : '';
  });

}
