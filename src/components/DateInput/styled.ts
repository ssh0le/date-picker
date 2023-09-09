import styled from 'styled-components';

export const DateInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    gap: 8px;
`;

export const LabelContainer = styled.label`
    font-size: 15px;
    font-weight: bold;
    text-align: left;
`;


interface InputContainerProps {
    $isValid: boolean
}

export const InputContainer = styled.div<InputContainerProps>`
    display: flex;
    gap: 8px;
    border: 1px solid ${({ $isValid }) => $isValid ? '#dddddd' : 'red'};
    border-radius: 8px;
    padding: 11px 15px;
`;

export const Icon = styled.div`

`

export const ClearIcon = styled.img`
    cursor: pointer;
`;

export const Input = styled.input`
    flex-grow: 1;
    min-width: 0;
    display: block;
    outline: none;
    border: none;
`;
