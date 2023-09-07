import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { inputIcons } from '@/constants';

import { TodoListProps } from './interfaces';
import {
    AddButton,
    DayTodoListWrapper,
    Icon,
    InputContainer,
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
            {header}
            <InputContainer>
                <TodoInput value={todo} onChange={handleTodoChange} />
                <AddButton onClick={handleAddClick}>Add</AddButton>
            </InputContainer>
            <TodoListContainer>
                {Boolean(items.length) &&
                    items.map(({ name, id }) => (
                        <TodoContainer key={id}>
                            <TodoTitle>{name}</TodoTitle>
                            <Icon
                                src={deleteIcon}
                                alt="Delete todo"
                                onClick={createDeleteHandler(id)}
                            />
                        </TodoContainer>
                    ))}
                {!items.length && <NoTaskContainer>No todos</NoTaskContainer>}
            </TodoListContainer>
        </DayTodoListWrapper>
    );
};

export default memo(TodoList);
