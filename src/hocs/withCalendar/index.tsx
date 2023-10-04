import React, { ComponentProps, FC, useEffect, useMemo, useState } from 'react';

import { Grid } from '@/components/shared/Grid';
import { fetchHolidays } from '@/utils/fetchHolidays';
import {
  CalendarDayStyle,
  CalendarViewType,
  Holiday,
  WeekStartDay,
} from '@appTypes/calendar';
import {
  WithCalendarAdditionalProps,
  WithCalendarOmittedProps,
} from '@appTypes/decorators';
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
  mergeObjects,
} from '@helpers';

import { WithCalendarProps } from './interfaces';
import { DayContainer } from './styled';
import { MonthWrapper, WrongDatesMessage } from './styled';

const holidaysStorageKey = 'calendarHolidays';

const withCalendar = (props: WithCalendarProps) => {
  const {
    Component,
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
    const { initialDate, defineStyle, onDayClick, styles, minDate, maxDate } =
      nextProps;
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [currentViewType, setCurrentViewType] = useState(viewType);
    const [holidays, setHolidays] = useState<Holiday[]>([]);

    useEffect(() => {
      if (!highlightHolidays) return;
      if (userHolidays) {
        setHolidays(userHolidays);
      } else {
        const holidays = sessionStorage.getItem(holidaysStorageKey);
        if (holidays) {
          setHolidays(JSON.parse(holidays));
        } else {
          const getHolidays = async () => {
            const response = await fetchHolidays();
            setHolidays(response ?? []);
            sessionStorage.setItem(
              holidaysStorageKey,
              JSON.stringify(response),
            );
          };
          getHolidays();
        }
      }
    }, [userHolidays, highlightHolidays]);

    const handleDayClick = (day: Date, isInnerDay: boolean) => () => {
      if (currentViewType === CalendarViewType.Month && !isInnerDay) {
        return;
      }
      if (onDayClick) {
        onDayClick(day);
      }
    };

    const days = useMemo(
      () =>
        getCalendar(
          currentDate,
          weekStartDay,
          currentViewType,
          minDate,
          maxDate,
        ),
      [currentDate, weekStartDay, currentViewType, minDate, maxDate],
    );

    const firstDay = days.at(0)!;
    const lastDay = days.at(-1)!;

    useEffect(() => {
      if (initialDate && !isInRange(initialDate, firstDay, lastDay)) {
        setCurrentDate(initialDate);
      }
    }, [initialDate]);

    const filteredHolidays = useMemo(() => {
      if (
        currentViewType === CalendarViewType.Year ||
        !highlightHolidays ||
        !Array.isArray(holidays)
      )
        return [];
      const [firstYear, firstMonth] = getDestructuredDate(firstDay);
      const [lastYear] = getDestructuredDate(lastDay);
      return (holidays ?? []).filter(({ month, day }) =>
        isInRange(
          new Date(month < firstMonth ? lastYear : firstYear, month, day),
          firstDay,
          lastDay,
        ),
      );
    }, [days, currentViewType]);

    const defineDayStyle = (
      day: Date,
      isInnerDay: boolean,
    ): CalendarDayStyle => {
      const appliedStyles = [];
      if (currentViewType === CalendarViewType.Year) {
        return {};
      }
      const {
        today,
        weekend,
        outerDay,
        innerDay,
        holiday: holidayStyle,
      } = styles;
      if (isInnerDay || currentViewType !== CalendarViewType.Month) {
        appliedStyles.push(innerDay);
        if (isToday(day)) {
          appliedStyles.push(today);
        }
        if (highlightWeekends && isWeekEnd(day)) {
          appliedStyles.push(weekend);
        }
        if (highlightHolidays && filteredHolidays.length) {
          const [year] = getDestructuredDate(day);
          const holiday = filteredHolidays.find(({ month, day: holidayDay }) =>
            areEqualDates(day, new Date(year, month, holidayDay)),
          );
          if (holiday) {
            appliedStyles.push(holidayStyle);
          }
        }
        if (defineStyle) {
          appliedStyles.push(defineStyle(day));
        }
      }
      if (!isInnerDay && currentViewType === CalendarViewType.Month) {
        appliedStyles.push(outerDay);
      }
      return mergeObjects(...appliedStyles);
    };

    const title =
      currentViewType === CalendarViewType.Year
        ? currentDate.getFullYear()
        : getShortFormattedDate(currentDate);

    const addToCurrentDate = (amount: 1 | -1) => () => {
      setCurrentDate((prevDate) => {
        if (currentViewType === CalendarViewType.Month) {
          return addMonthsToDate(prevDate, amount);
        } else if (currentViewType === CalendarViewType.Year) {
          return addMonthsToDate(prevDate, amount * 12);
        } else {
          return addWeeksToDate(prevDate, amount);
        }
      });
    };

    const defineHasNextPage = (
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
      if (currentViewType === CalendarViewType.Year) {
        return !areEqualMonthAndYear(new Date(date), new Date(limit));
      } else {
        return isNext ? date < limit : date > limit;
      }
    };

    const handleMonthClick = (day: Date) => () => {
      setCurrentDate(day);
      setCurrentViewType(CalendarViewType.Month);
    };

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
      if (currentViewType !== CalendarViewType.Year) {
        return (
          <Grid data-testid="days-grid" $cols={7} $colWidth="32px">
            {days.map((day, index) => {
              const isInnerDay =
                areEqualMonthAndYear(currentDate, day) &&
                isInRange(day, minDate, maxDate);
              return (
                <DayContainer
                  key={index}
                  onClick={handleDayClick(day, isInnerDay)}
                  $isInteractive={isInnerDay}
                  $styles={defineDayStyle(day, isInnerDay)}
                >
                  {day.getDate()}
                </DayContainer>
              );
            })}
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
        title={title}
        weekDayNames={weekDaysNames}
        onNextPageClick={addToCurrentDate(1)}
        onPrevPageClick={addToCurrentDate(-1)}
        hasNextPage={defineHasNextPage(lastDay, maxDate, true)}
        colors={styles.calendar}
        hasPrevPage={defineHasNextPage(firstDay, minDate, false)}
      />
    );
  };

  return withCalendarComponent;
};

export default withCalendar;
