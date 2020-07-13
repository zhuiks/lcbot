const { slideHaveChords } = require(`./have-chords`)
const pdfTools = require(`./pdf-tools`)

const generatePdfChords = (song) => {
    const pdf = pdfTools(song.id)
    pdf.title(song.title)

    if (song.slides) {
        song.slides.forEach(slide => {
            if (slideHaveChords(slide)) {
                pdf.chordSlide(slide)
            } else {
                pdf.lyricSlide(slide)
            }
        })
    }
    // pdf.footer(`https://bayader.tk/${song.id}`)
    return pdf.end()
}

module.exports = generatePdfChords