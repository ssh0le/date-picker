import { CalendarStyles } from '@/interfaces/calendar';

const lightBlue = '#2F80ED1A';
const blue = '#2F80ED99';
const hardBlue = '#2F80ED';
const borderRadius = '8px';
const lightGray = '#F1F1F1';
const gray = '#AAAAAA';

const leftBorderRadius = {
    borderBottomLeftRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
};

const rightBorderRadius = {
    borderBottomRightRadius: borderRadius,
    borderTopRightRadius: borderRadius,
};

export const defaultStyles: Required<CalendarStyles> = {
    innerDay: {
        color: 'black',
    },
    outerDay: {
        color: gray,
    },
    selectedDay: {
        color: hardBlue,
        backgroundColor: lightBlue,
    },
    selectionHeadDay: {
        color: 'white',
        backgroundColor: blue,
        ...leftBorderRadius,
    },
    selectionTailDay: {
        color: 'white',
        backgroundColor: hardBlue,
        ...rightBorderRadius,
    },
    today: {
        backgroundColor: lightGray,
        ...leftBorderRadius,
        ...rightBorderRadius,
    },
    weekend: {
        color: 'red',
    },
};
