import React, { ComponentProps, FC, useCallback, useEffect, useMemo, useState } from 'react';

import { defaultStyles } from '@/constants';
import {
    areEqualDates,
    areEqualMonthAndYear,
    getCalendar,
    getDestructuredDate,
    getFormattedDate,
    getWeekDays,
    isInRange,
    isToday,
    isWeekEnd,
} from '@/helpers';
import { addMonthsToDate, addWeeksToDate } from '@/helpers';
import { mergeObjects } from '@/helpers/mergeObjects';
import { CalendarDayStyle, CalendarViewType, WeekStartDay } from '@/interfaces/calendar';
import { WithCalendarAdditionalProps, WithCalendarOmittedProps } from '@/interfaces/decorators';

import { WithCalendarProps } from './interfaces';

const withCalendar = (props: WithCalendarProps) => {
    const {
        Component,
        minDate,
        maxDate,
        weekStartDay = WeekStartDay.Monday,
        styles = defaultStyles,
        highlightWeekends,
        viewType = CalendarViewType.Month,
        holidays,
    } = props;

    const weekDaysNames = getWeekDays(weekStartDay);

    const withCalendarComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof WithCalendarOmittedProps> &
            WithCalendarAdditionalProps
    > = (nextProps) => {
        const { initialDate, renderDay, defineStyle } = nextProps;
        const [currentDate, setCurrentDate] = useState<Date>(initialDate ?? new Date());

        const days = useMemo(
            () => getCalendar(currentDate, weekStartDay, viewType),
            [currentDate, weekStartDay, viewType],
        );

        const firstDay = days.at(0)!;
        const lastDay = days.at(-1)!;

        useEffect(() => {
            if (initialDate && !isInRange(initialDate, firstDay, lastDay)) {
                setCurrentDate(initialDate);
            }
        }, [initialDate]);

        const filteredHolidays = useMemo(
            () =>
                (holidays ?? []).filter(({ month, day }) => {
                    const [year] = getDestructuredDate(currentDate);
                    return isInRange(new Date(year, month, day), firstDay, lastDay);
                }),
            [days],
        );

        const defineComponentStyle = (day: Date): CalendarDayStyle => {
            const style: CalendarDayStyle = {};
            const { today, weekend, outerDay, innerDay, holiday } = styles;
            mergeObjects(style, innerDay);
            if (isToday(day)) {
                mergeObjects(style, today);
            }
            if (highlightWeekends && isWeekEnd(day)) {
                mergeObjects(style, weekend);
            }
            if (viewType === CalendarViewType.Month && !areEqualMonthAndYear(currentDate, day)) {
                mergeObjects(style, outerDay);
            }

            if (filteredHolidays.length) {
                const [year] = getDestructuredDate(day);
                const dayHoliday = filteredHolidays.find(({ month, day: hDay }) =>
                    areEqualDates(day, new Date(year, month, hDay)),
                );
                if (dayHoliday) {
                    mergeObjects(style, holiday);
                }
            }
            if (defineStyle) {
                mergeObjects(style, defineStyle(day));
            }
            return style;
        };

        const title = getFormattedDate(currentDate);

        const getNextDate = useCallback(
            (prevDate: Date, amount: number) => {
                if (viewType === CalendarViewType.Month) {
                    return addMonthsToDate(prevDate, amount);
                } else {
                    return addWeeksToDate(prevDate, amount);
                }
            },
            [viewType],
        );

        const addToCurrentDate = useCallback(
            (amount: 1 | -1) => {
                setCurrentDate((prevDate) => getNextDate(prevDate, amount));
            },
            [getNextDate],
        );

        const handleNextClick = useCallback(() => addToCurrentDate(1), []);
        const handlePrevClick = useCallback(() => addToCurrentDate(-1), []);

        const hasNext = maxDate === undefined || lastDay < maxDate;
        const hasPrev = minDate === undefined || firstDay > minDate;

        return (
            <Component
                {...nextProps}
                renderDay={renderDay}
                days={days}
                title={title}
                weekDayNames={weekDaysNames}
                onNextClick={handleNextClick}
                onPrevClick={handlePrevClick}
                defineStyle={defineComponentStyle}
                hasNext={hasNext}
                hasPrev={hasPrev}
            />
        );
    };

    return withCalendarComponent;
};

export default withCalendar;
