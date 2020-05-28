import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Post = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout category={post.frontmatter.category}>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
      }
    }
  }
`

export { query }
export default Post
