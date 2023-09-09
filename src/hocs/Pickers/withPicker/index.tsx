import React, { ComponentProps, FC, useCallback, useState } from 'react';

import DateInput from '@/components/DateInput';
import { areEqualDates } from '@/helpers';
import { mergeObjects } from '@/helpers/mergeObjects';
import { WithPickerOmittedProps } from '@/interfaces/decorators';

import { WithPickerProps } from '../interfaces';

const withPicker = (props: WithPickerProps) => {
    const { Component } = props;
    const withCalendarComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof WithPickerOmittedProps>
    > = (nextProps) => {
        const { defineStyle, styles } = nextProps;
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

        const defineComponentStyle = (day: Date) => {
            const style = {};
            if (defineStyle) {
                mergeObjects(style, defineStyle(day));
            }
            if (styles) {
                const { selectionHeadDay, selectionTailDay } = styles;
                if (isSelected(day)) {
                    mergeObjects(style, selectionHeadDay);
                    mergeObjects(style, selectionTailDay);
                }
            }
            return style;
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
                    defineStyle={defineComponentStyle}
                    onClearClick={handleClearClick}
                    hasSelection={Boolean(selectedDay)}
                />
            </>
        );
    };

    return withCalendarComponent;
};

export default withPicker;
