import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </div>
    </Layout>
  )
}

const query = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/concept/" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export { query }
export default IndexPage
