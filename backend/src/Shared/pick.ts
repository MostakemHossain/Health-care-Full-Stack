const pick = <T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: K[]
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (object && Object.hasOwnProperty.call(object, key)) {
      finalObj[key] = object[key];
    }
  }
  return finalObj;
};
export default pick;
