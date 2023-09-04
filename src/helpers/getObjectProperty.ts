export const getObjectProperty = <T>(icons: object, key: string): T | null => {
    if (key in icons) {
        return icons[key as keyof typeof icons] as T;
    } else {
        return null;
    }
};
