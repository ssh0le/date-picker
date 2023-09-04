import React, { FC, useCallback, useMemo, useState } from 'react';

import { areEqualDates } from '@/helpers';
import withCalendar from '@/hocs/withCalendar';

import BaseCalendar from '../BaseCalendar';
import DateInput from '../DateInput';

import { CalendarProps } from './interfaces';
import { DatePickerContainer } from './styled';

const Calendar: FC<CalendarProps> = (props) => {
    const { minDate, maxDate, styles, weekStartDay, highlightWeekends } = props;
    const [selectedDay, setSelectedDay] = useState<null | Date>(null);

    const handleDateSubmit = useCallback((day: Date) => {
        setSelectedDay((prevDate) => areEqualDates(prevDate, day) ? prevDate : day);
    }, []);

    const isSelected = (day: Date) => {
        if (!selectedDay) return false;
        return selectedDay.getMonth() === day.getMonth() && selectedDay.getDate() === day.getDate();
    };

    const handleClearClick = () => {
        setSelectedDay(null);
    }

    const WithCalendar = useMemo(
        () =>
            withCalendar({
                Component: BaseCalendar,
                minDate,
                maxDate,
                styles,
                weekStartDay,
                highlightWeekends,
            }),
        [minDate, maxDate, styles, weekStartDay, highlightWeekends],
    );
    return (
        <DatePickerContainer>
            <DateInput label="Date" onSubmit={handleDateSubmit} />
            <WithCalendar
                isSelectionHead={isSelected}
                isSelectionTail={isSelected}
                initialDate={selectedDay}
                onClearClick={handleClearClick}
                hasSelection={Boolean(selectedDay)}
            />
        </DatePickerContainer>
    );
};

export default Calendar;
