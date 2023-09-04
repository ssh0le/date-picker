import React, { ComponentProps, FC, useCallback, useState } from 'react';

import DateInput from '@/components/DateInput';
import { WithPickerOmittedProps } from '@/interfaces/decorators';

import { WithPickerProps } from '../interfaces';

const withRangePicker = (props: WithPickerProps) => {
    const { Component } = props;
    console.log('with range picker');
    const withRangePickerComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof WithPickerOmittedProps>
    > = (nextProps) => {
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
                selectedFrom.getMonth() === day.getMonth() &&
                selectedFrom.getDate() === day.getDate()
            );
        };

        const isTail = (day: Date) => {
            if (!selectedTo) return false;
            return (
                selectedTo.getMonth() === day.getMonth() && selectedTo.getDate() === day.getDate()
            );
        };

        const isSelected = (day: Date) => {
            if (!selectedFrom || !selectedTo) return false;
            return day < selectedTo && day > selectedFrom;
        };

        return (
            <>
                <DateInput label="From" onSubmit={handleFromDateSubmit} />
                <DateInput label="To" onSubmit={handleToDateSubmit} />
                <Component
                    {...nextProps}
                    isSelected={isSelected}
                    isSelectionHead={isHead}
                    isSelectionTail={isTail}
                    initialDate={selectedTo}
                    hasSelection={Boolean(selectedTo) && Boolean(selectedFrom)}
                    onClearClick={handleClearClick}
                />
            </>
        );
    };

    return withRangePickerComponent;
};

export default withRangePicker;
