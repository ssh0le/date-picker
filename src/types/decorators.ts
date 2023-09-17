import { CalendarColors, CalendarDayStyle, CalendarStyles } from './calendar';

export type BaseCalendarProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  title: string | number;
  weekDayNames?: string[];
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onDayClick: (day: Date) => () => void;
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
  | 'onDayClick'
  | 'colors'
  | 'renderBody'
>;

export type asd = Omit<BaseCalendarProps, keyof WithCalendarOmittedProps>;

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
