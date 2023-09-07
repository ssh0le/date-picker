import { Todo } from "@/interfaces/todos";

export interface TodoListProps {
    items: Todo[];
    header: string,
    onDelete: (id: number) => void;
    onAdd: (todo: string) => void;
}