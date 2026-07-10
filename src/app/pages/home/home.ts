import { Component, inject, signal } from '@angular/core';
import { Header } from "../../components/header/header";
import { Stats } from "../../components/stats/stats";
import { AddTask } from "../../components/add-task/add-task";
import { Toolbar } from "../../components/toolbar/toolbar";
import { TodoList } from "../../components/todo-list/todo-list";
import { Todo } from '../../models/todo.model';
import { EditTodoModal } from "../../features/todos/components/edit-todo-modal/edit-todo-modal";
import { TodoService } from '../../core/services/todo';

@Component({
  selector: 'app-home',
  imports: [Header, Stats, AddTask, Toolbar, TodoList, EditTodoModal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private todoService = inject(TodoService);

  selectedTodo = signal<Todo | null>(null);

  isEditModalOpen = signal(false);

  openEdit(todo: Todo) {
    console.log('Home', todo);
    this.selectedTodo.set(todo);
    this.isEditModalOpen.set(true);
  }

  closeEdit() {
    this.selectedTodo.set(null);
    this.isEditModalOpen.set(false);
  }

  saveTodo(event: { id: number; title: string }) {

    this.todoService.updateTodo(
      event.id,
      event.title
    );

    this.closeEdit();

  }


}
