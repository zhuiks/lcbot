const path = require(`path`)
const generatePdf = require(`./src/utils/generate-pdf`)
const generatePdfChords = require(`./src/utils/generate-pdf-chords`)
const { haveChords } = require(`./src/utils/have-chords`)
const i18n = require(`./src/utils/i18n`)
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
      query {
        songList {
            songs {
              id
              title
              slides {
                type
                name
                lines
                chords {
                  root
                  quality
                  type
                  bass
                  text
                }        
              }
              links
            }
          }
        }
    `)
 
    data.songList.songs.forEach(song => {
      const pdf = generatePdf(song)
 //      console.log(`haveChords("${song.title}")=${haveChords(song)}`)
      const pdfChords = haveChords(song) ? generatePdfChords(song) : false
      actions.createPage({
        path: song.id,
        component: path.resolve(`./src/components/song.js`),
        context: {
          songId: song.id,
          pdf,
          pdfChords,
        },
      })
    })
  }
  