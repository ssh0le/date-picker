import React, { FC, memo, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { mergeWithDefaultStyles } from '@/helpers';
import withPicker from '@/hocs/Pickers/withPicker';
import withCalendar from '@/hocs/withCalendar';
import withTodos from '@/hocs/withTodos';
import { theme } from '@/styles/theme';

import BaseCalendar from '../BaseCalendar';
import ErrorBoundary from '../ErrorBoundary';
import { PickerContainer } from '../shared/PickerContainer';

import { DatePickerProps } from './interfaces';

const DatePicker: FC<DatePickerProps> = (props) => {
  const {
    minDate,
    maxDate,
    styles,
    weekStartDay,
    highlightWeekends,
    viewType,
    initialDate,
    holidays,
    highlightHolidays,
    withTodo = false,
    onSelect,
  } = props;

  const mergedStyles = useMemo(() => mergeWithDefaultStyles(styles), [styles]);

  const Calendar = useMemo(
    () =>
      withCalendar({
        Component: BaseCalendar,
        weekStartDay,
        highlightWeekends,
        highlightHolidays,
        viewType,
        holidays,
      }),
    [weekStartDay, highlightWeekends, viewType, holidays, highlightHolidays],
  );
  const CalendarWithPicker = useMemo(
    () => withPicker({ Component: Calendar }),
    [Calendar],
  );

  const CalendarWithPickerAndTodo = useMemo(
    () =>
      withTodo
        ? withTodos({ Component: CalendarWithPicker })
        : CalendarWithPicker,
    [CalendarWithPicker, withTodo],
  );

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <PickerContainer data-testid="date-picker">
          <CalendarWithPickerAndTodo
            minDate={minDate && new Date(minDate)}
            maxDate={maxDate && new Date(maxDate)}
            styles={mergedStyles}
            initialDate={initialDate}
            onSelect={onSelect}
          />
        </PickerContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default memo(DatePicker);
