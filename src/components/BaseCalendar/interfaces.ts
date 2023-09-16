import { CalendarColors, CalendarDayStyle } from '@/types/calendar';

export interface DayContainerProps {
  $styles?: CalendarDayStyle;
}

export interface CalendarWrapperProps {
  $colors: CalendarColors;
}
