const pdfTools = require(`./pdf-tools`)

const generatePdf = (song) => {
    const pdf = pdfTools(song.id, false)
    pdf.title(song.title)

    if (song.slides) {
        song.slides.forEach(slide => {
            pdf.lyricSlide(slide)
        })
    }
    // pdf.footer(`https://bayader.tk/${song.id}`)
    return pdf.end()
}

module.exports = generatePdf