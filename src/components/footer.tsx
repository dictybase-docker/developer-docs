import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  footer: {
    background: `rgb(0, 64, 128)`,
    textAlign: "center",
    margin: `0 auto`,
    padding: `1.45rem 1.0875rem`,
    width: "100%",
  },
  copyright: {
    margin: 0,
    color: "#fff",
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <h5 className={classes.copyright}>
        © {new Date().getFullYear()} dictyBase
      </h5>
    </footer>
  )
}

export default Footer
