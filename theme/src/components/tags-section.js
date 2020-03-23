import React from "react"
import { Link } from "gatsby"
const _ = require(`lodash`)

const TagsSection = ({ tags }) => {
  if (!tags) return null
  const tagLinks = tags.map((tag, i) => {
    const divider = i < tags.length - 1 && <span>{` | `}</span>
    return (
      <span key={tag}>
        <Link to={`/tags/${_.kebabCase(tag.toLowerCase())}`}>{tag}</Link>
        {divider}
      </span>
    )
  })
  return (
    <strong
    >
      Tagged with {tagLinks}
    </strong>
  )
}

export default TagsSection
