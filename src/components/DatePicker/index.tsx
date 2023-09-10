import React, { FC, useMemo } from 'react';

import { mergeWithDefaultStyles } from '@/helpers';
import withPicker from '@/hocs/Pickers/withPicker';
import withCalendar from '@/hocs/withCalendar';
import withTodos from '@/hocs/withTodos';
import { PickerProps } from '@/interfaces/pickers';

import BaseCalendar from '../BaseCalendar';
import ErrorBoundary from '../ErrorBoundary';

import { DatePickerContainer } from './styled';

const DatePicker: FC<PickerProps> = (props) => {
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
    const WithPicker = useMemo(() => withPicker({ Component: WithCalendar }), [WithCalendar]);

    const WithTodo = useMemo(() => withTodos({ Component: WithPicker }), [WithPicker]);

    return (
        <ErrorBoundary>
            <DatePickerContainer data-testid="date-picker">
                <WithTodo styles={mergedStyles} initialDate={initialDate} />
            </DatePickerContainer>
        </ErrorBoundary>
    );
};

export default DatePicker;
