import type { Meta, StoryObj } from '@storybook/react';

import Calendar from '@/components/RangeDatePicker';
import { WeekStartDay } from '@/interfaces/calendar';

const meta = {
    title: 'Example/Range',
    component: Calendar,
    tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

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
