import {
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../../../models/todo.model';

@Component({
  selector: 'app-edit-todo-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo-modal.html',
  styleUrl: './edit-todo-modal.css',
})
export class EditTodoModal {

  todo = input.required<Todo>();

  close = output<void>();

  save = output<{
    id: number;
    title: string;
  }>();

  title = signal('');

  constructor() {

    effect(() => {
      this.title.set(this.todo().title);
    });

  }

  onSave() {

    console.log('Modal Save');
    const value = this.title().trim();

    if (!value) return;

    this.save.emit({
      id: this.todo().id,
      title: value,
    });

  }

  onClose() {
    this.close.emit();
  }

}