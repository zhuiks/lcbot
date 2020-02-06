const path = require(`path`)
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
            songs{
              id
              title
              text
              links
            }
          }
        }
    `)
 
    data.songList.songs.forEach(song => {
      actions.createPage({
        path: song.id,
        component: path.resolve(`./src/components/song.js`),
        context: {
          songId: song.id,
        },
      })
    })
  }
  