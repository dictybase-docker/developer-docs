import React from "react"
import { Link } from "gatsby"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: `rgb(0, 64, 128)`,
    marginBottom: `1.45rem`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    paddingRight: "10px",
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "#fff",
  },
}))

type Props = {
  siteTitle: string
  menuLinks: Array<{
    name: string
    link: string
  }>
}

const Header = ({ siteTitle, menuLinks }: Props) => {
  const classes = useStyles()

  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Toolbar variant="regular" className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.toolbarTitle}>
          <Link to="/" className={classes.link}>
            {siteTitle}
          </Link>
        </Typography>
        <nav>
          {menuLinks.map((item) => (
            <Link to={item.link} className={classes.link} key={item.name}>
              {item.name}
            </Link>
          ))}
        </nav>
      </Toolbar>
    </AppBar>
  )
}

export default Header
