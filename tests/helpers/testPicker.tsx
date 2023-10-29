import { fireEvent, render, screen } from '@testing-library/react';
import React, { FC } from 'react';

import { addMonthsToDate, getCalendar, getShortFormattedDate } from '@/helpers';
import { CalendarViewType, WeekStartDay } from '@/types/calendar';
import { PickerProps } from '@/types/pickers';

import '@testing-library/jest-dom';
import { randomClick } from './randomClick';

const initialDate = new Date(2023, 8, 10);
const daysGridId = 'days-grid';
const monthGridId = 'month-grid';
const titleId = 'title';
const prevId = 'prev';
const nextId = 'next';
const headerId = 'header';
const wrongMessageId = 'wrong-dates';

export const testPicker = (
  Picker: FC<PickerProps & { onSelect?: (...args: (Date | null)[]) => void }>,
  pickerId: string,
) => {
  it('should render without props', () => {
    render(<Picker />);
    const datePicker = screen.getByTestId(pickerId);
    const grid = screen.getByTestId(daysGridId);
    expect(datePicker).toBeInTheDocument();
    expect(grid).toBeInTheDocument();
  });

  it('should render with initialDate', () => {
    const expectedTitle = getShortFormattedDate(initialDate);
    render(<Picker initialDate={initialDate} />);
    const title = screen.getByTestId(titleId);
    expect(title.innerHTML).toBe(expectedTitle);
  });

  it('should navigate between dates', () => {
    render(<Picker initialDate={initialDate} />);
    const initialTitle = getShortFormattedDate(initialDate);
    const expectedPrevTitle = getShortFormattedDate(
      addMonthsToDate(initialDate, -1),
    );
    const title = screen.getByTestId(titleId);
    const prevButton = screen.getByTestId(prevId);
    const nextButton = screen.getByTestId(nextId);
    fireEvent.click(prevButton);
    expect(title.innerHTML).toBe(expectedPrevTitle);
    fireEvent.click(nextButton);
    expect(title.innerHTML).toBe(initialTitle);
  });

  describe('Week start day', () => {
    it('should start from Monday', () => {
      render(<Picker initialDate={initialDate} />);
      const header = screen.getByTestId(headerId);
      expect(header.children[0].innerHTML).toBe('Mo');
    });
    it('should start from Sunday', () => {
      render(
        <Picker initialDate={initialDate} weekStartDay={WeekStartDay.Sunday} />,
      );
      const header = screen.getByTestId(headerId);
      expect(header.children[0].innerHTML).toBe('Su');
    });
  });

  const testViewType = (
    viewType: CalendarViewType,
    childrenContainerId: string,
  ) => {
    render(<Picker initialDate={initialDate} viewType={viewType} />);
    const daysGrid = screen.getByTestId(childrenContainerId);
    const calendar = getCalendar(initialDate, WeekStartDay.Monday, viewType);
    expect(daysGrid.children.length === calendar.length).toBeTruthy();
  };

  describe('Calendar View Type', () => {
    it('should be displayed by month', () => {
      testViewType(CalendarViewType.Month, daysGridId);
    });
    it('should be displayed by week', () => {
      testViewType(CalendarViewType.Week, daysGridId);
    });
    it('should be displayed by year', () => {
      testViewType(CalendarViewType.Year, monthGridId);
    });
  });

  describe('Date range', () => {
    it("shouln't display nav arrows", () => {
      render(
        <Picker
          initialDate={initialDate}
          minDate={initialDate}
          maxDate={initialDate}
        />,
      );
      expect(screen.queryByTestId(nextId)).not.toBeInTheDocument();
      expect(screen.queryByTestId(prevId)).not.toBeInTheDocument();
    });
    it('should display message on wrong min and max dates', () => {
      render(
        <Picker
          initialDate={initialDate}
          minDate={addMonthsToDate(initialDate, 1)}
          maxDate={addMonthsToDate(initialDate, -1)}
        />,
      );
      expect(screen.queryByTestId(wrongMessageId)).toBeInTheDocument();
    });
  });

  describe('Select Event', () => {
    it('should be invoked', () => {
      const selectHandler = jest.fn();
      render(
        <Picker
          onSelect={selectHandler}
          initialDate={initialDate}
          viewType={CalendarViewType.Week}
        />,
      );
      randomClick(daysGridId);
      expect(selectHandler).toBeCalled();
    });
  });
};
