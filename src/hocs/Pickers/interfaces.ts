import { FC } from "react";

import { CalendarDayStyle, CalendarStyles } from "@/interfaces/calendar";

export interface WithPickerProps {
    Component: FC<{ initialDate: Date | null, defineStyle?: (day: Date) => CalendarDayStyle, hasSelection: boolean, onClearClick: () => void }>;
    styles: Required<CalendarStyles>;
}