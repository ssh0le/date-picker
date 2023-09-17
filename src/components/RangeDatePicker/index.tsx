import React, { FC, memo, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

import { mergeWithDefaultStyles } from '@/helpers';
import withRangePicker from '@/hocs/Pickers/withRangePicker';
import withCalendar from '@/hocs/withCalendar';
import { theme } from '@/styles/theme';

import BaseCalendar from '../BaseCalendar';
import ErrorBoundary from '../ErrorBoundary';
import { PickerContainer } from '../shared/PickerContainer';

import { RangeDatePickerProps } from './interfaces';

const RangeDatePicker: FC<RangeDatePickerProps> = (props) => {
  const {
    minDate,
    maxDate,
    styles,
    weekStartDay,
    highlightWeekends,
    highlightHolidays,
    holidays,
    viewType,
    initialDate,
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
        holidays,
        viewType,
      }),
    [
      minDate,
      maxDate,
      styles,
      weekStartDay,
      highlightHolidays,
      highlightWeekends,
      viewType,
      holidays,
    ],
  );

  const WithRangePicker = withRangePicker({
    Component: WithCalendar,
  });

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <PickerContainer data-testid="date-picker">
          <WithRangePicker
            styles={mergedStyles}
            initialDate={initialDate}
            onSelect={onSelect}
          />
        </PickerContainer>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default memo(RangeDatePicker);
