export const normalize = (str: string) => str.toLocaleLowerCase().normalize('NFKD').replace(/\s|[\u064B-\u065F]/g, '') 

const strComparator = (strA: string, strB: string) => {
    return normalize(strA) === normalize(strB)
}

export default strComparator