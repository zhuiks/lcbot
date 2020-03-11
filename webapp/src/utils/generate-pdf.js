const PDFDocument = require('pdfkit')
const fs = require('fs')
// const TwitterCldr = require('twitter_cldr').load('ar');

const isArabic = (text) => text.search(/[\u0600-\u06FF]/) >= 0

const rightToLeftText = (text) => {
    if (isArabic(text)) {
        return text.split(' ').reverse().join(' ') + ' '
    } else {
        return text;
    }
}

const getCharacterLength = (str) => {
    // The string iterator that is used here iterates over characters,
    //  not mere code units
    return [...str].length;
}

const generatePdf = (song) => {
    const doc = new PDFDocument({
        size: 'A4', //595 × 842 points
        margins: {
            top: 50,
            bottom: 30,
            left: 100,
            right: 100
        }
    })
    const fileName = `print/${song.id}.pdf`
    doc.pipe(fs.createWriteStream(`static/${fileName}`))
    doc.registerFont('Heading', 'fonts/ElMessiri-SemiBold.ttf')
    doc.registerFont('Regular', 'fonts/Harmattan-Regular.ttf')

    doc.font('Heading').fontSize(32)
        .text(rightToLeftText(song.title), { align: 'center' })
    doc.font('Regular').fontSize(18).moveDown()
    song.slides.forEach(slide => {
        doc.moveDown().fillColor('#aaa')
            .text(rightToLeftText(slide.name), { align: 'right' })
            .moveUp().fillColor('#333')
        if (slide.lines) {
            let lineReducer = '';
            slide.lines.forEach(line => {
                lineReducer += ' ' + line.replace(/\|:|:\|/g, '')
                if(getCharacterLength(lineReducer) > 25) {
                    doc.text(rightToLeftText(lineReducer.trim()), { align: 'center' })
                    lineReducer = ''
                }
            })
        }
    })
    const link = `https://bayader.tk/${song.id}`
    doc.font('Helvetica').fontSize(12).text(link, 50, 790, {
        link,
        underline: true
    })
    doc.end()
    return fileName
}

module.exports = generatePdf