import React from "react"
import renderer from "react-test-renderer"
import { useStaticQuery } from "gatsby"
import SongPage from "../song"

beforeEach(() => {
    useStaticQuery.mockReturnValue({
            site: {
                siteMetadata: {
                    title: `Test Song Page`,
                },
            },
        })
})

describe("Song Page", () =>
    it("renders correctly", () => {
        const tree = renderer.create(<SongPage data={mockData} />).toJSON()
        expect(tree).toMatchSnapshot()
    }))

const mockData = {
    "songList": {
        "song": {
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
    }
}