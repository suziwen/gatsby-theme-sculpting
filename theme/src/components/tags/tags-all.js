/** @jsx jsx */
import { jsx, Button, Flex} from 'theme-ui'
import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Tag from './tag'


const TagsAll = ({ tag='' }) => {
  return (
    <StaticQuery
      query={graphql`
        query tagStatics {
          allStoryWriterMarkdown {
            group(field: tags) {
              totalCount
              fieldValue
            }
          }
        }
      `}
      render={({ allStoryWriterMarkdown: {group} }) => {
        const  tagStatics = group
        return (
          <Flex sx={{flexWrap: 'wrap', justifyContent: 'center'}}>
            {tagStatics.map(({fieldValue, totalCount}) => {
              return (
                <Tag key={fieldValue} tag={fieldValue} sx={{margin: 1}}>
                  <Button variant={tag === fieldValue? 'primary': 'secondary'}>
                    {fieldValue}({totalCount})
                  </Button>
                </Tag>
              )
            })}
          </Flex>
        )
      }}
    />
  )
}

export default TagsAll

