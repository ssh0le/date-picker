import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DatePicker from '@/components/DatePicker';
import { getShortFormattedDate } from '@/helpers';
import { CalendarViewType } from '@/index';

import '@testing-library/jest-dom';
import { randomClick } from './helpers/randomClick';
import { testPicker } from './helpers/testPicker';

const initialDate = new Date(2023, 8, 10);
const datePickerId = 'date-picker';
const daysGridId = 'days-grid';
const titleId = 'title';
const inputId = 'input-Date';
const applyButtonId = 'input-apply-Date';
const clearButtonId = 'input-clear-Date';
const todoInputId = 'todo-input';
const todoAddButtonId = 'todo-add';
const getTodoId = (todoTitle: string) => `todo-${todoTitle}`;
const getDeleteButtonId = (todo: string) => `delete-todo-${todo}`;
const noTodoId = 'no-todo';

describe('Date picker', () => {
  testPicker(DatePicker, datePickerId);

  describe('Date input', () => {
    beforeEach(() => {
      render(<DatePicker initialDate={initialDate} />);
    });
    it('clears on clear click', async () => {
      const dateInput = screen.getByTestId(inputId);
      const testInput = '09/03/2023';
      const expectedResult = '';
      await userEvent.type(dateInput, testInput);
      fireEvent.click(screen.getByTestId(clearButtonId));
      expect(dateInput).toHaveValue(expectedResult);
    });
    it('filters input chars', async () => {
      const dateInput = screen.getByTestId(inputId);
      const testInput = 'abc12,./\\';
      const expectedResult = '12./\\';
      await userEvent.type(dateInput, testInput);
      expect(dateInput).toHaveValue(expectedResult);
    });
    it('submits only correct date format', async () => {
      const dateInput = screen.getByTestId(inputId);
      const title = screen.getByTestId(titleId);
      const initialTitle = title.innerHTML;
      const input = '1/1/2023';
      await userEvent.type(dateInput, input);
      const applyButton = screen.getByTestId(applyButtonId);
      fireEvent.click(applyButton);
      expect(title.innerHTML).not.toBe(initialTitle);
      expect(title.innerHTML).toBe(getShortFormattedDate(new Date(input)));
    });
    it('rejects incorrect date format', async () => {
      const dateInput = screen.getByTestId(inputId);
      const title = screen.getByTestId(titleId);
      const initialTitle = title.innerHTML;
      const input = '99/99/9999';
      await userEvent.type(dateInput, input);
      const applyButton = screen.getByTestId(applyButtonId);
      fireEvent.click(applyButton);
      expect(title.innerHTML).toBe(initialTitle);
    });
  });

  describe('Todo', () => {
    beforeEach(() => {
      const storage: { [key: string]: string } = {};
      jest
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementation((key) => storage[key] ?? null);
      jest
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation((key, value) => (storage[key] = value));
      render(
        <DatePicker
          initialDate={initialDate}
          withTodo
          viewType={CalendarViewType.Week}
        />,
      );
    });
    it('displays todo list widget', () => {
      randomClick(daysGridId);
      expect(screen.getByTestId(todoAddButtonId)).toBeInTheDocument();
      expect(screen.getByTestId(noTodoId)).toBeInTheDocument();
    });
    const addTodo = async (todo: string) => {
      await userEvent.type(screen.getByTestId(todoInputId), todo);
      fireEvent.click(screen.getByTestId(todoAddButtonId));
    };
    it('adds todos', async () => {
      randomClick(daysGridId);
      const newTodo = 'Test add todo';
      await addTodo(newTodo);
      expect(screen.getByTestId(getTodoId(newTodo))).toBeInTheDocument();
    });

    it('delets todos', async () => {
      randomClick(daysGridId);
      const newTodo = 'Test delete todo';
      await addTodo(newTodo);
      fireEvent.click(screen.getByTestId(getDeleteButtonId(newTodo)));
      expect(screen.getByTestId(noTodoId)).toBeInTheDocument();
    });
  });
});
