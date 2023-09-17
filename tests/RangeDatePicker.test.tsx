import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import RangeDatePicker from '@/components/RangeDatePicker';
import { getShortFormattedDate } from '@/helpers';

import '@testing-library/jest-dom';
import { testPicker } from './helpers/testPicker';

const initialDate = new Date(2023, 8, 10);
const datePickerId = 'date-picker';
const titleId = 'title';
const inputId = `input-To`;
const applyButtonId = `input-apply-To`;
const clearButtonId = `input-clear-To`;

describe('Range Date picker', () => {
  testPicker(RangeDatePicker, datePickerId);

  describe('Date input', () => {
    beforeEach(() => {
      render(<RangeDatePicker initialDate={initialDate} />);
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
});
