import React, { ComponentProps, FC, useCallback, useEffect, useState } from 'react';

import DateInput from '@/components/DateInput';
import { areEqualDates } from '@/helpers';
import { mergeObjects } from '@/helpers/mergeObjects';
import { WithPickerOmittedProps } from '@/interfaces/decorators';

import { WithPickerProps } from '../interfaces';

const withPicker = (props: WithPickerProps) => {
    const { Component } = props;
    const withCalendarComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof WithPickerOmittedProps> & {
            onSelect?: (day: Date | null) => void;
            onDayClick?: (day: Date) => void;
            onClearClick?: () => void;
        }
    > = (nextProps) => {
        const { defineStyle, styles, initialDate, onSelect, onDayClick, onClearClick } = nextProps;
        const [selectedDay, setSelectedDay] = useState<null | Date>(initialDate ?? null);
        const [inputDate, setInputDate] = useState<string>('');

        useEffect(() => {
            if (initialDate) {
                setSelectedDay(new Date(initialDate));
            }
        }, [initialDate]);

        const handleInputChange = (input: string) => setInputDate(input);

        const handleDateSelect = useCallback(
            (day: Date | null) => {
                if (onSelect) {
                    onSelect(day);
                }
            },
            [onSelect],
        );

        const handleDateSubmit = useCallback(
            (day: Date) => {
                setSelectedDay((prevDate) => (areEqualDates(prevDate, day) ? null : day));
                handleDateSelect(day);
            },
            [handleDateSelect],
        );

        const handleDayClick = useCallback(
            (day: Date) => {
                handleDateSubmit(day);
                if (onDayClick) {
                    onDayClick(day);
                }
            },
            [onDayClick],
        );

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
            handleDateSelect(null);
            setInputDate('');
            if (onClearClick) {
                onClearClick();
            }
        }, [handleDateSelect]);

        return (
            <>
                <DateInput
                    label="Date"
                    onSubmit={handleDateSubmit}
                    value={inputDate}
                    onChange={handleInputChange}
                />
                <Component
                    {...nextProps}
                    onDayClick={handleDayClick}
                    initialDate={selectedDay}
                    defineStyle={defineComponentStyle}
                    onClearClick={handleClearClick}
                    hasSelection={Boolean(selectedDay) || !!inputDate.length}
                />
            </>
        );
    };

    return withCalendarComponent;
};

export default withPicker;
