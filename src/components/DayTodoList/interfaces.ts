import { TodoTask } from '@/types/todos';

export interface TodoListProps {
  items: TodoTask[];
  header: string;
  onDelete: (id: number) => void;
  onAdd: (todo: string) => void;
}
