import React, { ComponentProps, FC, useCallback, useEffect, useMemo, useState } from 'react';

import {
    areEqualMonthAndYear,
    getCalendar,
    getFormattedDate,
    getWeekDays,
    isToday,
    isWeekEnd,
    mergeWithDefaultStyles,
} from '@/helpers';
import { addMonthsToDate } from '@/helpers/addMonthsToDate';
import { mergeObjects } from '@/helpers/mergeObjects';
import { CalendarDayStyle, WeekStartDay } from '@/interfaces/calendar';
import { CalendarDecorativeProps } from '@/interfaces/decorators';

import { isSelectionFunc, WithCalendarProps } from './interfaces';

const withCalendar = (props: WithCalendarProps) => {
    const {
        Component,
        minDate,
        maxDate,
        weekStartDay = WeekStartDay.Monday,
        styles,
        highlightWeekends,
    } = props;
    const withCalendarComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof CalendarDecorativeProps> & {
            isSelectionHead?: isSelectionFunc;
            isSelectionTail?: isSelectionFunc;
            isSelected?: isSelectionFunc;
            initialDate: Date | null;
        }
    > = (nextProps) => {
        console.log('with calendared render');
        const { isSelectionHead, isSelectionTail, isSelected, initialDate } = nextProps;
        const [currentDate, setCurrentDate] = useState<Date>(initialDate ?? new Date());
        const hasNext = maxDate === undefined || !areEqualMonthAndYear(currentDate, maxDate);
        const hasPrev = minDate === undefined || !areEqualMonthAndYear(currentDate, minDate);

        useEffect(() => {
            if (initialDate && !areEqualMonthAndYear(initialDate, currentDate)) {
                setCurrentDate(initialDate);
            }
        }, [initialDate]);

        const days = useMemo(
            () => getCalendar(currentDate, weekStartDay),
            [currentDate, weekStartDay],
        );

        const weekDaysNames = useMemo(() => getWeekDays(weekStartDay), [weekStartDay]);

        const mergedStyles = useMemo(() => mergeWithDefaultStyles(styles), [styles]);

        const defineStyle = (day: Date): CalendarDayStyle => {
            const style: CalendarDayStyle = {};
            const {
                today,
                weekend,
                outerDay,
                innerDay,
                selectionHeadDay,
                selectionTailDay,
                selectedDay,
            } = mergedStyles;
            mergeObjects(style, innerDay);
            if (isToday(day)) {
                mergeObjects(style, today);
            }
            if (highlightWeekends && isWeekEnd(day)) {
                mergeObjects(style, weekend);
            }
            if (!areEqualMonthAndYear(currentDate, day)) {
                mergeObjects(style, outerDay);
            }
            if (isSelected && isSelected(day, currentDate)) {
                mergeObjects(style, selectedDay);
            }
            if (isSelectionHead && isSelectionHead(day, currentDate)) {
                mergeObjects(style, selectionHeadDay);
            }
            if (isSelectionTail && isSelectionTail(day, currentDate)) {
                mergeObjects(style, selectionTailDay);
            }
            return style;
        };

        const title = getFormattedDate(currentDate);

        const addMonthToCurrentDate = useCallback((month: number) => {
            setCurrentDate((prevDate) => addMonthsToDate(prevDate, month));
        }, []);

        const handleNextClick = useCallback(() => addMonthToCurrentDate(1), []);
        const handlePrevClick = useCallback(() => addMonthToCurrentDate(-1), []);

        return (
            <Component
                {...nextProps}
                days={days}
                title={title}
                weekDayNames={weekDaysNames}
                onNextClick={handleNextClick}
                onPrevClick={handlePrevClick}
                defineStyle={defineStyle}
                hasNext={hasNext}
                hasPrev={hasPrev}
            />
        );
    };

    return withCalendarComponent;
};

export default withCalendar;
