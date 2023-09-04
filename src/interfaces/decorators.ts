// import { FC } from 'react';

import { CalendarDayStyle } from './calendar';

// export type Decorator<P> = (props: P) => FC;

export interface CalendarDecorativeProps {
    hasNext: boolean;
    days: Date[];
    title: string;
    weekDayNames: string[];
    defineStyle: (day: Date) => CalendarDayStyle;
    hasPrev: boolean;
    onNextClick: () => void;
    onPrevClick: () => void;
}

export type BaseCalendarProps = CalendarDecorativeProps & {
    onClearClick: () => void;
    hasSelection: boolean;
};
