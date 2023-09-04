import { FC } from 'react';

import { CalendarStyles, WeekStartDay } from '@/interfaces/calendar';
import { BaseCalendarProps } from '@/interfaces/decorators';

export type isSelectionFunc = (day: Date, currentDate: Date) => boolean;

export interface WithCalendarProps {
    Component: FC<BaseCalendarProps>;
    initialDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    weekStartDay?: WeekStartDay;
    highlightWeekends?: boolean;
    styles?: CalendarStyles;
}
