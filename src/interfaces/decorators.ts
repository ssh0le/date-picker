import { CalendarDayStyle, CalendarStyles } from './calendar';

export type BaseCalendarProps = {
    hasNext: boolean;
    hasPrev: boolean;
    title: string | number;
    weekDayNames?: string[];
    onNextClick: () => void;
    onPrevClick: () => void;
    onDayClick: (day: Date) => () => void;
    onClearClick: () => void;
    hasSelection: boolean;
    renderBody: () => JSX.Element;
};

export type WithCalendarOmittedProps = Pick<BaseCalendarProps, 'hasNext'
    | 'hasPrev'
    | 'title'
    | 'weekDayNames'
    | 'onNextClick'
    | 'onPrevClick'
    | 'onDayClick'
    | 'renderBody'>

export type asd = Omit<BaseCalendarProps, keyof WithCalendarOmittedProps>;

export type WithCalendarAdditionalProps = {
    initialDate?: Date | null;
    styles: Required<CalendarStyles>;
    onDayClick?: (day: Date) => void;
    defineStyle?: (day: Date) => CalendarDayStyle;
} & Partial<Pick<BaseCalendarProps, 'onClearClick' | 'hasSelection'>>

export type WithPickerOmittedProps = Pick<BaseCalendarProps, 'onClearClick'> & Pick<BaseCalendarProps, "hasSelection">;

export type WithTodosOmittedProps = {
    onDayClick?: (day: Date) => void;
}

