import { ElementType } from 'react';

import { CalendarDayStyle } from './calendar';

// export type Decorator<P> = (props: P) => FC;

export interface WithCalendarOmittedProps {
    hasNext: boolean;
    days: Date[];
    title: string;
    weekDayNames: string[];
    defineStyle: (day: Date) => CalendarDayStyle;
    hasPrev: boolean;
    onNextClick: () => void;
    onPrevClick: () => void;
    renderDay?: (day: Date) => ElementType;
}


export type isSelectionFunc = (day: Date, currentDate: Date) => boolean;

export interface WithCalendarAdditionalProps {
    isSelectionHead?: isSelectionFunc;
    isSelectionTail?: isSelectionFunc;
    isSelected?: isSelectionFunc;
    initialDate: Date | null;
    renderDay?: (day: Date) => ElementType;
}

export type WithPickerOmittedProps = Omit<WithCalendarAdditionalProps, 'renderDay'> & Pick<BaseCalendarProps, 'onClearClick' | 'hasSelection'>

export type BaseCalendarProps = WithCalendarOmittedProps & {
    onClearClick: () => void;
    hasSelection: boolean;
};
