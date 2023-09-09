import { FC } from "react";

import { WithCalendarAdditionalProps } from "@/interfaces/decorators";

export interface WithTodoProps {
    Component: FC<Omit<WithCalendarAdditionalProps, 'hasSelection'>>;
}