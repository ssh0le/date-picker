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
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 11px 15px;
`;

export const ClearIcon = styled.img`
    cursor: pointer;
`;

export const Input = styled.input`
    flex-grow: 1;
    outline: none;
    border: none;
`;
