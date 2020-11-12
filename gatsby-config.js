module.exports = {
  plugins: [
    {
      resolve: 'smooth-doc',
      options: {
        name: 'dictyBase Developer Docs',
        description: 'All documentation related to developing dictyBase software.',
        siteUrl: 'https://dictybase-docker.github.io/developer-docs/',
        sections: ['Deployment'],
        navItems: [{ title: 'Deployment', url: '/docs/deployment/' }],
        githubRepositoryURL: 'https://github.com/dictybase-docker/developer-docs',
      },
    },
  ],
}
