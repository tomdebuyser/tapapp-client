export function removeEmptyKeys<T>(object: T): Partial<T> {
  return Object.keys(object).reduce<Partial<T>>((acc, key: string) => {
    if (object[key]) return { ...acc, [key]: object[key] };
    return acc;
  }, {});
}

export function insertUpdatedData<T extends { id: string }>(currentData: T[], updatedData: T[]): T[] {
  const ids = updatedData.map(value => value.id);
  return [...(currentData || []).filter(value => !ids.includes(value.id)), ...updatedData];
}

export function deepCopy<T>(object: T): T {
  return JSON.parse(JSON.stringify(object)) as T;
}

export function isEmptyObject(object = {}): boolean {
  return Object.keys(object).length === 0;
}
