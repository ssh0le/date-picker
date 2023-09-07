import { CalendarDayStyle } from './calendar';

export type BaseCalendarProps = {
    hasNext: boolean;
    hasPrev: boolean;
    days: Date[];
    title: string | number;
    weekDayNames: string[];
    onNextClick: () => void;
    onPrevClick: () => void;
    onDayClick: (day: Date) => () => void;
    onClearClick: () => void;
    hasSelection: boolean;
    defineStyle: (day: Date) => CalendarDayStyle;
    // renderDay: (day: Date, index: number) => JSX.Element;
    renderBody: () => JSX.Element;
};

export type WithCalendarOmittedProps = Pick<BaseCalendarProps, 'hasNext'
    | 'hasPrev'
    | 'days'
    | 'title'
    | 'weekDayNames'
    | 'onNextClick'
    | 'onPrevClick'
    | 'onDayClick'
    | 'renderBody'
    | 'defineStyle'>



export interface WithCalendarAdditionalProps {
    initialDate: Date | null;
    onDayClick?: (day: Date) => void;
    defineStyle?: (day: Date) => CalendarDayStyle;
}

export type WithPickerOmittedProps = Pick<BaseCalendarProps, 'onClearClick' | 'hasSelection'> & {
    initialDate: Date,
}

export type WithTodosOmittedProps = {
    onDayClick?: (day: Date) => void;
}

