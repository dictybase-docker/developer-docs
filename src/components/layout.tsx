import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"
import "./layout.css"

const useStyles = makeStyles((theme) => ({
  body: {
    margin: `0 auto`,
    maxWidth: 1400,
    padding: `0 1.0875rem 1.45rem`,
  },
}))

type Props = {
  children: React.ReactNode
  /** Category of topics to display */
  category: string
}

const Layout = ({ children, category }: Props) => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)

  return (
    <div>
      <Header
        siteTitle={data.site.siteMetadata.title}
        menuLinks={data.site.siteMetadata.menuLinks}
      />
      <Grid container className={classes.body}>
        <Grid item xs={3}>
          <Sidebar category={category} />
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </div>
  )
}

export default Layout
