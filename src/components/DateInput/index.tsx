import React, { ChangeEvent, FC, useState } from 'react';

import { getInputIcon } from '@/helpers';

import { ClearIcon, DateInputContainer, Input, InputContainer, LabelContainer } from './styled';

const DateInput: FC = () => {
    const [input, setInput] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleClearClick = () => {
        setInput('');
    };

    return (
        <DateInputContainer>
            <LabelContainer>Date</LabelContainer>
            <InputContainer>
                <img src={getInputIcon('calendar')} />
                <Input value={input} onChange={handleInputChange} placeholder="Choose date" />
                {!!input.length && (
                    <ClearIcon onClick={handleClearClick} src={getInputIcon('clear')} />
                )}
            </InputContainer>
        </DateInputContainer>
    );
};

export default DateInput;
