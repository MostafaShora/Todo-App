import { Component, inject, output } from '@angular/core';
import { TodoItem } from "../todo-item/todo-item";
import { TodoService } from '../../core/services/todo';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  private todoService = inject(TodoService);

  edit = output<Todo>();

  todos = this.todoService.filteredTodos;

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggleTodo(id: number) {
    this.todoService.toggleStatus(id);
  }

  onEdit(todo: Todo) {
    this.edit.emit(todo)
  }

}
