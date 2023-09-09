import { FC } from "react";

import { BaseCalendarProps, WithCalendarAdditionalProps, WithCalendarOmittedProps } from "@/interfaces/decorators";

export interface WithPickerProps {
    Component: FC<Omit<BaseCalendarProps, keyof WithCalendarOmittedProps> &
        WithCalendarAdditionalProps>;
}