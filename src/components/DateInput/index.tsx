import React, { ChangeEvent, FC, useCallback, useState } from 'react';

import { datePattern, inputIcons } from '@/constants';
import { convertToDate } from '@/helpers';

import { DateInputProps } from './interfaces';
import { DateInputContainer, Input, InputContainer, LabelContainer } from './styled';

const { clear, calendar, ok } = inputIcons;

const DateInput: FC<DateInputProps> = ({ label, onSubmit }) => {
    const [input, setInput] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || (value?.length > 0 && /[0-9./\\]/g.test(value.at(-1)!))) {
            setInput(e.target.value);
            setIsValid(true);
        }
    };

    const handleClearClick = useCallback(() => {
        setInput('');
    }, []);

    const handleApplyClick = () => {
        const date = convertToDate(input);
        if (date) {
            onSubmit(date);
        } else {
            setIsValid(false);
        }
    };

    return (
        <DateInputContainer>
            <LabelContainer>{label}</LabelContainer>
            <InputContainer isValid={isValid}>
                <img src={calendar} />
                <Input
                    value={input}
                    onChange={handleInputChange}
                    pattern={datePattern}
                    placeholder="Choose date (dd/mm/yyyy)"
                />
                {!!input.length && <img onClick={handleApplyClick} src={ok} />}
                {!!input.length && <img onClick={handleClearClick} src={clear} />}
            </InputContainer>
        </DateInputContainer>
    );
};

export default DateInput;
