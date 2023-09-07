import type { Meta, StoryObj } from '@storybook/react';

import RangeDatePicker from '@/components/RangeDatePicker';
import { CalendarViewType, Holiday, WeekStartDay } from '@/interfaces/calendar';

const meta = {
    title: 'Example/Range',
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


const holidays: Holiday[] = [{name: 'h1', day: 31, month: 11}, {name: 'h2', day: 15, month: 11}]

export const HolidaysByWeek: Story = {
    args: {
        holidays,
        weekStartDay: WeekStartDay.Sunday,
        viewType: CalendarViewType.Week,
        minDate: new Date(2023, 0, 1, 0, 0),
        maxDate: new Date(2024, 0, 0, 0, 0),
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
