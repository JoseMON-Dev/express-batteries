// src/functions/insertAtIndex.ts
function insertAtIndex(arr, index, value, overwrite = false) {
  for (let i = arr.length; i < index; i++) {
    if (arr[i] === void 0) {
      arr[i] = void 0;
    }
  }
  if (overwrite || arr[index] === void 0) {
    arr[index] = value;
  }
}

export {
  insertAtIndex
};
