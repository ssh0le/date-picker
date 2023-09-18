import { FC } from 'react';

import {
  CalendarDayStyle,
  CalendarViewType,
  Holiday,
  WeekStartDay,
} from '@/types/calendar';
import { BaseCalendarProps } from '@/types/decorators';

export interface WithCalendarProps {
  Component: FC<BaseCalendarProps>;
  initialDate?: Date;
  weekStartDay?: WeekStartDay;
  highlightWeekends?: boolean;
  highlightHolidays?: boolean;
  viewType?: CalendarViewType;
  holidays?: Holiday[];
}

export interface DayContainerProps {
  $styles?: CalendarDayStyle;
}
