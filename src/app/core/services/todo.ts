import { computed, effect, Service, signal } from '@angular/core';
import { TodoFilter } from '../types/todo-filter.type';
import { Todo } from '../../models/todo.model';
import { SortOption } from '../types/sort-option.type';
import { Priority } from '../types/priority.type';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Service()
export class TodoService {

    // 1. State (Signals)
    private readonly STORAGE_KEY = 'todos';

    readonly todos = signal<Todo[]>(this.loadTodos());

    readonly searchTerm = signal('');

    readonly filter = signal<TodoFilter>('All');

    readonly sort = signal<SortOption>('Manual');

    constructor() {

        effect(() => {

            localStorage.setItem(
                this.STORAGE_KEY,
                JSON.stringify(this.todos())
            )
        })
    }


    // 2. Computed (Derivations)
    readonly totalTodos = computed(() => this.todos().length);

    readonly completedTodos = computed(
        () => this.todos().filter((todo) => todo.status === 'Completed').length,
    );

    readonly pendingTodos = computed(
        () => this.todos().filter((todo) => todo.status === 'Pending').length,
    );

    readonly filteredTodos = computed(() => {
        let todos = [...this.todos()];
        const search = this.searchTerm().trim().toLowerCase();

        // Search
        if (search) {
            todos = todos.filter((todo) => todo.title.toLowerCase().includes(search));
        }

        // Filter

        switch (this.filter()) {

            case 'Pending':
                todos = todos.filter(todo => todo.status === 'Pending');
                break;

            case 'Completed':
                todos = todos.filter(todo => todo.status === 'Completed');
                break;

            case 'High':
                todos = todos.filter(todo => todo.priority === 'High');
                break;

            case 'Medium':
                todos = todos.filter(todo => todo.priority === 'Medium');
                break;

            case 'Low':
                todos = todos.filter(todo => todo.priority === 'Low');
                break;

            default:
                break;
        }

        const priorityOrder: Record<Priority, number> = {
            High: 3,
            Medium: 2,
            Low: 1,
        };

        // Sort
        switch (this.sort()) {
            case 'Manual':
                todos.sort((a, b) => a.order - b.order);
                break;

            case 'Newest':
                todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                break;

            case 'Oldest':
                todos.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
                break;

            case 'NameAsc':
                todos.sort((a, b) => a.title.localeCompare(b.title));
                break;

            case 'NameDesc':
                todos.sort((a, b) => b.title.localeCompare(a.title));
                break;

            case 'PriorityHigh':
                todos.sort(
                    (a, b) =>
                        priorityOrder[b.priority] -
                        priorityOrder[a.priority]
                );
                break;

            case 'PriorityLow':
                todos.sort(
                    (a, b) =>
                        priorityOrder[a.priority] -
                        priorityOrder[b.priority]
                );
                break;
        }

        return todos;
    });

    overdueCountTodos = computed(() =>
        this.todos().filter(todo => this.isOverdue(todo)).length
    );

    // 3. CRUD Operations
    addTodo(title: string, priority: Priority, dueDate: Date | null) {
        const todo: Todo = {
            id: Date.now(),
            title: title,
            status: 'Pending',
            priority,
            order: this.todos().length,
            dueDate,
            createdAt: new Date(),
        };

        this.todos.update((todos) => [...todos, todo]);
    }

    updateTodo(id: number, title: string, priority: Priority, dueDate: Date | null) {
        this.todos.update((todos) =>
            todos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        title,
                        priority,
                        dueDate,
                    }
                    : todo,
            ),
        );
    }

    deleteTodo(id: number) {
        this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    }

    toggleStatus(id: number) {
        this.todos.update((todos) =>
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, status: todo.status === 'Completed' ? 'Pending' : 'Completed' }
                    : todo,
            ),
        );
    }

    // 4. View State
    setSearchTerm(value: string) {
        this.searchTerm.set(value);
    }

    setFilter(filter: TodoFilter) {
        this.filter.set(filter);
    }

    setSort(sort: SortOption) {
        this.sort.set(sort);
    }

    // 5. Reordering
    reorderTodos(previousIndex: number, currentIndex: number) {
        this.todos.update(currentTodos => {
            const todos = [...currentTodos];

            moveItemInArray(
                todos,
                previousIndex,
                currentIndex
            )

            todos.forEach((todo, index) => {
                todo.order = index;
            })

            return todos;
        }
        )
    }


    // 6. Persistence
    private loadTodos(): Todo[] {

        const data = localStorage.getItem(this.STORAGE_KEY);

        if (!data) {
            return [
                {
                    id: 1,
                    title: 'Design new landing page',
                    status: 'Pending',
                    priority: 'High',
                    order: 0,
                    dueDate: null,
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    title: 'Review Pull Request',
                    status: 'Completed',
                    priority: 'High',
                    order: 1,
                    dueDate: null,
                    createdAt: new Date(),
                },
            ];
        }

        return JSON.parse(data).map((todo: Todo, index: number) => ({
            ...todo,
            priority: todo.priority ?? 'Medium',
            order: todo.order ?? index,
            dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
            createdAt: new Date(todo.createdAt),
        }))
    };

    //7 . Helpers
    isOverdue(todo: Todo) {
        if (!todo.dueDate || todo.status === 'Completed') {
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const due = new Date(todo.dueDate);
        due.setHours(0, 0, 0, 0);

        return due < today;
    }
}
