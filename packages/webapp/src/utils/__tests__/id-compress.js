import { idComp, idDecomp } from "../id-compress"

describe("compress-decompress", () => {
  const testIds = [
    "dxeVE",
    "m52p42",
    "ffSoG",
    "OAJ9C",
    "8cduch"
  ]
  it("returns a string", () => {
    const compressed = idComp(testIds)
    expect(typeof compressed).toBe('string')
    expect(idDecomp(compressed)).toEqual(testIds)
  })
})