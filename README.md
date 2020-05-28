# dictyBase deployment documentation

Static site to display all deployment documentation for dictyBase software. Built using Gatsby.

## Development

Do any work in a new branch then open a pull request to merge into `develop` when
completed. Any pushes to `develop` will generate a new Gatsby build and deploy to
our [static site](https://dictybase-docker.github.io/developer-docs/). See the
corresponding [GitHub workflow](./.github/workflows/gh-pages.yaml).

### Adding New Pages

To add pages to existing categories, just add a markdown file to that directory and a new page will be with
slugs that match the filename (i.e. `/deployment/admin.md` will create a page at `/deployment/admin/`).
created on the fly.

When creating a new category (i.e. `deployment`), create a new directory under `src/pages`. Copy in the
[index.tsx](./src/pages/deployment/index.tsx) file and change the Layout `category` prop and add
whatever default content you want to display.

### Adding Navbar Links

Add a link name and route to the `menuLinks` array in [gatsby-config.js](./gatsby-config.js). This
config will generate navbar links automatically.

### Styling

It is preferred to use Material-UI for any styling. See examples of the `useStyles` hook in the
[layout.tsx](./src/components/layout.tsx) file.
