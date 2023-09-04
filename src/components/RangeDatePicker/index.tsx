import React, { FC, useCallback, useMemo, useState } from 'react';

import withCalendar from '@/hocs/withCalendar';

import BaseCalendar from '../BaseCalendar';
import DateInput from '../DateInput';

import { RangeDatePickerProps } from './interfaces';
import { RangeDatePickerContainer } from './styled';

const Calendar: FC<RangeDatePickerProps> = (props) => {
    const {
        minDate,
        maxDate,
        styles,
        weekStartDay,
        highlightWeekends,
    } = props;
    const [selectedFrom, setSelectedFrom] = useState<null | Date>(null);
    const [selectedTo, setSelectedTo] = useState<null | Date>(null);

    const handleFromDateSubmit = (day: Date) => {
        setSelectedFrom(day);
    };

    const handleToDateSubmit = useCallback((day: Date) => {
        setSelectedTo(day);
    }, []);

    const handleClearClick = () => {
        setSelectedTo(null);
        setSelectedFrom(null);
    };

    const isHead = (day: Date) => {
        if (!selectedFrom) return false;
        return (
            selectedFrom.getMonth() === day.getMonth() && selectedFrom.getDate() === day.getDate()
        );
    };

    const isTail = (day: Date) => {
        if (!selectedTo) return false;
        return selectedTo.getMonth() === day.getMonth() && selectedTo.getDate() === day.getDate();
    };

    const isSelected = (day: Date) => {
        if (!selectedFrom || !selectedTo) return false;
        return day < selectedTo && day > selectedFrom;
    };

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
        <RangeDatePickerContainer>
            <DateInput label="From" onSubmit={handleFromDateSubmit} />
            <DateInput label="To" onSubmit={handleToDateSubmit} />
            <WithCalendar
                isSelected={isSelected}
                isSelectionHead={isHead}
                isSelectionTail={isTail}
                initialDate={selectedTo}
                hasSelection={Boolean(selectedTo) && Boolean(selectedFrom)}
                onClearClick={handleClearClick}
            />
        </RangeDatePickerContainer>
    );
};

export default Calendar;
