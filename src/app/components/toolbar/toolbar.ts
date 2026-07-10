import { Component, computed, inject } from '@angular/core';
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

  currentFilter = this.todoService.filter;
  currentSort = this.todoService.sort;

  onSearch(event: Event) {

    const value = (event.target as HTMLInputElement).value;
    console.log(value);

    this.todoService.setSearchTerm(value);

  }

  setFilter(filter: TodoFilter) {
    this.todoService.setFilter(filter);
  }

  setSort(sort: SortOption) {
    this.todoService.setSort(sort);
  }

  currentSortLabel = computed(() => {

    switch (this.currentSort()) {

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
}
