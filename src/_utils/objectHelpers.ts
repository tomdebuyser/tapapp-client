export const setInObject = (object: {}, path: string, value: string | number | boolean): {} => {
  const keys = path.split('.');
  if (keys.length !== 2) return;
  const newObject = JSON.parse(JSON.stringify(object)); // Create a deep-copy
  newObject[keys[0]][keys[1]] = value;
  return newObject;
};
