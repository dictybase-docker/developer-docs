# dictyBase developer documentation

![GitHub action](https://github.com/dictybase-docker/developer-docs/workflows/GitHub%20Pages%20build/badge.svg)  
[![Technical debt](https://badgen.net/codeclimate/tech-debt/dictybase-docker/developer-docs)](https://codeclimate.com/github/dictybase-docker/developer-docs/trends/technical_debt)
[![Issues](https://badgen.net/codeclimate/issues/dictybase-docker/developer-docs)](https://codeclimate.com/github/dictybase-docker/developer-docs/issues)
[![Maintainability](https://badgen.net/codeclimate/maintainability/dictybase-docker/developer-docs)](https://codeclimate.com/github/dictybase-docker/developer-docs)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=dictybase-docker/developer-docs)](https://dependabot.com)  
![Issues](https://badgen.net/github/issues/dictybase-docker/developer-docs)
![Open Issues](https://badgen.net/github/open-issues/dictybase-docker/developer-docs)
![Closed Issues](https://badgen.net/github/closed-issues/dictybase-docker/developer-docs)
![Total PRS](https://badgen.net/github/prs/dictybase-docker/developer-docs)
![Open PRS](https://badgen.net/github/open-prs/dictybase-docker/developer-docs)
![Closed PRS](https://badgen.net/github/closed-prs/dictybase-docker/developer-docs)
![Merged PRS](https://badgen.net/github/merged-prs/dictybase-docker/developer-docs)  
![Commits](https://badgen.net/github/commits/dictybase-docker/developer-docs/develop)
![Last commit](https://badgen.net/github/last-commit/dictybase-docker/developer-docs/develop)
![Branches](https://badgen.net/github/branches/dictybase-docker/developer-docs)
![Tags](https://badgen.net/github/tags/dictybase-docker/developer-docs)
![GitHub repo size](https://img.shields.io/github/repo-size/dictybase-docker/developer-docs?style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dictybase-docker/developer-docs?style=plastic)
[![Lines of Code](https://badgen.net/codeclimate/loc/dictybase-docker/developer-docs)](https://codeclimate.com/github/dictybase-docker/developer-docs/code)  
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,dictyBase/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9476993)
[![Funding](https://badgen.net/badge/NIGMS/Rex%20L%20Chisholm,DSC/yellow?list=|)](https://projectreporter.nih.gov/project_info_description.cfm?aid=9438930)

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

### Active Developers

<a href="https://sourcerer.io/cybersiddhu"><img src="https://sourcerer.io/assets/avatar/cybersiddhu" height="80px" alt="Sourcerer"></a>
<a href="https://sourcerer.io/wildlifehexagon"><img src="https://sourcerer.io/assets/avatar/wildlifehexagon" height="80px" alt="Sourcerer"></a>
