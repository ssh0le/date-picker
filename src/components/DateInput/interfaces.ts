export interface DateInputProps {
  label: string;
  value: string;
  onChange: (input: string) => void;
  onSubmit: (date: Date) => void;
  maxDate?: Date;
  minDate?: Date;
}

export interface InputContainerProps {
  $isValid: boolean;
}
