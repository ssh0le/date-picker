export function mergeObjects<T extends object>(object1: T, object2: T) {
    Object.assign(object1, object2);
}