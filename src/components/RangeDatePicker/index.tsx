import React, { FC, useMemo } from 'react';

import { mergeWithDefaultStyles } from '@/helpers';
import withRangePicker from '@/hocs/Pickers/withRangePicker';
import withCalendar from '@/hocs/withCalendar';
import { PickerProps } from '@/interfaces/pickers';

import BaseCalendar from '../BaseCalendar';
import ErrorBoundary from '../ErrorBoundary';

import { RangeDatePickerContainer } from './styled';

const RangeDatePicker: FC<
    PickerProps & { onSelect?: (from: Date | null, to: Date | null) => void }
> = (props) => {
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
        onSelect
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
        [minDate, maxDate, styles, weekStartDay, highlightHolidays, highlightWeekends, viewType, holidays],
    );

    const WithRangePicker = withRangePicker({
        Component: WithCalendar,
    });

    return (
        <ErrorBoundary>
            <RangeDatePickerContainer data-testid="date-picker">
                <WithRangePicker styles={mergedStyles} initialDate={initialDate} onSelect={onSelect}/>
            </RangeDatePickerContainer>
        </ErrorBoundary>
    );
};

export default RangeDatePicker;
