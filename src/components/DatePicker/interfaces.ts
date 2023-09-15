import { PickerProps } from "@/types/pickers";

export interface DatePickerProps extends PickerProps {
    withTodo?: boolean;
    onSelect?: (day: Date | null) => void
}