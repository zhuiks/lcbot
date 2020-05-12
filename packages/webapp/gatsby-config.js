module.exports = {
  pathPrefix: "/lcbot",
  siteMetadata: {
    title: `Lyrics & Chords`,
    description: `Easy to find and share words and chords for worship songs, praises and hymns`,
    url: `https://bayader.tk`,
    author: `BayaderCoders`,
    direction: 'rtl',
    footerHeight: '50px',
    theme: 'dark',
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
        url: process.env.SERVER_URL || "http://localhost:3000/query",
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Easy to find Lyrics and Chords`,
        short_name: `Lyrics&Chords`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}