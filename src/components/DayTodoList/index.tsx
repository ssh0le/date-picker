import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { inputIcons } from '@/constants';

import { TodoListProps } from './interfaces';
import {
    AddButton,
    DayTodoListWrapper,
    Icon,
    InputContainer,
    ListHeader,
    NoTaskContainer,
    TodoContainer,
    TodoInput,
    TodoListContainer,
    TodoTitle,
} from './styled';

const { clear: deleteIcon } = inputIcons;

const TodoList: FC<TodoListProps> = ({ items, onDelete, onAdd, header }) => {
    const [todo, setTodo] = useState<string>('');

    const handleTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodo(event.target.value);
    };

    const createDeleteHandler = useCallback((id: number) => () => onDelete(id), []);

    const handleAddClick = () => {
        if (todo.trim().length) {
            onAdd(todo);
            setTodo('');
        }
    };

    return (
        <DayTodoListWrapper>
            <ListHeader>{header}</ListHeader>
            <InputContainer>
                <TodoInput data-testid='todo-input' value={todo} onChange={handleTodoChange} />
                <AddButton data-testid='todo-add' onClick={handleAddClick}>Add</AddButton>
            </InputContainer>
            <TodoListContainer>
                {Boolean(items.length) &&
                    items.map(({ name, id }) => (
                        <TodoContainer key={id}>
                            <TodoTitle data-testid={`todo-${name}`}>{name}</TodoTitle>
                            <Icon
                                src={deleteIcon}
                                data-testid={`delete-todo-${name}`}
                                alt="Delete todo"
                                onClick={createDeleteHandler(id)}
                            />
                        </TodoContainer>
                    ))}
                {!items.length && <NoTaskContainer data-testid='no-todo'>No todos</NoTaskContainer>}
            </TodoListContainer>
        </DayTodoListWrapper>
    );
};

export default memo(TodoList);
