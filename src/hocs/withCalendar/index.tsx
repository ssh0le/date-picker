import React, { ComponentProps, FC, useCallback, useEffect, useMemo, useState } from 'react';

import { DayContainer } from '@/components/BaseCalendar/styled';
import { Grid } from '@/components/shared/Grid';
import {
    addMonthsToDate,
    addWeeksToDate,
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
import { mergeObjects } from '@/helpers/mergeObjects';
import { CalendarDayStyle, CalendarViewType, Holiday, WeekStartDay } from '@/types/calendar';
import { WithCalendarAdditionalProps, WithCalendarOmittedProps } from '@/types/decorators';
import { fetchHolidays } from '@/utils/fetchHolidays';

import { WithCalendarProps } from './interfaces';
import { MonthWrapper, WrongDatesMessage } from './styled';

const withCalendar = (props: WithCalendarProps) => {
    const {
        Component,
        minDate,
        maxDate,
        weekStartDay = WeekStartDay.Monday,
        highlightWeekends = false,
        highlightHolidays = false,
        viewType = CalendarViewType.Month,
        holidays: userHolidays,
    } = props;

    const weekDaysNames = getWeekDays(weekStartDay, viewType);

    const withCalendarComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof WithCalendarOmittedProps> &
            WithCalendarAdditionalProps
    > = (nextProps) => {
        const { initialDate, defineStyle, onDayClick, styles } = nextProps;
        const [currentDate, setCurrentDate] = useState<Date>(new Date());
        const [holidays, setHolidays] = useState<Holiday[]>([]);

        useEffect(() => {
            if (highlightHolidays) {
                const getHolidays = async () => {
                    if (!userHolidays) {
                        const response = await fetchHolidays();
                        setHolidays(response ?? []);
                    } else {
                        setHolidays(userHolidays);
                    }
                };
                getHolidays();
            }
        }, [userHolidays, highlightHolidays]);

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
            if (viewType === CalendarViewType.Year || !highlightHolidays) return [];
            const [firstYear, firstMonth] = getDestructuredDate(firstDay);
            const [lastYear] = getDestructuredDate(lastDay);
            return (holidays ?? []).filter(({ month, day }) =>
                isInRange(
                    new Date(month < firstMonth ? lastYear : firstYear, month, day, 0, 0, 0, 0),
                    firstDay,
                    lastDay,
                ),
            );
        }, [days, viewType]);

        const defineComponentStyle = (day: Date): CalendarDayStyle => {
            const style: CalendarDayStyle = {};
            if (viewType === CalendarViewType.Year) {
                return style;
            }
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
            if (highlightHolidays && filteredHolidays.length) {
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

        const defineHasNext = (
            date: Date | undefined,
            limit: Date | undefined,
            isNext: boolean,
        ) => {
            if (!limit) {
                return true;
            }
            if (!date) {
                return false;
            }
            if (viewType === CalendarViewType.Year) {
                return !areEqualMonthAndYear(new Date(date), new Date(limit));
            } else {
                return isNext ? date < limit : date > limit;
            }
        };

        const hasNext = defineHasNext(lastDay, maxDate, true);
        const hasPrev = defineHasNext(firstDay, minDate, false);

        const handleMonthClick = (day: Date) => () => setCurrentDate(day);

        const renderBody = () => {
            if (maxDate && minDate && minDate > maxDate) {
                return (
                    <Grid data-testid="no-items-grid" $cols={1} $colWidth="1fr">
                        <WrongDatesMessage data-testid="wrong-dates">
                            Incorrect minimum and maximum date range.
                        </WrongDatesMessage>
                    </Grid>
                );
            }
            if (viewType !== CalendarViewType.Year) {
                return (
                    <Grid data-testid="days-grid" $cols={7} $colWidth="32px">
                        {days.map((day, index) => (
                            <DayContainer
                                key={index}
                                onClick={handleDayClick(day)}
                                $styles={defineComponentStyle(day)}>
                                {day.getDate()}
                            </DayContainer>
                        ))}
                    </Grid>
                );
            } else {
                return (
                    <Grid data-testid="month-grid" $cols={3} $colWidth="1fr">
                        {days.map((day, index) => (
                            <MonthWrapper onClick={handleMonthClick(day)} key={index}>
                                {getMonthShortName(day)}
                            </MonthWrapper>
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
                title={title}
                weekDayNames={weekDaysNames}
                onNextClick={handleNextClick}
                onPrevClick={handlePrevClick}
                hasNext={hasNext}
                colors={styles.calendar}
                hasPrev={hasPrev}
            />
        );
    };

    return withCalendarComponent;
};

export default withCalendar;
