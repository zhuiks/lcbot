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
  const options = { align: 'center' }
  if (rtl) options.features = ['curs', 'kern']
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
      .text(songTitle, 0, 10 - verOffset, options)
  }

  const slideName = (name) => {
    y += LINE_HEIGHT
    doc.font('Regular').fontSize(18).fillColor('#aaa')
      .text(name, rtl ? MAX_X - H_MARGIN + 30 : H_MARGIN - 30, y, { ...options, align: rtl ? 'left' : 'right' })
  }

  const lyricSlide = (slide) => {
    if (slide.lines) {
      x = 0
      doc.fontSize(18).fillColor('#333')
      let lineReducer = '';
      slide.lines.forEach(line => {
        lineReducer += ' ' + line.replace(/\|:|:\|/g, '')
        if (getCharacterLength(lineReducer) > LINE_CHARS_LIMIT) {
          doc.text(lineReducer.trim(), x, y, {
            align: 'center', features: ['curs'],
          })
          lineReducer = ''
          y += LINE_HEIGHT
        }
      })
    }
  }

  const chordSlide = (slide) => {
    if (slide.chords) {
      slide.chords.forEach(chordsLine => {
        x = rtl ? MAX_X - H_MARGIN : H_MARGIN
        chordsLine.forEach(chord => {
          const tOpt = {
            ...options,
            //            continued: true,
            lineWrap: false,
            align: 'left',
          }
          const textWidth = doc.widthOfString(chord.text, tOpt)

          const cOpt = {
            lineWrap: false,
            align: 'left',
            features: [],
          }
          const root = chord.root + (chord.quality === 'm' ? 'm' : '')
          const chordWidth = doc.widthOfString(root, cOpt)
          const sub = chord.quality && chord.quality !== 'm' ? chord.quality : false
          const sup = chord.type ? chord.type : false
          const chordY = y - LINE_HEIGHT + 2
          doc.fillColor('#F33').text(root, x - chordWidth, chordY, cOpt)
          if (sub) {
            doc.fontSize(12).text(sub, x, chordY + 8, cOpt)
          }
          if (sup) {
            doc.fontSize(12).text(sup, x, chordY-2, cOpt)
          }

          x = x + (rtl ? -1 : 1) * textWidth
          doc.fontSize(18).fillColor('#333').text(chord.text, x, y, tOpt)
        })
        // lineReducer += ' ' + line.replace(/\|:|:\|/g, '')
        // if (getCharacterLength(lineReducer) > LINE_CHARS_LIMIT) {
        //   doc.text(rightToLeftText(lineReducer.trim()), { align: 'center' })
        //   lineReducer = ''
        // }
        y += 2*LINE_HEIGHT
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