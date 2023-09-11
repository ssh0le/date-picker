import React, { ComponentProps, FC, useCallback, useState } from 'react';

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
        }
    > = (nextProps) => {
        const { defineStyle, styles, initialDate, onSelect, onDayClick } = nextProps;
        const [selectedDay, setSelectedDay] = useState<null | Date>(initialDate ?? null);

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
                setSelectedDay((prevDate) => {
                    if (areEqualDates(prevDate, day)) {
                        return null;
                    } else {
                        handleDateSelect(day);
                        return day;
                    }
                });
            },
            [handleDateSelect],
        );

        const handleDayClick = useCallback(
            (day: Date) => {
                handleDateSubmit(day)
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
        }, [handleDateSelect]);

        return (
            <>
                <DateInput label="Date" onSubmit={handleDateSubmit} />
                <Component
                    {...nextProps}
                    onDayClick={handleDayClick}
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
