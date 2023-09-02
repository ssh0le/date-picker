import styled from 'styled-components';

import { CalendarDayStyle } from '@/interfaces/calendar';

export const CalendarWrapper = styled.div`
    border-radius: 10px;
    border: 1px solid #e1e1e1;
    width: 250px;
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

export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 32px);
`;

export const GridCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 32px;
    height: 32px;
`;

export const WeekDayContainer = styled(GridCell)`
    font-weight: bold;
`;

interface DayContainerProps {
    styles?: CalendarDayStyle;
}

export const DayContainer = styled(GridCell)<DayContainerProps>`
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    ${(props) => props.styles}
`;

export const ClearButton = styled.button`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    border-top: 1px solid #e1e1e1;
    padding: 10px 0;
    outline: none;
`;
