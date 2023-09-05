import { FC } from 'react';

import { CalendarStyles, CalendarViewType, Holiday, WeekStartDay } from '@/interfaces/calendar';
import { BaseCalendarProps } from '@/interfaces/decorators';

export interface WithCalendarProps {
    Component: FC<BaseCalendarProps>;
    initialDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    weekStartDay?: WeekStartDay;
    highlightWeekends?: boolean;
    styles?: Required<CalendarStyles>;
    viewType?: CalendarViewType;
    holidays?: Holiday[],
}
