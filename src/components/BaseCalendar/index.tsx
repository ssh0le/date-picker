import React, { FC } from 'react';

import { getHeaderIcon } from '@/helpers';
import { BaseCalendarProps } from '@/interfaces/decorators';

import {
    CalendarContent,
    CalendarGrid,
    CalendarHeader,
    CalendarWrapper,
    ClearButton,
    DayContainer,
    HeaderTitle,
    NavIcon,
    WeekDayContainer,
} from './styled';

const BaseCalendar: FC<BaseCalendarProps> = (props) => {
    const { weekDayNames, hasNext, hasPrev, onNextClick, onPrevClick, days, title, defineStyle } =
        props;

    return (
        <CalendarWrapper>
            <CalendarContent>
                <CalendarHeader>
                    {hasPrev && <NavIcon onClick={onPrevClick} src={getHeaderIcon('prev')} />}
                    <HeaderTitle>{title}</HeaderTitle>
                    {hasNext && <NavIcon onClick={onNextClick} src={getHeaderIcon('next')} />}
                </CalendarHeader>
                <CalendarGrid>
                    {weekDayNames!.map((day, index) => (
                        <WeekDayContainer key={index}>{day}</WeekDayContainer>
                    ))}
                </CalendarGrid>
                <CalendarGrid>
                    {days!.map((day, index) => {
                        const styles = defineStyle(day);
                        return (
                            <DayContainer styles={styles} key={index}>
                                {day.getDate()}
                            </DayContainer>
                        );
                    })}
                </CalendarGrid>
            </CalendarContent>
            {false && <ClearButton>Clear</ClearButton>}
        </CalendarWrapper>
    );
};

export default BaseCalendar;
