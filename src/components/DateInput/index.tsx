import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { dateAllowedChars, icons } from '@/constants';
import { convertToDate, isInRange } from '@helpers';

import { DateInputProps } from './interfaces';
import {
  DateInputContainer,
  Input,
  InputContainer,
  LabelContainer,
} from './styled';

const { clearIcon, calendar, confirmIcon } = icons;

const DateInput: FC<DateInputProps> = ({
  label,
  onSubmit,
  onChange,
  minDate,
  maxDate,
  value,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (value?.length > 0 && dateAllowedChars.test(value))) {
      onChange(value);
      setIsValid(true);
    }
  };

  const handleClearClick = useCallback(() => {
    onChange('');
    setIsValid(true);
  }, []);

  const handleApplyClick = () => {
    const date = convertToDate(value);
    if (date) {
      if (minDate && maxDate) {
        if (isInRange(date, minDate, maxDate)) {
          onSubmit(date);
        } else {
          setIsValid(false);
        }
      } else {
        onSubmit(date);
      }
    } else {
      setIsValid(false);
    }
  };

  return (
    <DateInputContainer>
      <LabelContainer>{label}</LabelContainer>
      <InputContainer $isValid={isValid}>
        <img src={calendar} />
        <Input
          data-testid={`input-${label}`}
          value={value}
          onChange={handleInputChange}
          placeholder="Choose date (dd/mm/yyyy)"
        />
        {!!value.length && (
          <>
            <img
              data-testid={`input-apply-${label}`}
              onClick={handleApplyClick}
              src={confirmIcon}
            />
            <img
              data-testid={`input-clear-${label}`}
              onClick={handleClearClick}
              src={clearIcon}
            />
          </>
        )}
      </InputContainer>
    </DateInputContainer>
  );
};

export default memo(DateInput);
