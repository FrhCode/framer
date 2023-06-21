const swapElements = <T>(arr: T[], index1: number, index2: number): T[] => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  return arr;
};
