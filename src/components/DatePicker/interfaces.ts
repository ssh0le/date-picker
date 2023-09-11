import { PickerProps } from "@/interfaces/pickers";

export interface DatePickerProps extends PickerProps {
    withTodo?: boolean;
    onSelect?: (day: Date | null) => void
}