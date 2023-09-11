# @richigo/date-picker-lib

This library provides two components for work with calendars. 
First, DatePicker allows you to pick single day from calendar. This component also includes Todo list that can add\delete todo for specific day. These todos will be saved in **localStorage**.
Second, RangeDatePicker can pick range between two dates.

## Installation

```
    yarn add datepicker-pl1fert
    # or
    npm install datepicker-pl1fert
```

## API

Date pickers receive following props:
```
interface PickerProps {
    minDate?: Date;
    maxDate?: Date;
    styles?: CalendarStyles;
    highlightWeekends?: boolean;
    highlightHolidays?: boolean;
    weekStartDay?: WeekStartDay;
    initialDate?: Date;
    viewType?: CalendarViewType;
    holidays?: Holiday[];
}
```

### minDate and maxDate

These props define range of date within which the calendar will navigate.

### styles

Both components can receive prop **styles**:
```
interface CalendarStyles {
    // for days that are included in the current month
    innerDay?: CalendarDayStyle;
    // for days that are not included in the current month
    outerDay?: CalendarDayStyle;
    // for day that is picked as start of selection range
    selectionHeadDay?: CalendarDayStyle;
    // for day that is picked as start of selection range
    selectionTailDay?: CalendarDayStyle;
    // for days that are inside of selection range (only for RangeDatePciker)
    selectedDay?: CalendarDayStyle;
    //style for today
    today?: CalendarDayStyle;
    //style for weekend
    weekend?: CalendarDayStyle;
    //style for holiday
    holiday?: CalendarDayStyle;
    //style for day that has todos
    withTodoDay?: CalendarDayStyle;
    //style for calendar
    calendar: CalendarColors;
}
```
This way you can set styles for days and calendar.

Styles for days are consist of some React [CSSProperties](https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.cssproperties.html).
For define day style you have to use object with following properties:
```
    import { CSSProperties } from 'react';

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
```

To style calendar itself you need to pass next object:
```
    import { CSSProperties } from 'react';
    
    export type CalendarColors = Pick<CSSProperties, "color" | "backgroundColor">;
```
**Warning!** To style selected day in DatePicker, you need to pass styles in *selectionTailDay*.

It worth noting, that each style has own precedence, and will rewrite previous style rules in following order (from lowest to highest priority):
```
    innerDay < today < weekend < outerDay < holiday < selectedDay < selectionHeadDay < selectionTailDay < withTodoDay
```

### highlightWeekends
This prop is for show or hide weekend styles display.
 
### highlightHolidays
Same as highlightWeekends but for holidays.

### initialDate
This prop is used for setting start date of your calendar.

### weekStartDay
Sets start date of the week.
Accept *WeekStartDay* enum:
```
    enum WeekStartDay {
        Sunday = 0,
        Monday = 1
    }
```

### viewType
Sets display type of calendar.
Accept *CalendarViewType* enum:
```
    enum CalendarViewType {
        Week = 0,
        Month = 1,
        Year = 2
    }
```
### viewType
This prop allows you to set holidays that will be displayed.
Accepts array of *Holiday*:
```
interface Holiday {
    name: string;
    day: number;
    month: number; // zero-based!
}
```