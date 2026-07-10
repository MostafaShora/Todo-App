import { computed, effect, Service, signal } from '@angular/core';
import { TodoFilter } from '../types/todo-filter.type';
import { Todo } from '../../models/todo.model';
import { SortOption } from '../types/sort-option.type';

@Service()
export class TodoService {

    constructor() {

        effect(() => {

            localStorage.setItem(
                this.STORAGE_KEY,
                JSON.stringify(this.todos())
            )
        })
    }
    // 1. State (Signals)
    private readonly STORAGE_KEY = 'todos';

    readonly todos = signal<Todo[]>(this.loadTodos());

    readonly searchTerm = signal('');

    readonly filter = signal<TodoFilter>('All');

    readonly sort = signal<SortOption>('Newest');


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
                todos = todos.filter((todo) => todo.status === 'Pending');
                break;

            case 'Completed':
                todos = todos.filter((todo) => todo.status === 'Completed');
                break;

            default:
                break;
        }

        // Sort
        switch (this.sort()) {
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
        }

        return todos;
    });

    private loadTodos(): Todo[] {

        const data = localStorage.getItem(this.STORAGE_KEY);

        if (!data) {
            return [
                {
                    id: 1,
                    title: 'Design new landing page',
                    status: 'Pending',
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    title: 'Review Pull Request',
                    status: 'Completed',
                    createdAt: new Date(),
                },
            ];
        }

        return JSON.parse(data).map((todo: Todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
        }))
    };

    // 3. CRUD Operations
    addTodo(title: string) {
        const todo: Todo = {
            id: Date.now(),
            title: title,
            status: 'Pending',
            createdAt: new Date(),
        };

        this.todos.update((todos) => [...todos, todo]);
    }

    updateTodo(id: number, title: string) {
        this.todos.update((todos) =>
            todos.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        title,
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

    // 4. UI State Actions
    setSearchTerm(value: string) {
        this.searchTerm.set(value);
    }

    setFilter(filter: TodoFilter) {
        this.filter.set(filter);
    }

    setSort(sort: SortOption) {
        this.sort.set(sort);
    }
}
