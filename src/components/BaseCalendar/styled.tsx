import styled from 'styled-components';

import { flexCenter } from '@/styles/common';

import { GridCell } from '../shared/Grid/GridCell';

import { CalendarWrapperProps } from './interfaces';

export const CalendarWrapper = styled.div<CalendarWrapperProps>`
  border-radius: 10px;
  border: 1px solid #e1e1e1;
  width: ${({ theme }) => theme.width.m}px;
  ${({ $colors }) => $colors}
`;

export const CalendarContent = styled.div`
  padding: ${({ theme }) => theme.padding.l}px;
`;

export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: 16px 1fr 16px;
  padding: ${({ theme }) => theme.padding.m}px 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const HeaderTitle = styled.span`
  display: block;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.s}px;
  font-weight: bold;
  grid-column: 2;
`;

export const NavIcon = styled.img`
  display: flex;
  cursor: pointer;
`;

export const WeekDayContainer = styled(GridCell)`
  font-weight: bold;
`;

export const ClearButton = styled.button`
  ${flexCenter}
  width: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-top: 1px solid #e1e1e1;
  padding: ${({ theme }) => theme.padding.l}px 0;
`;
