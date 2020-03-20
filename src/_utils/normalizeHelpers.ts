export const normalizeDate = (value: string): string => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 2) return onlyNums;
  if (onlyNums.length <= 4) return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;
  return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
};

export const normalizeTime = (value: string) => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 2) return onlyNums;
  return `${onlyNums.slice(0, 2)}:${onlyNums.slice(2, 4)}`;
};
