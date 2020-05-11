import generatePdfChords from "../generate-pdf-chords"

describe("Generate PDF Chords", () => {
    it("returns file name with songId_chords", () => {
        const pdf = generatePdfChords(mockData)
        expect(pdf).toEqual('print/test-id_chords.pdf')
    })
})
const ZWJ = '\u200D'
const mockData = {
    "id": "test-id",
    "title": "جايين يا أبانا",
    "slides": [
        {
            "type": "VERSE",
            "name": "1",
            "lines": [
                "جايين يا أبانا",
                "اسمع لدعانا",
                "بتواضع يرجع شعبك",
                "يطلب رحمة من عندك",
                "بقلوب محتاجه إليك"
            ],
            "chords": [
                [
                    { "text": "جايين ", "root": "C♯", },
                    { "text": "يا أبانا", "root": "A♯", "quality": "m", "type": "7"},
                ],
                [
                    { "text": "اسمع ل"+ZWJ, "root": "_", },
                    { "text": ZWJ+"دعانا", "root": "G♭", },
                ],
                [
                    { "text": "بتواضع يرجع ش"+ZWJ, "root": "C", "quality": "dim", "type": "sus"},
                    { "text": ZWJ+"عبك", "root": "E", },
                ],
            ]
        },
        {
            "type": "CHORUS",
            "name": "القرار",
            "lines": [
                "ده رجانا فيك يا إلهنا",
                "وهنستنى المواعيد",
                "نحوك نرفع أعيننا",
                "وايمانا فيك بيزيد",
                "بنصدق كل وعودك دا",
                "انت في الوعد أمين",
                "تملا حياتنا من جودك",
                "مجداً ليك يا معين"
            ]
        },
    ],
    "links": ["https://www.youtube.com/watch?v=hFm0enk-qfM"]
}
