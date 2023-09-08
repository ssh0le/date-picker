import { CalendarStyles } from '@/interfaces/calendar';

const lightBlue = '#2F80ED1A';
const blue = '#2F80ED99';
const hardBlue = '#2F80ED';
const lightGray = '#F1F1F1';
const gray = '#AAAAAA';
const orange = '#f93';
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
        color: 'black',
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
        color: 'white',
        border: 'none',
        backgroundColor: blue,
        ...getLeftBorderRadius(selectedBorderRadius),
    },
    selectionTailDay: {
        color: 'white',
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
        color: 'red',
    },
    holiday: {
        color: orange,
        borderRight: '3px solid ' + orange,
        borderBottom: '3px solid ' + orange,
    },
    withTodoDay: {
        borderBottom: '1px solid black',
    }
};
