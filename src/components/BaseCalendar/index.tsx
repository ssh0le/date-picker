import React, { FC } from 'react';

import { headerIcons } from '@/constants';
import { BaseCalendarProps } from '@/interfaces/decorators';
import GlobalStyle from '@/styles/global';

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

const { next, prev } = headerIcons;

const BaseCalendar: FC<BaseCalendarProps> = (props) => {
    const {
        weekDayNames,
        hasNext,
        hasPrev,
        onNextClick,
        onPrevClick,
        days,
        title,
        hasSelection,
        defineStyle,
        onClearClick,
        renderDay,
    } = props;

    return (
        <CalendarWrapper>
            <GlobalStyle />
            <CalendarContent>
                <CalendarHeader>
                    {hasPrev && <NavIcon onClick={onPrevClick} src={prev} />}
                    <HeaderTitle>{title}</HeaderTitle>
                    {hasNext && <NavIcon onClick={onNextClick} src={next} />}
                </CalendarHeader>
                <CalendarGrid>
                    {weekDayNames!.map((day, index) => (
                        <WeekDayContainer key={index}>{day}</WeekDayContainer>
                    ))}
                </CalendarGrid>
                <CalendarGrid>
                    {days!.map((day, index) => {
                        if (!renderDay) {
                            const styles = defineStyle(day);
                            return (
                                <DayContainer styles={styles} key={index}>
                                    {day.getDate()}
                                </DayContainer>
                            );
                        }
                        const Day = renderDay(day);
                        return <Day key={index} />;
                    })}
                </CalendarGrid>
            </CalendarContent>
            {hasSelection && <ClearButton onClick={onClearClick}>Clear</ClearButton>}
        </CalendarWrapper>
    );
};

export default BaseCalendar;
