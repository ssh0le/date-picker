import React, { FC,  useMemo } from 'react';

import withPicker from '@/hocs/Pickers/withPicker';
import withCalendar from '@/hocs/withCalendar';
import { PickerProps } from '@/interfaces/pickers';

import BaseCalendar from '../BaseCalendar';

import { DatePickerContainer } from './styled';

const Calendar: FC<PickerProps> = (props) => {
    const { minDate, maxDate, styles, weekStartDay, highlightWeekends, viewType, holidays } = props;

    const WithCalendar = useMemo(
        () =>
            withCalendar({
                Component: BaseCalendar,
                minDate,
                maxDate,
                styles,
                weekStartDay,
                highlightWeekends,
                viewType,
                holidays,
            }),
        [minDate, maxDate, styles, weekStartDay, highlightWeekends, viewType, holidays],
    );

    const WithPicker = useMemo(() => withPicker({ Component: WithCalendar }), [WithCalendar]);

    return (
        <DatePickerContainer>
            <WithPicker />
        </DatePickerContainer>
    );
};

export default Calendar;
