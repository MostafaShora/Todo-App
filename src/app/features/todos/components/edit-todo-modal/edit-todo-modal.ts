import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../../../models/todo.model';
import { Priority } from '../../../../core/types/priority.type';

@Component({
  selector: 'app-edit-todo-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo-modal.html',
  styleUrl: './edit-todo-modal.css',
})
export class EditTodoModal {
  todo = input.required<Todo>();

  dueDate = signal<string>('');

  close = output<void>();

  save = output<{
    id: number;
    title: string;
    priority: Priority;
    dueDate: Date | null;
  }>();

  title = signal('');

  priority = signal<Priority>('Low');
  isPriorityOpen = signal(false)

  constructor() {
    effect(() => {
      const todo = this.todo();

      this.title.set(todo.title);
      this.priority.set(todo.priority);

      this.dueDate.set(
        todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : '',
      )
    });
  }

  togglePriority() {
    this.isPriorityOpen.update(value => !value);
  }

  selectPriority(priority: Priority) {
    this.priority.set(priority);
    this.isPriorityOpen.set(false);
  }

  onSave() {
    console.log('Modal Save');
    const value = this.title().trim();

    if (!value) return;

    this.save.emit({
      id: this.todo().id,
      title: value,
      priority: this.priority(),
      dueDate: this.dueDate() ? new Date(this.dueDate()) : null
    });
  }

  onClose() {
    this.close.emit();
  }
}
