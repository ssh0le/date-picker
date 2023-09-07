import { FC } from "react";

import { CalendarDayStyle, CalendarStyles } from "@/interfaces/calendar";

export interface WithTodoProps {
    Component: FC<{ onDayClick?: (day: Date) => void, defineStyle?: (day: Date) => CalendarDayStyle }>;
    styles: Required<CalendarStyles>;
}