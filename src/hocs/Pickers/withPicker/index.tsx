import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';

import DateInput from '@/components/DateInput';
import { WithPickerOmittedProps } from '@appTypes/decorators';
import { areEqualDates, mergeObjects } from '@helpers';

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
    const {
      defineStyle,
      styles,
      initialDate,
      minDate,
      maxDate,
      onSelect,
      onDayClick,
      onClearClick,
    } = nextProps;
    const [selectedDay, setSelectedDay] = useState<null | Date>(
      initialDate ?? null,
    );
    const [inputDate, setInputDate] = useState<string>('');

    useEffect(() => {
      if (initialDate) {
        setSelectedDay(new Date(initialDate));
      }
    }, [initialDate]);

    const handleInputChange = useCallback(
      (input: string) => setInputDate(input),
      [],
    );

    const handleDateSelect = (day: Date | null) => {
      if (onSelect) {
        onSelect(day);
      }
    };

    const handleDateSubmit = useCallback(
      (day: Date) => {
        setSelectedDay((prevDate) =>
          areEqualDates(prevDate, day) ? null : day,
        );
        handleDateSelect(day);
      },
      [handleDateSelect],
    );

    const handleDayClick = (day: Date) => {
      handleDateSubmit(day);
      if (onDayClick) {
        onDayClick(day);
      }
    };

    const isSelected = (day: Date) => {
      if (!selectedDay) return false;
      return (
        selectedDay.getMonth() === day.getMonth() &&
        selectedDay.getDate() === day.getDate()
      );
    };

    const defineDayStyle = (day: Date) => {
      const appliedStyle = [];
      if (defineStyle) {
        appliedStyle.push(defineStyle(day));
      }
      if (styles) {
        const { selectionHeadDay, selectionTailDay } = styles;
        if (isSelected(day)) {
          appliedStyle.push(selectionHeadDay, selectionTailDay);
        }
      }
      return mergeObjects(...appliedStyle);
    };

    const handleClearClick = () => {
      setSelectedDay(null);
      handleDateSelect(null);
      setInputDate('');
      if (onClearClick) {
        onClearClick();
      }
    };

    return (
      <>
        <DateInput
          label="Date"
          onSubmit={handleDateSubmit}
          value={inputDate}
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleInputChange}
        />
        <Component
          {...nextProps}
          onDayClick={handleDayClick}
          initialDate={selectedDay}
          defineStyle={defineDayStyle}
          onClearClick={handleClearClick}
          hasSelection={Boolean(selectedDay) || !!inputDate.length}
        />
      </>
    );
  };

  return withCalendarComponent;
};

export default withPicker;
