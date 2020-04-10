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

/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepCopy<T>(inObject: T): T {
  // Return the value if inObject is not an object
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject;
  }

  // Return a copy of the value if inObject is a Date
  if (inObject instanceof Date) {
    return new Date(inObject) as any;
  }

  // Return the value if inObject is a File
  if (inObject instanceof File) {
    return inObject;
  }

  // Create an array or object to hold the values
  const outObject: any = Array.isArray(inObject) ? [] : {};
  for (const key in inObject) {
    const value = inObject[key];
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = typeof value === 'object' && value !== null ? deepCopy(value) : value;
  }

  return outObject;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function isEmptyObject(object: object): boolean {
  if (!object) return true;
  if (Array.isArray(object)) return object.every(isEmptyObject);
  if (typeof object === 'object') return Object.keys(object).every(key => isEmptyObject(object[key]));
  return false;
}
