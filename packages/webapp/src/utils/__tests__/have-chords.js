import { haveChords, slideHaveChords }from "../have-chords"
import { ChordSlide } from "@bit/zhuiks.lcbot.core.chords"

describe("haveChords", () => {
    it("checks a song with no chords", () => {
        expect(haveChords(mockData)).toEqual(false)
    })

    it("checks a song with empty chords", () => {
        const chordSlides = mockData.slides.map(slide => new ChordSlide(slide))
        const song = {
            ...mockData,
            slides: chordSlides,
        }
        expect(haveChords(song)).toEqual(false)
    })

    it("checks a slide for chords", () => {
        const chordSlide = new ChordSlide(mockData.slides[0])
        chordSlide.chords[1] = [
            { root: '_', text: 'اسمع' },
            { root: 'C', text: ' لدعانا' }
        ]
        const res = chordSlide.chords && chordSlide.chords.find((chordsLine) => (
            chordsLine.length && (chordsLine.length > 1 || chordsLine[0].root !== "_")
          )) !== undefined
        expect(slideHaveChords(chordSlide)).toEqual(true)  
      
    })

    it("checks a song with chords", () => {
        const chordSlide = new ChordSlide(mockData.slides[0])
        chordSlide.chords[1] = [
            { root: '_', text: 'اسمع' },
            { root: 'C', text: ' لدعانا' }
        ]
        const song = {
            ...mockData,
            slides: [
                chordSlide,
                ...mockData.slides.slice(1)
            ],
        }
        expect(haveChords(song)).toEqual(true)

        const chordSlide2 = new ChordSlide(mockData.slides[0])
        chordSlide2.chords[1] = [
            { root: 'C', text: 'اسمع لدعانا' }
        ]
        const song2 = {
            ...mockData,
            slides: [
                chordSlide2,
                ...mockData.slides.slice(1)
            ],
        }
        expect(haveChords(song2)).toEqual(true)
    })
})

const mockData = {
    "id": "test-id",
    "title": "جايين يا أبانا",
    "slides": [
        {
            "type": "VERSE",
            "name": "1",
            "lines": [
                "|:جايين يا أبانا",
                "اسمع لدعانا",
                "بتواضع يرجع شعبك",
                "يطلب رحمة من عندك",
                "بقلوب محتاجه إليك:|"
            ]
        },
        {
            "type": "CHORUS",
            "name": "القرار",
            "lines": [
                "|:ده رجانا فيك يا إلهنا",
                "وهنستنى المواعيد",
                "نحوك نرفع أعيننا",
                "وايمانا فيك بيزيد",
                "بنصدق كل وعودك دا",
                "انت في الوعد أمين",
                "تملا حياتنا من جودك",
                "مجداً ليك يا معين:|"
            ]
        },
        {
            "type": "VERSE",
            "name": "2",
            "lines": [
                "|:أرضنا عطشانة",
                "بجروح مليانة",
                "من فيض حبك ترويها",
                "لمسة إيدك تشفيها",
                "وتردها تاني إليك:|"
            ]
        },
        {
            "type": "VERSE",
            "name": "3",
            "lines": [
                "|:بنتوب قدامك",
                "بنعود لحنانك",
                "نعلن ملكك في حياتنا",
                "في بيوتنا وإجتماعاتنا",
                "وقلوبنا تسجد ليك:|"
            ]
        }
    ],
    "links": ["https://www.youtube.com/watch?v=hFm0enk-qfM"]
}
