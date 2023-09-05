import { ElementType } from 'react';

import { CalendarDayStyle } from './calendar';

// export type Decorator<P> = (props: P) => FC;

export interface WithCalendarOmittedProps {
    hasNext: boolean;
    days: Date[];
    title: string;
    weekDayNames: string[];
    hasPrev: boolean;
    onNextClick: () => void;
    onPrevClick: () => void;
}


export type isSelectionFunc = (day: Date, currentDate: Date) => boolean;

export interface WithCalendarAdditionalProps {
    initialDate: Date | null;
}

export type WithPickerOmittedProps = WithCalendarAdditionalProps & Pick<BaseCalendarProps, 'onClearClick' | 'hasSelection'>

export type BaseCalendarProps = WithCalendarOmittedProps & {
    onClearClick: () => void;
    hasSelection: boolean;
    defineStyle?: (day: Date) => CalendarDayStyle;
    renderDay?: (day: Date) => ElementType;
};
