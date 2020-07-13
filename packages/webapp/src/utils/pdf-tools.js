const PDFDocument = require('pdfkit')
const fs = require('fs')
// const TwitterCldr = require('twitter_cldr').load('ar');

const FRONTPAGE_LINK = 'https://bayader.tk'
const PDF_OUTPUT_DIR = 'print'
const LINE_CHARS_LIMIT = 25
const H_MARGIN = 150
const LYRICS_VER_OFFSET = 50
const LINE_HEIGHT = 20
const EXTRA_OFFSET = 20

// const isArabic = (text) => text.search(/[\u0600-\u06FF]/) >= 0

// const rightToLeftText = (text) => {
//   if (isArabic(text)) {
//     return text.split(' ').reverse().join(' ') + ' '
//   } else {
//     return text;
//   }
// }

const getCharacterLength = (str) => {
  // The string iterator that is used here iterates over characters,
  //  not mere code units
  return [...str].length;
}

const pdfTools = (songId, withChords = true, rtl = true) => {

  const doc = new PDFDocument({
    size: 'A4', //595 × 842 points
    margins: {
      top: 10,
      bottom: 10,
      left: 0,
      right: 0
    },
    autoFirstPage: false
  })
  const MAX_X = 595
  const verOffset = LYRICS_VER_OFFSET + (withChords ? 0 : EXTRA_OFFSET)
  const options = { align: 'center' }
  if (rtl) options.features = ['curs', 'kern']
  if (!fs.existsSync('static')) {
    fs.mkdirSync('static')
  }
  const dir = `static/${PDF_OUTPUT_DIR}`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  const songLink = FRONTPAGE_LINK + '/' + songId
  const fileName = songId + (withChords ? '_chords' : '')
  const filePath = `${PDF_OUTPUT_DIR}/${fileName}.pdf`
  doc.pipe(fs.createWriteStream(`static/${filePath}`))
  doc.registerFont('Heading', 'fonts/ElMessiri-SemiBold.ttf')
  doc.registerFont('Regular', 'fonts/Harmattan-Regular.ttf')
  doc.registerFont('Chords', 'fonts/NotoSansSymbols-Regular.ttf')

  doc.on('pageAdded', () => doc.font('Helvetica').fontSize(12).text(songLink, 50, 800 - verOffset, {
    songLink,
    underline: true
  })
  )
  doc.addPage()
  doc.translate(0, verOffset)
  //doc.rect(H_MARGIN, 0, MAX_X - 2 * H_MARGIN, 800 - verOffset).stroke()

  let x = 0
  let y = 0

  const title = (songTitle) => {
    doc.font('Heading').fontSize(32)
      .text(songTitle, 0, 10 - verOffset, options)
  }

  const slideName = (slide) => {
    if (slide.name) {
      y += LINE_HEIGHT
      doc.font('Regular').fontSize(18).fillColor('#aaa')
        .text(slide.name, rtl ? MAX_X - H_MARGIN + 30 : H_MARGIN - 30, y, { ...options, align: rtl ? 'left' : 'right' })
    }
  }

  const lyricSlide = (slide) => {
    if (slide.lines) {
      if (y + slide.lines.length * LINE_HEIGHT > 820) {
        doc.addPage()
        y = EXTRA_OFFSET
      }
      slideName(slide)
      x = 0
      doc.font('Regular').fontSize(18).fillColor('#333')
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
      if (y + slide.chords.length * 2 * LINE_HEIGHT > 820) {
        doc.addPage()
        y = EXTRA_OFFSET + LINE_HEIGHT
      }
      slideName(slide)
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
          const sub = chord.quality && chord.quality !== 'm' ? chord.quality : false
          const sup = chord.type ? chord.type : false
          const chordY = y - LINE_HEIGHT
          if (root && root !== '_') {
            doc.font('Chords').fontSize(14).fillColor('#F33')
            const chordWidth = doc.widthOfString(root, cOpt)
            doc.text(root, x - chordWidth, chordY, cOpt)
            if (sub) {
              doc.fontSize(8).text(sub, x, chordY + 10, cOpt)
            }
            if (sup) {
              doc.fontSize(8).text(sup, x, chordY + 2, cOpt)
            }
          }
          x = x + (rtl ? -1 : 1) * textWidth
          doc.font('Regular').fontSize(18).fillColor('#333').text(chord.text, x, y, tOpt)
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

  const end = () => {
    doc.end()
    return filePath
  }

  return {
    title,
    lyricSlide,
    chordSlide,
    end,
  }
}

module.exports = pdfTools