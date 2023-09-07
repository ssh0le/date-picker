import React, { FC, useMemo } from 'react';

import { mergeWithDefaultStyles } from '@/helpers';
import withPicker from '@/hocs/Pickers/withPicker';
import withCalendar from '@/hocs/withCalendar';
import withTodos from '@/hocs/withTodos';
import { PickerProps } from '@/interfaces/pickers';

import BaseCalendar from '../BaseCalendar';

import { DatePickerContainer } from './styled';

const Calendar: FC<PickerProps> = (props) => {
    const { minDate, maxDate, styles, weekStartDay, highlightWeekends, viewType, holidays } = props;

    const mergedStyles = useMemo(() => mergeWithDefaultStyles(styles), [styles]);

    const WithCalendar = useMemo(
        () =>
            withCalendar({
                Component: BaseCalendar,
                minDate,
                maxDate,
                styles: mergedStyles,
                weekStartDay,
                highlightWeekends,
                viewType,
                holidays,
            }),
        [minDate, maxDate, styles, weekStartDay, highlightWeekends, viewType, holidays],
    );

    const WithPicker = useMemo(
        () => withPicker({ Component: WithCalendar, styles: mergedStyles }),
        [WithCalendar],
    );

    const WithTodo = useMemo(
        () => withTodos({ Component: WithPicker, styles: mergedStyles }),
        [WithPicker],
    );

    return (
        <DatePickerContainer>
            <WithTodo />
        </DatePickerContainer>
    );
};

export default Calendar;
