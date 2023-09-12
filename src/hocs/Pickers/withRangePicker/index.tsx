import React, { ComponentProps, FC, useCallback, useEffect, useState } from 'react';

import DateInput from '@/components/DateInput';
import { areEqualDates } from '@/helpers';
import { mergeObjects } from '@/helpers/mergeObjects';
import { WithPickerOmittedProps } from '@/interfaces/decorators';

import { WithPickerProps } from '../interfaces';

const withRangePicker = (props: WithPickerProps) => {
    const { Component } = props;
    const withRangePickerComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof WithPickerOmittedProps>
    > = (nextProps) => {
        const { defineStyle, styles, initialDate } = nextProps;
        const [selectedFrom, setSelectedFrom] = useState<null | Date>(null);
        const [selectedTo, setSelectedTo] = useState<null | Date>(null);

        const setDateToAll = (day: Date) => {
            setSelectedFrom(day);
            setSelectedTo(day);
        };

        useEffect(() => {
            if (initialDate) {
                setDateToAll(new Date(initialDate));
            }
        }, [initialDate]);

        const handleFromDateSubmit = useCallback((day: Date) => {
            setSelectedFrom(day);
        }, []);

        const handleDayClick = (day: Date) => {
            setDateToAll(day);
        };

        const handleToDateSubmit = useCallback((day: Date) => {
            setSelectedTo(day);
        }, []);

        const handleClearClick = () => {
            setSelectedTo(null);
            setSelectedFrom(null);
        };

        const isEnd = (day: Date | null, end: Date | null) => {
            if (!day || !end) {
                return false;
            }
            return areEqualDates(day, end);
        }

        const isHead = (day: Date) => isEnd(day, selectedFrom);

        const isTail = (day: Date) => isEnd(day, selectedTo);

        const isSelected = (day: Date) => {
            if (!selectedFrom || !selectedTo) return false;
            return day < selectedTo && day > selectedFrom;
        };

        const defineComponentStyle = (day: Date) => {
            const style = {};
            if (defineStyle) {
                mergeObjects(style, defineStyle(day));
            }
            const { selectionHeadDay, selectionTailDay, selectedDay } = styles;
            if (isSelected(day)) {
                mergeObjects(style, selectedDay);
            }
            if (isHead(day)) {
                mergeObjects(style, selectionHeadDay);
            }
            if (isTail(day)) {
                mergeObjects(style, selectionTailDay);
            }
            return style;
        };

        return (
            <>
                <DateInput label="From" onSubmit={handleFromDateSubmit} />
                <DateInput label="To" onSubmit={handleToDateSubmit} />
                <Component
                    {...nextProps}
                    defineStyle={defineComponentStyle}
                    initialDate={selectedTo}
                    hasSelection={Boolean(selectedTo) || Boolean(selectedFrom)}
                    onClearClick={handleClearClick}
                    onDayClick={handleDayClick}
                />
            </>
        );
    };

    return withRangePickerComponent;
};

export default withRangePicker;
