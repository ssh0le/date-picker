import React, {
    ComponentProps,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

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
    mergeWithDefaultStyles,
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
        styles,
        highlightWeekends,
        viewType = CalendarViewType.Month,
        holidays,
    } = props;

    const weekDaysNames = getWeekDays(weekStartDay);

    const mergedStyles = mergeWithDefaultStyles(styles);

    const getConvertedHolidays = (currentDate: Date): { name: string; date: Date }[] => {
        const [year] = getDestructuredDate(currentDate);
        return (
            holidays?.map(({ name, month, day }) => ({ name, date: new Date(year, month, day) })) ??
            []
        );
    };
    const withCalendarComponent: FC<
        Omit<ComponentProps<typeof Component>, keyof WithCalendarOmittedProps> & WithCalendarAdditionalProps
    > = (nextProps) => {
        const { isSelectionHead, isSelectionTail, isSelected, initialDate, renderDay } = nextProps;
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

        const convertedHolidays = useMemo(
            () => getConvertedHolidays(currentDate),
            [currentDate.getFullYear()],
        );

        const filteredHolidays = useMemo(
            () =>
                convertedHolidays.filter(({date}) => {
                    return isInRange(date, firstDay, lastDay);
                }),
            [days],
        );

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
                holiday,
            } = mergedStyles;
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
            if (isSelected && isSelected(day, currentDate)) {
                mergeObjects(style, selectedDay);
            }
            if (isSelectionHead && isSelectionHead(day, currentDate)) {
                mergeObjects(style, selectionHeadDay);
            }
            if (isSelectionTail && isSelectionTail(day, currentDate)) {
                mergeObjects(style, selectionTailDay);
            }
            if (filteredHolidays.length) {
                const dayHoliday = filteredHolidays.find(({date}) => areEqualDates(day, date));
                if (dayHoliday) {
                    mergeObjects(style, holiday);
                }
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
                defineStyle={defineStyle}
                hasNext={hasNext}
                hasPrev={hasPrev}
            />
        );
    };

    return withCalendarComponent;
};

export default withCalendar;
