export const nullToUndefined = (value: any): any => {
  if (Array.isArray(value)) {
      return value.map(nullToUndefined)
  }
  if (value === null) {
      return undefined
  }
  if (typeof value === 'object') {
      return Object.fromEntries(
          Object.entries(value).map(([key, val]) => [key, nullToUndefined(val)])
      );
  }
  return value
}

