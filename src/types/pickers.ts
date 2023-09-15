import { CalendarStyles, CalendarViewType, Holiday, WeekStartDay } from '@/types/calendar';

export interface PickerProps {
    minDate?: Date;
    maxDate?: Date;
    styles?: CalendarStyles;
    highlightWeekends?: boolean;
    highlightHolidays?: boolean;
    weekStartDay?: WeekStartDay;
    initialDate?: Date,
    viewType?: CalendarViewType,
    holidays?: Holiday[], 
}
