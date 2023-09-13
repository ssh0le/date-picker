import type { Meta, StoryObj } from '@storybook/react';

import RangeDatePicker from '@/components/RangeDatePicker';
import { CalendarViewType, WeekStartDay } from '@/interfaces/calendar';

import { holidays } from './holidays';

const meta = {
    title: 'Example/RangeDatePicker',
    component: RangeDatePicker,
    tags: ['autodocs'],
} satisfies Meta<typeof RangeDatePicker>;

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
        highlightWeekends: true,
        weekStartDay: WeekStartDay.Sunday,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
    },
};

export const ViewByWeek: Story = {
    args: {
        highlightWeekends: true,
        viewType: CalendarViewType.Week,
        weekStartDay: WeekStartDay.Sunday,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
    },
};

export const Holidays: Story = {
    args: {
        holidays,
        highlightHolidays: true,
        weekStartDay: WeekStartDay.Sunday,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
    },
};

export const HolidaysByMonth: Story = {
    args: {
        holidays,
        highlightWeekends: true,
        highlightHolidays: true,
        weekStartDay: WeekStartDay.Sunday,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
    },
};
