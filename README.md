# dictyBase developer documentation
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![GitHub action](https://github.com/dictybase-docker/developer-docs/workflows/GitHub%20Pages%20build/badge.svg)
[![Maintainability](https://badgen.net/codeclimate/maintainability/dictybase-docker/developer-docs)](https://codeclimate.com/github/dictybase-docker/developer-docs)  
![Last commit](https://badgen.net/github/last-commit/dictybase-docker/developer-docs/develop)   
[![Funding](https://badgen.net/badge/Funding/Rex%20L%20Chisholm,dictyBase,DCR/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=10024726&icde=0)


Static site to display all deployment documentation for dictyBase software. Built using Gatsby.

## Development

Run `gatsby develop` to start the developmental server.

Do any work in a new branch then open a pull request to merge into `develop` when
completed. Any pushes to `develop` will generate a new Gatsby build and deploy to
our [static site](https://dictybase-docker.github.io/developer-docs/). See the
corresponding [GitHub workflow](./.github/workflows/gh-pages.yaml).

### Adding New Pages

To add pages to existing categories, just add a markdown file to that directory and a new page will be with
slugs that match the filename (i.e. `/deployment/admin.md` will create a page at `/deployment/admin/`).
created on the fly. Remember to add the required header so that the page is displayed.

When creating a new category (i.e. `deployment`), create a new directory under `src/pages`. Copy in the
[index.tsx](./src/pages/deployment/index.tsx) file and change the Layout `category` prop and add
whatever default content you want to display.

### Adding Navbar Links

Add a link name and route to the `menuLinks` array in [gatsby-config.js](./gatsby-config.js). This
config will generate navbar links automatically.

### Styling

It is preferred to use Material-UI for any styling. See examples of the `useStyles` hook in the
[layout.tsx](./src/components/layout.tsx) file.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.erichartline.net/"><img src="https://avatars3.githubusercontent.com/u/13489381?v=4" width="100px;" alt=""/><br /><sub><b>Eric Hartline</b></sub></a><br /><a href="https://github.com/dictybase-docker/developer-docs/commits?author=wildlifehexagon" title="Code">💻</a> <a href="https://github.com/dictybase-docker/developer-docs/issues?q=author%3Awildlifehexagon" title="Bug reports">🐛</a> <a href="#content-wildlifehexagon" title="Content">🖋</a> <a href="https://github.com/dictybase-docker/developer-docs/commits?author=wildlifehexagon" title="Documentation">📖</a> <a href="#design-wildlifehexagon" title="Design">🎨</a> <a href="#maintenance-wildlifehexagon" title="Maintenance">🚧</a> <a href="https://github.com/dictybase-docker/developer-docs/commits?author=wildlifehexagon" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://cybersiddhu.github.com/"><img src="https://avatars3.githubusercontent.com/u/48740?v=4" width="100px;" alt=""/><br /><sub><b>Siddhartha Basu</b></sub></a><br /><a href="https://github.com/dictybase-docker/developer-docs/commits?author=cybersiddhu" title="Documentation">📖</a> <a href="#content-cybersiddhu" title="Content">🖋</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


# Misc badges
![Issues](https://badgen.net/github/issues/dictybase-docker/developer-docs)
![Open Issues](https://badgen.net/github/open-issues/dictybase-docker/developer-docs)
![Closed Issues](https://badgen.net/github/closed-issues/dictybase-docker/developer-docs)   
![Total PRS](https://badgen.net/github/prs/dictybase-docker/developer-docs)
![Open PRS](https://badgen.net/github/open-prs/dictybase-docker/developer-docs)
![Closed PRS](https://badgen.net/github/closed-prs/dictybase-docker/developer-docs)
![Merged PRS](https://badgen.net/github/merged-prs/dictybase-docker/developer-docs)     
![Commits](https://badgen.net/github/commits/dictybase-docker/developer-docs/develop)
![Branches](https://badgen.net/github/branches/dictybase-docker/developer-docs)
![Tags](https://badgen.net/github/tags/dictybase-docker/developer-docs)   
![GitHub repo size](https://img.shields.io/github/repo-size/dictybase-docker/developer-docs?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictybase-docker/developer-docs?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictybase-docker/developer-docs)](https://codeclimate.com/github/dictybase-docker/developer-docs/code)  