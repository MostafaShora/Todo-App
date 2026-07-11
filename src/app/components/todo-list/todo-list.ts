import { Component, inject, output } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { TodoService } from '../../core/services/todo';
import { Todo } from '../../models/todo.model';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem, DragDropModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  private todoService = inject(TodoService);

  edit = output<Todo>();

  todos = this.todoService.filteredTodos;

  delete = output<Todo>();

  onDelete(todo: Todo) {
    this.delete.emit(todo);
  }

  toggleTodo(id: number) {
    this.todoService.toggleStatus(id);
  }

  onEdit(todo: Todo) {
    this.edit.emit(todo)
  }

  onDrop(event: CdkDragDrop<Todo[]>) {
    this.todoService.reorderTodos(
      event.previousIndex,
      event.currentIndex
    )

  }

}
