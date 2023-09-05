import { FC } from "react";

import { CalendarStyles } from "@/interfaces/calendar";
import { BaseCalendarProps, WithCalendarAdditionalProps, WithCalendarOmittedProps } from "@/interfaces/decorators";

export interface WithPickerProps {
    Component: FC<Omit<BaseCalendarProps, keyof WithCalendarOmittedProps> & WithCalendarAdditionalProps>;
    styles: Required<CalendarStyles>;
}