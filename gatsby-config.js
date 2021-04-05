module.exports = {
  pathPrefix: `/developer-docs`,
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "dictyBase Developer Docs",
        description:
          "All documentation related to developing dictyBase software.",
        siteUrl: "https://dictybase-docker.github.io/developer-docs/",
        sections: ["Deployment", "Presentations"],
        navItems: [
          { title: "Deployment", url: "/docs/deployment/" },
          { title: "Presentations", url: "/docs/presentations/" },
        ],
        githubRepositoryURL:
          "https://github.com/dictybase-docker/developer-docs",
      },
    },
  ],
}
