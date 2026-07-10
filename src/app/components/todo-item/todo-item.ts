import { Component, input, output, signal } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  imports: [DatePipe, CommonModule, FormsModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {

  todo = input.required<Todo>();

  delete = output<number>();

  toggle = output<number>();

  edit = output<Todo>();


  onDelete() {
    this.delete.emit(this.todo().id)
  }

  onToggle() {
    this.toggle.emit(this.todo().id)
  }

  onEdit() {
    this.edit.emit(this.todo());
  }

}
