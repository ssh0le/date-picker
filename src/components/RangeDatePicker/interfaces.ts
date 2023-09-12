import { PickerProps } from "@/interfaces/pickers";

export interface RangeDatePickerProps extends PickerProps {
    onSelect?: (from: Date | null, to: Date | null) => void;
}