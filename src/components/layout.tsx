import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"
import "./layout.css"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1400,
          padding: `0 1.0875rem 1.45rem`,
        }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "25%" }}>
            <Sidebar />
          </div>
          <main style={{ width: "75%" }}>{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout
