import React from "react"

const Footer = () => (
  <header
    style={{
      background: `rgb(0, 64, 128)`,
      marginBottom: `1.45rem`,
    }}>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}>
      <h5 style={{ margin: 0, color: "#fff" }}>
        © {new Date().getFullYear()} dictyBase
      </h5>
    </div>
  </header>
)

export default Footer
