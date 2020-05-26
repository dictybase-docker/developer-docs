module.exports = {
  siteMetadata: {
    title: `dictyBase Deployment Documentation`,
    description: `All documentation related to deploying dictyBase software.`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dictybase-deployment`,
        short_name: `deploy`,
        start_url: `/`,
        background_color: `rgb(0, 64, 128)`,
        theme_color: `rgb(0, 64, 128)`,
        display: `minimal-ui`,
        // icon: `src/images/dicty-logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
