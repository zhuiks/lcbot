module.exports = {
  pathPrefix: "/lcbot",
  siteMetadata: {
    title: `Lyric & Chords`,
    description: `A starter that includes react-bootstrap and react-icons, along with SASS compilation.`,
    author: `zhuiks`,
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "SongQuery",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "songList",
        // Url to query from
        url: 'https://hz1lib0jqi.execute-api.us-east-1.amazonaws.com/dev/query/',
        // url: "http://localhost:3000/query",
      },
    },
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-react-bootstrap`,
        short_name: `react-bootstrap`,
        start_url: `/`,
        background_color: `#20232a`,
        theme_color: `#20232a`,
        display: `minimal-ui`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}