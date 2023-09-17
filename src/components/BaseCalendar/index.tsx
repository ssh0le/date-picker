import React, { FC, memo } from 'react';

import { icons } from '@/constants';
import GlobalStyle from '@/styles/global';
import { BaseCalendarProps } from '@/types/decorators';

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

const { rightArrows, leftArrows } = icons;

const BaseCalendar: FC<BaseCalendarProps> = (props) => {
  const {
    weekDayNames,
    hasNextPage,
    hasPrevPage,
    onNextPageClick: onNextClick,
    onPrevPageClick: onPrevClick,
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
          {hasNextPage && (
            <NavIcon
              data-testid="prev"
              onClick={onPrevClick}
              src={leftArrows}
            />
          )}
          <HeaderTitle data-testid="title">{title}</HeaderTitle>
          {hasPrevPage && (
            <NavIcon
              data-testid="next"
              onClick={onNextClick}
              src={rightArrows}
            />
          )}
        </CalendarHeader>
        {weekDayNames && !!weekDayNames.length && (
          <Grid data-testid="header" $cols={7} $colWidth="32px">
            {weekDayNames.map((day, index) => (
              <WeekDayContainer key={index}>{day}</WeekDayContainer>
            ))}
          </Grid>
        )}
        {renderBody()}
      </CalendarContent>
      {hasSelection && (
        <ClearButton data-testid="clear" onClick={onClearClick}>
          Clear
        </ClearButton>
      )}
    </CalendarWrapper>
  );
};

export default memo(BaseCalendar);
