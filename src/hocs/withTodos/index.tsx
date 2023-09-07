import React, { ComponentProps, FC, useCallback, useEffect, useMemo, useState } from 'react';

import DayTodoList from '@/components/DayTodoList';
import { areEqualDates, getLongFormattedDate } from '@/helpers';
import { mergeObjects } from '@/helpers/mergeObjects';
import { WithTodosOmittedProps } from '@/interfaces/decorators';
import { Todo } from '@/interfaces/todos';

import { WithTodoProps } from './interfaces';

const storageKey = 'todos';

const withTodos = (props: WithTodoProps) => {
    const { Component, styles } = props;
    const withCalendarComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof WithTodosOmittedProps>
    > = (nextProps) => {
        const [selectedDay, setSelectedDay] = useState<Date | null>(null);
        const [todos, setTodos] = useState<Todo[]>(() => {
            return JSON.parse(localStorage.getItem(storageKey) ?? '[]').map((todo: Todo) => ({
                ...todo,
                date: new Date(todo.date),
            }));
        });

        useEffect(() => {
            localStorage.setItem(storageKey, JSON.stringify(todos));
        }, [todos]);

        const filteredTodos = useMemo(() => {
            return todos.filter(({ date }) => areEqualDates(selectedDay, date));
        }, [todos, selectedDay]);

        const handleDayClick = useCallback((day: Date) => {
            setSelectedDay((prevSelectedDay) => (areEqualDates(day, prevSelectedDay) ? null : day));
        }, []);

        const defineComponentStyle = (day: Date) => {
            const style = {};
            const { withTodoDay } = styles;
            if (todos.find(({ date }) => areEqualDates(date, day))) {
                mergeObjects(style, withTodoDay);
            }
            return style;
        };

        const handleAddTodo = (todo: string) => {
            setTodos((prevTodos) => [
                ...prevTodos,
                {
                    id: Date.now(),
                    name: todo,
                    date: selectedDay!,
                },
            ]);
        };

        const handleDeleteTodo = (todoId: number) => {
            setTodos((prevTodos) => prevTodos.filter(({ id }) => todoId !== id));
        };

        return (
            <>
                <Component
                    {...nextProps}
                    onDayClick={handleDayClick}
                    defineStyle={defineComponentStyle}
                />
                {!!selectedDay && (
                    <DayTodoList
                        items={filteredTodos}
                        header={getLongFormattedDate(selectedDay)}
                        onDelete={handleDeleteTodo}
                        onAdd={handleAddTodo}
                    />
                )}
            </>
        );
    };

    return withCalendarComponent;
};

export default withTodos;
