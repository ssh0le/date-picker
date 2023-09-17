import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { FC } from 'react';

import { getShortFormattedDate } from '@/helpers';
import { PickerProps } from '@/types/pickers';

export const testInput = (
  Picker: FC<PickerProps>,
  initialDate: Date,
  inputId: string,
  titleId: string,
  clearButtonId: string,
  applyButtonId: string,
) => {
  beforeEach(() => {
    render(<Picker initialDate={initialDate} />);
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
};
