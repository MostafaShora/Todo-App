import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../shared/services/toast';
import { Priority } from '../../core/types/priority.type';
import { Category } from '../../core/types/category.type';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  private todoService = inject(TodoService);
  private toastService = inject(ToastService);

  private elementRef = inject(ElementRef)

  priority = signal<Priority>('Medium');
  category = signal<Category>('Personal');
  dueDate = signal<string>('');

  isPriorityOpen = signal(false);
  isCategoryOpen = signal(false);
  taskTitle = '';

  addTask() {
    const title = this.taskTitle.trim();
    if (!title) return;

    this.todoService.addTodo(title, this.priority(), this.category(), this.dueDate() ? new Date(this.dueDate()) : null);

    this.toastService.show(
      'Success',
      'Task added successfully'
    );

    this.taskTitle = '';
    this.priority.set('Medium');
    this.category.set('Personal');
    this.dueDate.set('');
    this.category.set('Personal');

  }

  togglePriority() {
    this.isCategoryOpen.set(false);
    this.isPriorityOpen.update(v => !v);
  }

  toggleCategory() {
    this.isPriorityOpen.set(false);
    this.isCategoryOpen.update(v => !v);
  }

  selectPriority(priority: Priority) {
    this.priority.set(priority);
    this.isPriorityOpen.set(false);
  }

  selectCategory(category: Category) {
    this.category.set(category);
    this.isCategoryOpen.set(false);
  }

  closeDropdowns() {
    this.isPriorityOpen.set(false);
    this.isCategoryOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.closeDropdowns();
    }
  }
}
