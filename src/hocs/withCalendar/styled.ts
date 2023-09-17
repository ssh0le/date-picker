import styled from 'styled-components';

export const MonthWrapper = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.padding.m}px;
`;

export const WrongDatesMessage = styled.p`
  text-align: center;
`;
