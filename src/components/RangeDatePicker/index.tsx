import React, { FC, useMemo } from 'react';

import withRangePicker from '@/hocs/Pickers/withRangePicker';
import withCalendar from '@/hocs/withCalendar';
import { PickerProps } from '@/interfaces/pickers';

import BaseCalendar from '../BaseCalendar';

import { RangeDatePickerContainer } from './styled';

const Calendar: FC<PickerProps> = (props) => {
    const { minDate, maxDate, styles, weekStartDay, highlightWeekends, holidays, viewType } = props;

    const WithCalendar = useMemo(
        () =>
            withCalendar({
                Component: BaseCalendar,
                minDate,
                maxDate,
                styles,
                weekStartDay,
                highlightWeekends,
                holidays,
                viewType
            }),
        [minDate, maxDate, styles, weekStartDay, highlightWeekends],
    );

    const WithRangePicker = useMemo(() => withRangePicker({ Component: WithCalendar }), []);

    return (
        <RangeDatePickerContainer>
            <WithRangePicker />
        </RangeDatePickerContainer>
    );
};

export default Calendar;
