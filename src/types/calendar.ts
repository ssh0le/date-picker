import { CSSProperties } from 'react';

export enum CalendarViewType {
  Week,
  Month,
  Year,
}

export enum WeekStartDay {
  Sunday,
  Monday,
}

type ReactCssProperties = Pick<CSSProperties, keyof CSSProperties>;

export type CalendarColors =  ReactCssProperties;

export type CalendarDayStyle = ReactCssProperties;

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
  withTodoDay?: CalendarDayStyle;
  calendar?: CalendarColors;
}

export interface Holiday {
  name: string;
  day: number;
  month: number;
}
