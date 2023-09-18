import styled from 'styled-components';

import { GridCell } from '@/components/shared/Grid/GridCell';

import { DayContainerProps } from './interfaces';

export const MonthWrapper = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.padding.m}px;
  cursor: pointer;
`;

export const WrongDatesMessage = styled.p`
  text-align: center;
`;

export const DayContainer = styled(GridCell)<DayContainerProps>`
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  ${(props) => props.$styles}
`;
