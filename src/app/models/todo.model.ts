import { Priority } from "../core/types/priority.type";

export type TodoStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  priority: Priority;
  order: number;
  dueDate: Date | null;
  createdAt: Date;
}