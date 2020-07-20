const SEPARATOR = '|'

export const idComp = (arrIds) => {
  return arrIds.join(SEPARATOR)
}
export const idDecomp = (str) => {
  return str.split(SEPARATOR)
}

export const getBLink = (arrIds) => {
  return `/s?q=${arrIds.length}&t=${idComp(arrIds)}`
}