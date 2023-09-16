import React, { FC, memo } from 'react';

import { headerIcons } from '@/constants';
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

const { next, prev } = headerIcons;

const BaseCalendar: FC<BaseCalendarProps> = (props) => {
  const {
    weekDayNames,
    hasNext,
    hasPrev,
    onNextClick,
    onPrevClick,
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
          {hasPrev && (
            <NavIcon data-testid="prev" onClick={onPrevClick} src={prev} />
          )}
          <HeaderTitle data-testid="title">{title}</HeaderTitle>
          {hasNext && (
            <NavIcon data-testid="next" onClick={onNextClick} src={next} />
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
