import { CalendarStyles, WeekStartDay } from '@/interfaces/calendar';

export interface RangeDatePickerProps {
    minDate?: Date;
    maxDate?: Date;
    styles?: CalendarStyles;
    highlightWeekends?: boolean;
    weekStartDay?: WeekStartDay;
    initialDate?: Date,
}
