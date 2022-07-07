const lastIndexPosition = (string, aIndex, bIndex) => string.length > 1 ? Math.max(string.lastIndexOf(aIndex), string.lastIndexOf(bIndex)) : -1;
