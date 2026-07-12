import { Component, inject, signal } from '@angular/core';
import { Header } from "../../components/header/header";
import { Stats } from "../../components/stats/stats";
import { AddTask } from "../../components/add-task/add-task";
import { Toolbar } from "../../components/toolbar/toolbar";
import { TodoList } from "../../components/todo-list/todo-list";
import { Todo } from '../../models/todo.model';
import { EditTodoModal } from "../../features/todos/components/edit-todo-modal/edit-todo-modal";
import { TodoService } from '../../core/services/todo';
import { ConfirmModal } from "../../shared/components/confirm-modal/confirm-modal";
import { Toast } from "../../shared/components/toast/toast";
import { ToastService } from '../../shared/services/toast';
import { Priority } from '../../core/types/priority.type';

@Component({
  selector: 'app-home',
  imports: [Header, Stats, AddTask, Toolbar, TodoList, EditTodoModal, ConfirmModal, Toast],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private todoService = inject(TodoService);

  private toastService = inject(ToastService);

  selectedTodo = signal<Todo | null>(null);

  isEditModalOpen = signal(false);

  deleteTodo = signal<Todo | null>(null);

  isDeleteModalOpen = signal(false);

  openEdit(todo: Todo) {
    console.log('Home', todo);
    this.selectedTodo.set(todo);
    this.isEditModalOpen.set(true);
  }

  closeEdit() {
    this.selectedTodo.set(null);
    this.isEditModalOpen.set(false);
  }

  saveTodo(event: { id: number; title: string; priority: Priority; dueDate: Date | null }) {

    this.todoService.updateTodo(
      event.id,
      event.title,
      event.priority,
      event.dueDate
    );

    this.toastService.show(
      'Success',
      'Task updated successfully'
    );

    this.closeEdit();

  }

  openDelete(todo: Todo) {

    this.deleteTodo.set(todo);

    this.isDeleteModalOpen.set(true);

  }

  closeDelete() {

    this.deleteTodo.set(null);

    this.isDeleteModalOpen.set(false);

  }

  confirmDelete() {

    const todo = this.deleteTodo();

    if (!todo) return;

    this.todoService.deleteTodo(todo.id);

    this.toastService.show(
      'Deleted',
      'Task deleted successfully',
      'error'
    );

    this.closeDelete();

  }

}
