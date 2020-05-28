import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

type Props = {
  /** Category of topics to display */
  category: string
}

const Sidebar = ({ category }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
        edges {
          node {
            id
            frontmatter {
              title
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <div>
      <h4>Topics</h4>
      {data.allMarkdownRemark.edges
        .filter(({ node }) => node.frontmatter.category === category)
        .map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default Sidebar
