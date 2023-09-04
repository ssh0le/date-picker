import { CSSProperties } from 'react';

export enum CalendarViewType {
    Week,
    Month,
}

export enum WeekStartDay {
    Sunday,
    Monday,
}

type DayCssProperties =
    | 'color'
    | 'backgroundColor'
    | 'border'
    | 'borderTop'
    | 'borderBottom'
    | 'borderLeft'
    | 'borderRight'
    | 'borderRadius'
    | 'borderTopLeftRadius'
    | 'borderTopRightRadius'
    | 'borderBottomLeftRadius'
    | 'borderBottomRightRadius';

export type CalendarDayStyle = Pick<CSSProperties, DayCssProperties>;

export interface CalendarStyles {
    [key: string]: CalendarDayStyle | undefined;
    innerDay?: CalendarDayStyle;
    outerDay?: CalendarDayStyle;
    selectedDay?: CalendarDayStyle;
    selectionTailDay?: CalendarDayStyle;
    selectionHeadDay?: CalendarDayStyle;
    today?: CalendarDayStyle;
    weekend?: CalendarDayStyle;
    holiday?: CalendarDayStyle;
}

export interface Holiday {
    name: string,
    day: number,
    month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11,
}