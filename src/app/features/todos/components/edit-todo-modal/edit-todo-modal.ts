import { afterNextRender, Component, effect, ElementRef, HostListener, inject, input, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../../../models/todo.model';
import { Priority } from '../../../../core/types/priority.type';
import { Category } from '../../../../core/types/category.type';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../../../core/i18n/language.service';

@Component({
  selector: 'app-edit-todo-modal',
  standalone: true,
  imports: [FormsModule, TranslocoPipe],
  templateUrl: './edit-todo-modal.html',
  styleUrl: './edit-todo-modal.css',
})
export class EditTodoModal {

  private elementRef = inject(ElementRef);

  protected language = inject(LanguageService);


  titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');

  todo = input.required<Todo>();

  dueDate = signal<string>('');

  close = output<void>();

  save = output<{
    id: number;
    title: string;
    priority: Priority;
    category: Category;
    dueDate: Date | null;
  }>();

  title = signal('');

  priority = signal<Priority>('Low');
  category = signal<Category>('Personal');

  isPriorityOpen = signal(false)
  isCategoryOpen = signal(false);

  constructor() {
    effect(() => {
      const todo = this.todo();

      this.title.set(todo.title);
      this.priority.set(todo.priority);
      this.category.set(todo.category);
      this.dueDate.set(
        todo.dueDate
          ? todo.dueDate.toISOString().split('T')[0]
          : ''
      );
    });

    afterNextRender(() => {
      this.titleInput()?.nativeElement.focus();
    });
  }

  togglePriority() {
    this.isCategoryOpen.set(false);
    this.isPriorityOpen.update(value => !value);
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

  onSave() {
    const value = this.title().trim();

    if (!value) return;

    this.save.emit({
      id: this.todo().id,
      title: value,
      priority: this.priority(),
      category: this.category(),
      dueDate: this.dueDate() ? new Date(this.dueDate()) : null
    });
  }

  onClose() {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.onClose();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.isPriorityOpen.set(false);
      this.isCategoryOpen.set(false);
    }

  }
}