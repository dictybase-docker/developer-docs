import React from "react"

const Footer = () => (
  <footer
    style={{
      background: `rgb(0, 64, 128)`,
      textAlign: "center",
    }}>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}>
      <h5
        style={{
          margin: 0,
          color: "#fff",
        }}>
        © {new Date().getFullYear()} dictyBase
      </h5>
    </div>
  </footer>
)

export default Footer
