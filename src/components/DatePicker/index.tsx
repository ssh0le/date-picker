import React, { FC, useMemo } from 'react';

import { mergeWithDefaultStyles } from '@/helpers';
import withPicker from '@/hocs/Pickers/withPicker';
import withCalendar from '@/hocs/withCalendar';
import withTodos from '@/hocs/withTodos';
import { PickerProps } from '@/interfaces/pickers';

import BaseCalendar from '../BaseCalendar';

import { DatePickerContainer } from './styled';

const DatePicker: FC<PickerProps> = (props) => {
    const { minDate, maxDate, styles, weekStartDay, highlightWeekends, viewType, holidays } = props;

    const mergedStyles = useMemo(() => mergeWithDefaultStyles(styles), [styles]);

    const WithCalendar = useMemo(
        () =>
            withCalendar({
                Component: BaseCalendar,
                minDate,
                maxDate,
                weekStartDay,
                highlightWeekends,
                viewType,
                holidays,
            }),
        [minDate, maxDate, styles, weekStartDay, highlightWeekends, viewType, holidays],
    );
    const WithPicker = useMemo(() => withPicker({ Component: WithCalendar }), [WithCalendar]);

    const WithTodo = useMemo(() => withTodos({ Component: WithPicker }), [WithPicker]);

    return (
        <DatePickerContainer>
            <WithTodo styles={mergedStyles} />
            <WithCalendar
                onClearClick={function (): void {
                    throw new Error('Function not implemented.');
                }}
                hasSelection={false}
                styles={mergedStyles}
            />
            <WithPicker styles={mergedStyles} />
        </DatePickerContainer>
    );
};

export default DatePicker;
