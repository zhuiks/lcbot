const SEPARATOR = '|'

export const idComp = (arrIds) => {
  return arrIds.join(SEPARATOR)
}
export const idDecomp = (str) => {
  return str.split(SEPARATOR)
}

