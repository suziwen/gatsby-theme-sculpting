import React from "react"
import lodash from "lodash"

import Link from '../ui-link'
import Tag from './tag'
import mergePath from '../../utils/merge-path'

const _ = require(`lodash`)

const TagsSection = ({ tags }) => {
  if (!tags) return null
  const tagLinks = tags.map((tag, i) => {
    const divider = i < tags.length - 1 && <span>{` | `}</span>
    return (
      <span key={tag}>
        <Tag tag={tag}>{tag}</Tag>
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
