import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { inputIcons } from '@/constants';
import { convertToDate } from '@/helpers';

import { DateInputProps } from './interfaces';
import { DateInputContainer, Input, InputContainer, LabelContainer } from './styled';

const { clear, calendar, ok } = inputIcons;

const DateInput: FC<DateInputProps> = ({ label, onSubmit, onChange, value }) => {
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || (value?.length > 0 && /^[0-9./\\]*$/g.test(value))) {
            onChange(value);
            setIsValid(true);
        }
    };

    const handleClearClick = useCallback(() => {
        onChange('');
    }, []);

    const handleApplyClick = () => {
        const date = convertToDate(value);
        if (date) {
            onSubmit(date);
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
                            src={ok}
                        />
                        <img
                            data-testid={`input-clear-${label}`}
                            onClick={handleClearClick}
                            src={clear}
                        />
                    </>
                )}
            </InputContainer>
        </DateInputContainer>
    );
};

export default memo(DateInput);
