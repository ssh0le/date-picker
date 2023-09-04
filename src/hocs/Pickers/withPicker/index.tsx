import React, { ComponentProps, FC, useCallback, useState } from 'react';

import DateInput from '@/components/DateInput';
import { areEqualDates } from '@/helpers';
import { WithPickerOmittedProps } from '@/interfaces/decorators';

import { WithPickerProps } from '../interfaces';

const withPicker = (props: WithPickerProps) => {
    const { Component } = props;
    console.log('with picker');
    const withCalendarComponent: FC<Omit<ComponentProps<typeof Component>, keyof WithPickerOmittedProps>> = (
        nextProps,
    ) => {
        const [selectedDay, setSelectedDay] = useState<null | Date>(null);
        const handleDateSubmit = useCallback((day: Date) => {
            setSelectedDay((prevDate) => (areEqualDates(prevDate, day) ? prevDate : day));
        }, []);

        const isSelected = (day: Date) => {
            if (!selectedDay) return false;
            return (
                selectedDay.getMonth() === day.getMonth() && selectedDay.getDate() === day.getDate()
            );
        };

        const handleClearClick = useCallback(() => {
            setSelectedDay(null);
        }, []);

        return (
            <>
                <DateInput label="Date" onSubmit={handleDateSubmit} />
                <Component
                    {...nextProps}
                    initialDate={selectedDay}
                    onClearClick={handleClearClick}
                    isSelectionHead={isSelected}
                    isSelectionTail={isSelected}
                    hasSelection={Boolean(selectedDay)}
                />
            </>
        );
    };

    return withCalendarComponent;
};

export default withPicker;
