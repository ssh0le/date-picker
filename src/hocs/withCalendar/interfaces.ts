import { FC } from 'react';

import { CalendarViewType, Holiday, WeekStartDay } from '@/types/calendar';
import { BaseCalendarProps } from '@/types/decorators';

export interface WithCalendarProps {
    Component: FC<BaseCalendarProps>;
    initialDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    weekStartDay?: WeekStartDay;
    highlightWeekends?: boolean;
    highlightHolidays?: boolean;
    viewType?: CalendarViewType;
    holidays?: Holiday[],
}
