# @richigo/date-picker-lib

This library provides two components for work with calendars.
First, DatePicker allows you to pick single day from calendar. This component also includes Todo list that can add\delete todo for specific day. These todos will be saved in **localStorage**.
Second, RangeDatePicker can pick range between two dates.

## Installation

```
    yarn add @richigo/date-picker-lib
    # or
    npm install @richigo/date-picker-lib
```

## API

Date pickers receive following props:

```ts
//Common props for all pickers
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

//DatePicker
interface DatePickerProps extends PickerProps {
  withTodo?: boolean;
  onSelect?: (day: Date | null) => void;
}

//RangeDatePicker
interface RangeDatePickerProps extends PickerProps {
  onSelect?: (from: Date | null, to: Date | null) => void;
}
```

### minDate and maxDate

These props define range of date within which the calendar will navigate.

### styles

Both components can receive prop **styles**:

```ts
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
  calendar?: CalendarColors;
}
```

This way you can set styles for days and calendar.

Styles for days are consist of some React [CSSProperties](https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.cssproperties.html).
For define day style you have to use object with following properties:

```ts
import { CSSProperties } from 'react';

type ReactCssProperties = Pick<CSSProperties, keyof CSSProperties>;

export type CalendarDayStyle = ReactCssProperties;
```

To style calendar itself you need to pass next object:

```ts
import { CSSProperties } from 'react';

type ReactCssProperties = Pick<CSSProperties, keyof CSSProperties>;

export type CalendarColors = ReactCssProperties;
```

**Warning!** To style selected day in DatePicker, you need to pass styles in _selectionTailDay_.

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
Accept _WeekStartDay_ enum:

```ts
enum WeekStartDay {
  Sunday = 0,
  Monday = 1,
}
```

### viewType

Sets display type of calendar.
Accept _CalendarViewType_ enum:

```ts
enum CalendarViewType {
  Week = 0,
  Month = 1,
  Year = 2,
}
```

### holidays

This prop allows you to set holidays that will be displayed.
Accepts array of _Holiday_'s:

```ts
interface Holiday {
  name: string;
  day: number;
  month: number; // zero-based!
}
```

### onSelect

_onSelect_ event triggers on every date selection.
For _DatePicker_:

```ts
    onSelect?: (day: Date | null) => void
```

For _RangeDatePicker_:

```ts
    onSelect?: (from: Date | null, to: Date | null) => void
```

### withTodo

Add todo list to Picker. This prop is available only for _DatePicker_.

## Demo

[Storybook](https://65019ce0724191e4f55baf61-npduvbicgv.chromatic.com)

Interactive [example](https://ssh0le.github.io/date-picker-demo/) of library usage
