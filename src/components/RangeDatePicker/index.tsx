import React, { FC, useMemo } from 'react';

import { mergeWithDefaultStyles } from '@/helpers';
import withRangePicker from '@/hocs/Pickers/withRangePicker';
import withCalendar from '@/hocs/withCalendar';

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
      <PickerContainer data-testid="date-picker">
        <WithRangePicker
          styles={mergedStyles}
          initialDate={initialDate}
          onSelect={onSelect}
        />
      </PickerContainer>
    </ErrorBoundary>
  );
};

export default RangeDatePicker;
