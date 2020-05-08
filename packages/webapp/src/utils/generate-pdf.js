const pdfTools = require(`./pdf-tools`)

const generatePdf = (song) => {
    const pdf = pdfTools(song.id, 20)
    pdf.title(song.title)

    if (song.slides) {
        song.slides.forEach(slide => {
            if (slide.name) {
                pdf.slideName(slide.name)
            }
            pdf.lyricSlide(slide)
        })
    }
    pdf.footer(`https://bayader.tk/${song.id}`)
    return pdf.end()
}

module.exports = generatePdf