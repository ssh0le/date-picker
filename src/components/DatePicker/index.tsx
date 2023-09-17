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

  const WithCalendar = useMemo(
    () =>
      withCalendar({
        Component: BaseCalendar,
        minDate,
        maxDate,
        weekStartDay,
        highlightWeekends,
        highlightHolidays,
        viewType,
        holidays,
      }),
    [
      minDate,
      maxDate,
      styles,
      weekStartDay,
      highlightWeekends,
      viewType,
      holidays,
      highlightHolidays,
    ],
  );
  const WithPicker = useMemo(
    () => withPicker({ Component: WithCalendar }),
    [WithCalendar],
  );

  const WithTodo = useMemo(
    () => (withTodo ? withTodos({ Component: WithPicker }) : WithPicker),
    [WithPicker, withTodo],
  );

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <PickerContainer data-testid="date-picker">
          <WithTodo
            styles={mergedStyles}
            initialDate={initialDate}
            onSelect={onSelect}
          />
        </PickerContainer>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default memo(DatePicker);
