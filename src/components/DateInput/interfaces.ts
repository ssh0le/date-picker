export interface DateInputProps {
    label: string;
    value: string;
    onChange: (input: string) => void;
    onSubmit: (date: Date) => void;
}