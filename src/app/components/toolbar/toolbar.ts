import { Component, computed, ElementRef, HostListener, inject, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo';
import { TodoFilter } from '../../core/types/todo-filter.type';
import { SortOption } from '../../core/types/sort-option.type';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  private todoService = inject(TodoService);
  private elementRef = inject(ElementRef)

  currentFilter = this.todoService.filter;
  currentSort = this.todoService.sort;

  isFilterOpen = signal(false);
  isSortOpen = signal(false);

  searchTerm = this.todoService.searchTerm;

  onSearch(event: Event) {

    const value = (event.target as HTMLInputElement).value;
    this.todoService.setSearchTerm(value);
  }

  setFilter(filter: TodoFilter) {
    this.todoService.setFilter(filter);
    this.closeFilter();
  }

  setSort(sort: SortOption) {
    this.todoService.setSort(sort);
    this.closeSort();
  }

  currentSortLabel = computed(() => {

    switch (this.currentSort()) {

      case 'Manual':
        return 'Manual'
      case 'Newest':
        return 'Newest';

      case 'Oldest':
        return 'Oldest';

      case 'NameAsc':
        return 'Name (A-Z)';

      case 'NameDesc':
        return 'Name (Z-A)';

      case 'PriorityHigh':
        return 'Highest Priority'

      case 'PriorityLow':
        return 'Lowest Priority'

      default:
        return 'Sort by';
    }

  });

  currentFilterLabel = computed(() => {
    switch (this.currentFilter()) {
      case 'All':
        return 'All Tasks';

      case 'Pending':
        return 'Pending';

      case 'Completed':
        return 'Completed';

      case 'High':
        return 'High Priority';

      case 'Medium':
        return 'Medium Priority';

      case 'Low':
        return 'Low Priority';
    }
  });

  toggleFilter() {
    this.isFilterOpen.update(value => !value);
    this.isSortOpen.set(false);
  }

  toggleSort() {
    this.isSortOpen.update(value => !value);
    this.isFilterOpen.set(false);
  }

  closeFilter() {
    this.isFilterOpen.set(false);
  }

  closeSort() {
    this.isSortOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.closeFilter();
      this.closeSort();
    }
  }

  clearSearch() {
    this.todoService.setSearchTerm('');
  }
}
