import { CalendarColors, CalendarDayStyle, CalendarStyles } from './calendar';

export type BaseCalendarProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  title: string | number;
  weekDayNames?: string[];
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onClearClick: () => void;
  hasSelection: boolean;
  renderBody: () => JSX.Element;
  colors: CalendarColors;
};

export type WithCalendarOmittedProps = Pick<
  BaseCalendarProps,
  | 'hasNextPage'
  | 'hasPrevPage'
  | 'title'
  | 'weekDayNames'
  | 'onNextPageClick'
  | 'onPrevPageClick'
  | 'colors'
  | 'renderBody'
>;

export type WithCalendarAdditionalProps = {
  initialDate?: Date | null;
  styles: Required<CalendarStyles>;
  onDayClick?: (day: Date) => void;
  defineStyle?: (day: Date) => CalendarDayStyle;
  minDate?: Date;
  maxDate?: Date;
} & Partial<Pick<BaseCalendarProps, 'onClearClick' | 'hasSelection'>>;

export type WithPickerOmittedProps = Pick<BaseCalendarProps, 'onClearClick'> &
  Pick<BaseCalendarProps, 'hasSelection'>;

export type WithTodosOmittedProps = {
  onDayClick?: (day: Date) => void;
};
