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
}