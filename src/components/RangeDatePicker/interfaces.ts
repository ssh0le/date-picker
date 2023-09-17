import { PickerProps } from '@/types/pickers';

export interface RangeDatePickerProps extends PickerProps {
  onSelect?: (from: Date | null, to: Date | null) => void;
}
