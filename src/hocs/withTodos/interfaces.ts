import { FC } from "react";

import { WithCalendarAdditionalProps } from "@/types/decorators";

export interface WithTodoProps {
    Component: FC<Omit<WithCalendarAdditionalProps, 'hasSelection'>>;
}