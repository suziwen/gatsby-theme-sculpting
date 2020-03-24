import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"


const Tags = ({ pageContext, location }) => {
  const { allTags = {} } = pageContext
  return (
    <div>
      <h1>所有标签</h1>
      <ul>
        {Object.keys(allTags).map((tag) => {
          const taginfo = allTags[tag]
          return (
            <li key={tag}>
              <Link to={taginfo.slug}>{tag + "(" + taginfo.count + ")"}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/tags">All tags</Link>
    </div>
  )
}
export default Tags


