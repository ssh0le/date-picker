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
        weekStartDay,
        highlightWeekends,
        highlightHolidays,
        holidays,
        viewType,
      }),
    [weekStartDay, highlightHolidays, highlightWeekends, viewType, holidays],
  );

  const WithRangePicker = withRangePicker({
    Component: WithCalendar,
  });

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <PickerContainer data-testid="date-picker">
          <WithRangePicker
            styles={mergedStyles}
            minDate={minDate && new Date(minDate)}
            maxDate={maxDate && new Date(maxDate)}
            initialDate={initialDate}
            onSelect={onSelect}
          />
        </PickerContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default memo(RangeDatePicker);
