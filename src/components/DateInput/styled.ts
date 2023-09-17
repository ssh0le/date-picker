import styled from 'styled-components';

import { InputContainerProps } from './interfaces';

export const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.width.m}px;
  gap: ${({ theme }) => theme.gap.m}px;
`;

export const LabelContainer = styled.label`
  font-size: ${({ theme }) => theme.fontSize.m}px;
  font-weight: bold;
  text-align: left;
`;

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  gap: ${({ theme }) => theme.gap.m}px;
  border: 1px solid ${({ $isValid }) => ($isValid ? '#dddddd' : 'red')};
  border-radius: 8px;
  padding: 11px 15px;
`;

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
