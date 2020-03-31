import React from "react"
import Link from '../ui-link'
import mergePath from '../../utils/merge-path'
import lodash from "lodash"

const _ = require(`lodash`)

const TagsSection = ({ tags, basePath }) => {
  if (!tags) return null
  const tagLinks = tags.map((tag, i) => {
    const divider = i < tags.length - 1 && <span>{` | `}</span>
    return (
      <span key={tag}>
        <Link to={mergePath(basePath, `/tags/${lodash.kebabCase(tag)}`)}>{tag}</Link>
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
