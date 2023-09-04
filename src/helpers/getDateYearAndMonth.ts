export const getDestructuredDate = (date: Date): [number, number, number] => {
    return [date.getFullYear(), date.getMonth(), date.getDate()];
};
