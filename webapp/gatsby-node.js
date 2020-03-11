const path = require(`path`)
const generatePdf = require(`./src/utils/generate-pdf`)
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
              }
              links
            }
          }
        }
    `)
 
    data.songList.songs.forEach(song => {
      const pdf = generatePdf(song)
      actions.createPage({
        path: song.id,
        component: path.resolve(`./src/components/song.js`),
        context: {
          songId: song.id,
          pdf,
        },
      })
    })
  }
  