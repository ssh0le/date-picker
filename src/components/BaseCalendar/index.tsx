import React, { FC, memo } from 'react';

import { headerIcons } from '@/constants';
import { BaseCalendarProps } from '@/interfaces/decorators';
import GlobalStyle from '@/styles/global';

import { Grid } from '../shared/Grid';

import {
    CalendarContent,
    CalendarHeader,
    CalendarWrapper,
    ClearButton,
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
        // days,
        title,
        hasSelection,
        colors,
        onClearClick,
        renderBody,
    } = props;

    return (
        <CalendarWrapper $colors={colors}>
            <GlobalStyle />
            <CalendarContent>
                <CalendarHeader>
                    {hasPrev && <NavIcon onClick={onPrevClick} src={prev} />}
                    <HeaderTitle>{title}</HeaderTitle>
                    {hasNext && <NavIcon onClick={onNextClick} src={next} />}
                </CalendarHeader>
                {(weekDayNames && !!weekDayNames.length) && (
                    <Grid $cols={7} $colWidth="32px">
                        {weekDayNames.map((day, index) => (
                            <WeekDayContainer key={index}>{day}</WeekDayContainer>
                        ))}
                    </Grid>
                )}
                {renderBody()}
            </CalendarContent>
            {hasSelection && <ClearButton onClick={onClearClick}>Clear</ClearButton>}
        </CalendarWrapper>
    );
};

export default memo(BaseCalendar);
