/** @jsx jsx */
import { jsx, Button, Flex} from 'theme-ui'
import React from "react"
import { graphql, StaticQuery } from "gatsby"
import lodash from "lodash"

import mergePath from '../../utils/merge-path'
import Link from '../ui-link'


const TagsAll = ({ basePath, tag='' }) => {
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
                <Link key={fieldValue} to={mergePath(basePath, `/tags/${lodash.kebabCase(fieldValue)}`)} sx={{margin: 1}}>
                  <Button variant={tag === fieldValue? 'primary': 'secondary'}>
                    {fieldValue}({totalCount})
                  </Button>
                </Link>
              )
            })}
          </Flex>
        )
      }}
    />
  )
}

export default TagsAll

