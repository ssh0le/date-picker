import { CalendarStyles } from '@/types/calendar';

import { colors } from './colors';

const {
  lightBlue,
  blue,
  hardBlue,
  lightGray,
  gray,
  orange,
  red,
  white,
  black,
} = colors;

const selectedBorderRadius = '8px';
const defaultBorderRadius = '0';

const getLeftBorderRadius = (radius: string) => ({
  borderBottomLeftRadius: radius,
  borderTopLeftRadius: radius,
});

const getRightBorderRadius = (radius: string) => ({
  borderBottomRightRadius: radius,
  borderTopRightRadius: radius,
});

export const defaultStyles: Required<CalendarStyles> = {
  innerDay: {
    color: black,
  },
  outerDay: {
    color: gray,
  },
  selectedDay: {
    color: hardBlue,
    backgroundColor: lightBlue,
    ...getLeftBorderRadius(defaultBorderRadius),
    ...getRightBorderRadius(defaultBorderRadius),
  },
  selectionHeadDay: {
    color: white,
    border: 'none',
    backgroundColor: blue,
    ...getLeftBorderRadius(selectedBorderRadius),
  },
  selectionTailDay: {
    color: white,
    border: 'none',
    backgroundColor: hardBlue,
    ...getRightBorderRadius(selectedBorderRadius),
  },
  today: {
    backgroundColor: lightGray,
    ...getRightBorderRadius(selectedBorderRadius),
    ...getLeftBorderRadius(selectedBorderRadius),
  },
  weekend: {
    color: red,
  },
  holiday: {
    color: orange,
  },
  withTodoDay: {
    borderBottom: '1px solid black',
  },
  calendar: {
    color: black,
    backgroundColor: white,
  },
};
