import React, { ComponentProps, FC, useCallback, useEffect, useMemo, useState } from 'react';

import { DayContainer } from '@/components/BaseCalendar/styled';
import { Grid } from '@/components/shared/Grid';
import { defaultStyles } from '@/constants';
import {
    areEqualDates,
    areEqualMonthAndYear,
    getCalendar,
    getDestructuredDate,
    getMonthShortName,
    getShortFormattedDate,
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
import { MonthWrapper } from './styled';

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

    const weekDaysNames = getWeekDays(weekStartDay, viewType);

    const withCalendarComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof WithCalendarOmittedProps> &
            WithCalendarAdditionalProps
    > = (nextProps) => {
        const { initialDate, defineStyle, onDayClick } = nextProps;
        const [currentDate, setCurrentDate] = useState<Date>(initialDate ?? new Date());

        const handleDayClick = useCallback(
            (day: Date) => () => {
                if (onDayClick) {
                    onDayClick(day);
                }
            },
            [onDayClick],
        );

        const days = useMemo(
            () => getCalendar(currentDate, weekStartDay, viewType, minDate, maxDate),
            [currentDate, weekStartDay, viewType, minDate, maxDate],
        );

        const firstDay = days.at(0)!;
        const lastDay = days.at(-1)!;

        useEffect(() => {
            if (initialDate && !isInRange(initialDate, firstDay, lastDay)) {
                setCurrentDate(initialDate);
            }
        }, [initialDate]);

        const filteredHolidays = useMemo(() => {
            if (viewType === CalendarViewType.Year) return [];
            const [year] = getDestructuredDate(firstDay);
            return (holidays ?? []).filter(({ month, day }) =>
                isInRange(new Date(year, month, day, 0, 0), firstDay, lastDay),
            );
        }, [days]);

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

        const title =
            viewType === CalendarViewType.Year
                ? currentDate.getFullYear()
                : getShortFormattedDate(currentDate);

        const getNextDate = useCallback(
            (prevDate: Date, amount: number) => {
                if (viewType === CalendarViewType.Month) {
                    return addMonthsToDate(prevDate, amount);
                } else if (viewType === CalendarViewType.Year) {
                    return addMonthsToDate(prevDate, amount * 12);
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

        const defineHasNext = (date: Date, limit: Date | undefined, isNext: boolean) => {
            if (!limit) {
                return true;
            }
            if (viewType === CalendarViewType.Year) {
                return !areEqualMonthAndYear(date, limit);
            } else {
                return isNext ? date < limit : date > limit;
            }
        };

        const hasNext = defineHasNext(lastDay, maxDate, true);
        const hasPrev = defineHasNext(firstDay, minDate, false);
        console.log(hasPrev, hasNext);

        const renderBody = () => {
            if (viewType !== CalendarViewType.Year) {
                return (
                    <Grid cols={7} colWidth="32px">
                        {days.map((day, index) => (
                            <DayContainer
                                key={index}
                                onClick={handleDayClick(day)}
                                styles={defineComponentStyle(day)}>
                                {day.getDate()}
                            </DayContainer>
                        ))}
                    </Grid>
                );
            } else {
                return (
                    <Grid cols={3} colWidth="1fr">
                        {days.map((day, index) => (
                            <MonthWrapper key={index}>{getMonthShortName(day)}</MonthWrapper>
                        ))}
                    </Grid>
                );
            }
        };

        return (
            <Component
                {...nextProps}
                renderBody={renderBody}
                onDayClick={handleDayClick}
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
