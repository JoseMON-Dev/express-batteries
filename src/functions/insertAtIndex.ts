export function insertAtIndex<T>(
    arr: Array<T | undefined>,
    index: number,
    value: T,
    overwrite = false,
) {
    for (let i = arr.length; i < index; i++) {
        if (arr[i] === undefined) {
            arr[i] = undefined;
        }
    }
    if (overwrite || arr[index] === undefined) {
        arr[index] = value;
    }
}
