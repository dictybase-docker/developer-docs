module.exports = {
  siteMetadata: {
    title: `dictyBase Developer Docs`,
    description: `All documentation related to developing dictyBase software.`,
    menuLinks: [
      {
        name: "Deployment",
        link: "/deployment",
      },
    ],
  },
  pathPrefix: `/developer-docs`,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src/pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              wrapperStyle: "margin-left: 25px;",
            },
          },
          {
            resolve: "gatsby-remark-code-buttons",
            options: {
              tooltipText: `Copy`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dictybase-dev-docs`,
        short_name: `dev-docs`,
        start_url: `/`,
        background_color: `rgb(0, 64, 128)`,
        theme_color: `rgb(0, 64, 128)`,
        display: `minimal-ui`,
        // icon: `src/images/dicty-logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-material-ui`,
    'gatsby-remark-table-of-contents',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
