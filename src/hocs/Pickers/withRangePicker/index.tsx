import React, {
  ComponentProps,
  Dispatch,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';

import DateInput from '@/components/DateInput';
import { areEqualDates } from '@/helpers';
import { mergeObjects } from '@/helpers/mergeObjects';
import { WithPickerOmittedProps } from '@/types/decorators';

import { WithPickerProps } from '../interfaces';

const withRangePicker = (props: WithPickerProps) => {
  const { Component } = props;
  const withRangePickerComponent: FC<
    Omit<ComponentProps<typeof Component>, keyof WithPickerOmittedProps> & {
      onSelect?: (from: Date | null, to: Date | null) => void;
    }
  > = (nextProps) => {
    const { defineStyle, styles, initialDate, onSelect, minDate, maxDate } =
      nextProps;
    const [selectedFrom, setSelectedFrom] = useState<null | Date>(null);
    const [fromInput, setFromInput] = useState<string>('');
    const [selectedTo, setSelectedTo] = useState<null | Date>(null);
    const [toInput, setToInput] = useState<string>('');

    const handleSelectDate = useCallback(
      (from: Date | null, to: Date | null) => {
        if (onSelect) {
          onSelect(from, to);
        }
      },
      [onSelect],
    );

    const createInputHandler = (setter: Dispatch<string>) => (input: string) =>
      setter(input);

    const setDateToAll = (day: Date | null) => {
      const toggleDate = (prevDate: Date | null) =>
        prevDate === day ? null : day;
      setSelectedFrom(toggleDate);
      setSelectedTo(toggleDate);
      handleSelectDate(day, day);
    };

    useEffect(() => {
      if (initialDate) {
        setDateToAll(new Date(initialDate));
      }
    }, [initialDate]);

    const handleDayClick = (day: Date) => {
      setDateToAll(day);
    };

    const handleClearClick = () => {
      setDateToAll(null);
      setToInput('');
      setFromInput('');
    };

    const handleFromDateSubmit = (day: Date) => {
      setSelectedFrom(day);
      handleSelectDate(day, selectedTo);
    };

    const handleToDateSubmit = (day: Date) => {
      setSelectedTo(day);
      handleSelectDate(selectedFrom, day);
    };

    const isEnd = (day: Date | null, end: Date | null) => {
      if (!day || !end) {
        return false;
      }
      return areEqualDates(day, end);
    };

    const isSelected = (day: Date) => {
      if (!selectedFrom || !selectedTo) return false;
      return day < selectedTo && day > selectedFrom;
    };

    const defineComponentStyle = (day: Date) => {
      const appliedStyles = [];
      if (defineStyle) {
        appliedStyles.push(defineStyle(day));
      }
      const { selectionHeadDay, selectionTailDay, selectedDay } = styles;
      if (isSelected(day)) {
        appliedStyles.push(selectedDay);
      }
      if (isEnd(day, selectedFrom)) {
        appliedStyles.push(selectionHeadDay);
      }
      if (isEnd(day, selectedTo)) {
        appliedStyles.push(selectionTailDay);
      }
      return mergeObjects(...appliedStyles);
    };

    return (
      <>
        <DateInput
          label="From"
          onSubmit={handleFromDateSubmit}
          value={fromInput}
          onChange={createInputHandler(setFromInput)}
          minDate={minDate}
          maxDate={maxDate}
        />
        <DateInput
          label="To"
          onSubmit={handleToDateSubmit}
          value={toInput}
          onChange={createInputHandler(setToInput)}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Component
          {...nextProps}
          defineStyle={defineComponentStyle}
          initialDate={selectedTo}
          hasSelection={Boolean(
            selectedTo || selectedFrom || toInput || fromInput,
          )}
          onClearClick={handleClearClick}
          onDayClick={handleDayClick}
        />
      </>
    );
  };

  return withRangePickerComponent;
};

export default withRangePicker;
