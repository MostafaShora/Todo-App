import { Category } from "../core/types/category.type";
import { Priority } from "../core/types/priority.type";

export type TodoStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  priority: Priority;
  order: number;
  category: Category;
  dueDate: Date | null;
  createdAt: Date;
}