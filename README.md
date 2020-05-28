# dictyBase deployment documentation

Static site to display all deployment documentation for dictyBase software. Built using Gatsby.

## Development

Do any work in a new branch then open a pull request to merge into `develop` when
completed. Any pushes to `develop` will generate a new Gatsby build and deploy to
our [static site](https://dictybase-docker.github.io/developer-docs/). See the
corresponding [GitHub workflow](./.github/workflows/gh-pages.yaml).

### Adding New Pages

Add any Markdown files to the `src/pages` folder. New pages will be generated on the fly with
slugs that match the filename (i.e. `admin.md` will create a page at `/admin/`). At the moment,
this will automatically add links to these pages in the sidebar as well.

### Adding Navbar Links

Add a link name and route to the `menuLinks` array in [gatsby-config.js](./gatsby-config.js). This
config will generate navbar links automatically.

### Styling

It is preferred to use Material-UI for any styling. See examples of the `useStyles` hook in the
[layout.tsx](./src/components/layout.tsx) file.
