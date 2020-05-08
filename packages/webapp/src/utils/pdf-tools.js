const PDFDocument = require('pdfkit')
const fs = require('fs')
// const TwitterCldr = require('twitter_cldr').load('ar');

const PDF_OUTPUT_DIR = 'print'
const LINE_CHARS_LIMIT = 25
const H_MARGIN = 150
const LYRICS_VER_OFFSET = 50
const LINE_HEIGHT = 20

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

const pdfTools = (fileName, extraOffset = 0, rtl = true) => {

  const doc = new PDFDocument({
    size: 'A4', //595 × 842 points
    margins: {
      top: 10,
      bottom: 10,
      left: 0,
      right: 0
    }
  })
  const MAX_X = 595
  const verOffset = LYRICS_VER_OFFSET + extraOffset

  if (!fs.existsSync('static')) {
    fs.mkdirSync('static')
  }
  const dir = `static/${PDF_OUTPUT_DIR}`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  const filePath = `${PDF_OUTPUT_DIR}/${fileName}.pdf`
  doc.pipe(fs.createWriteStream(`static/${filePath}`))
  doc.registerFont('Heading', 'fonts/ElMessiri-SemiBold.ttf')
  doc.registerFont('Regular', 'fonts/Harmattan-Regular.ttf')

  doc.translate(0, verOffset)
  doc.rect(H_MARGIN, 0, MAX_X - 2 * H_MARGIN, 800 - verOffset).stroke()

  let x = 0
  let y = 0

  const title = (songTitle) => {
    doc.font('Heading').fontSize(32)
      .text(rightToLeftText(songTitle), 0, 10 - verOffset, { align: 'center' })
  }

  const slideName = (name) => {
    y += LINE_HEIGHT
    doc.font('Regular').fontSize(18).fillColor('#aaa')
      .text(rightToLeftText(name), rtl ? MAX_X - H_MARGIN + 30 : H_MARGIN - 30, y, { align: rtl ? 'left' : 'right' })
  }

  const lyricSlide = (slide) => {
    if (slide.lines) {
      x = 0
      doc.fillColor('#333')
      let lineReducer = '';
      slide.lines.forEach(line => {
        lineReducer += ' ' + line.replace(/\|:|:\|/g, '')
        if (getCharacterLength(lineReducer) > LINE_CHARS_LIMIT) {
          doc.text(rightToLeftText(lineReducer.trim()), x, y, { align: 'center' })
          lineReducer = ''
          y += LINE_HEIGHT
        }
      })
    }
  }

  const chordSlide = (slide) => {
    if (slide.chords) {
      let lineReducer = '';
      slide.chords.forEach(chordsLine => {
        x = rtl ? MAX_X - H_MARGIN : H_MARGIN
        chordsLine.forEach(chord => {
          const text = rightToLeftText(chord.text)
          const options = {
//            continued: true,
            lineWrap: false,
            align: 'left',
          }
          const root = chord.root + (chord.quality === 'm' ? 'm' : '')
          const textWidth = doc.widthOfString(text, options)
          x = x + textWidth * (rtl ? -1 : 1)
          doc.fillColor('#333').text(text, x, y, options)
          const chordWidth = doc.widthOfString(root)
          doc.fillColor('#F33').text(root, x+textWidth-chordWidth/2, y + 2 - LINE_HEIGHT)
        })
        // lineReducer += ' ' + line.replace(/\|:|:\|/g, '')
        // if (getCharacterLength(lineReducer) > LINE_CHARS_LIMIT) {
        //   doc.text(rightToLeftText(lineReducer.trim()), { align: 'center' })
        //   lineReducer = ''
        // }
        y += 2 * LINE_HEIGHT
      })
    }
  }

  const footer = (link) => {
    doc.font('Helvetica').fontSize(12).text(link, 50, 800 - verOffset, {
      link,
      underline: true
    })
  }
  const end = () => {
    doc.end()
    return filePath
  }

  return {
    title,
    slideName,
    lyricSlide,
    chordSlide,
    footer,
    end,
  }
}

module.exports = pdfTools