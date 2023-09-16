import styled from 'styled-components';

import { flexCenter } from '@/styles/common';

import { GridCell } from '../shared/Grid/GridCell';

import { CalendarWrapperProps, DayContainerProps } from './interfaces';

export const CalendarWrapper = styled.div<CalendarWrapperProps>`
  border-radius: 10px;
  border: 1px solid #e1e1e1;
  width: 250px;
  ${({ $colors }) => $colors}
`;

export const CalendarContent = styled.div`
  padding: 10px;
`;

export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: 16px 1fr 16px;
  padding: 5px 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const HeaderTitle = styled.span`
  display: block;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  grid-column: 2;
`;

export const NavIcon = styled.img`
  display: flex;
`;

export const WeekDayContainer = styled(GridCell)`
  font-weight: bold;
`;

export const DayContainer = styled(GridCell)<DayContainerProps>`
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  ${(props) => props.$styles}
`;

export const ClearButton = styled.button`
  ${flexCenter}
  width: 100%;
  background-color: transparent;
  border: none;
  border-top: 1px solid #e1e1e1;
  padding: 10px 0;
  outline: none;
`;
