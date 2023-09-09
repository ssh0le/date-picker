import { DatePicker } from '@richigo/date-picker-lib';
import type { Meta, StoryObj } from '@storybook/react';

import { CalendarViewType, Holiday, WeekStartDay } from '@/interfaces/calendar';


const meta = {
    title: 'Example/Calendar',
    component: DatePicker,
    tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monday: Story = {
    args: {
        weekStartDay: WeekStartDay.Monday,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
    },
};

export const Sunday: Story = {
    args: {
        weekStartDay: WeekStartDay.Sunday,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
    },
};

export const Weekends: Story = {
    args: {
        weekStartDay: WeekStartDay.Sunday,
        highlightWeekends: true,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
    },
};

export const ViewByWeek: Story = {
    args: {
        weekStartDay: WeekStartDay.Sunday,
        viewType: CalendarViewType.Week,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
    },
};

const holidays: Holiday[] = [{name: 'h0', day: 1, month: 0}, {name: 'h1', day: 31, month: 11}, {name: 'h2', day: 15, month: 11}]

export const HolidaysByYear: Story = {
    args: {
        holidays,
        weekStartDay: WeekStartDay.Sunday,
        viewType: CalendarViewType.Year,
        minDate: new Date(2022, 7, 1, 0, 0),
        maxDate: new Date(2025, 4, 0, 0, 0),
    },
};

export const HolidaysByMonth: Story = {
    args: {
        holidays,
        highlightWeekends: true,
        weekStartDay: WeekStartDay.Sunday,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
    },
};
