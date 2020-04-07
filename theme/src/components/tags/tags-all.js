/** @jsx jsx */
import { jsx, Button, Flex, Message} from 'theme-ui'
import React from "react"
import { graphql, StaticQuery } from "gatsby"
import {GiThink} from "react-icons/gi"

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
        if (tagStatics.length > 0) {
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
        } else {
          return (
            <Message>
            <GiThink sx={{
              fontSize: '3em',
              verticalAlign: 'middle',
              margin: 3,
            }} />
              <span sx={{mr:3}}>您还没有创建任何标签</span>
            </Message>
          )
        }
      }}
    />
  )
}

export default TagsAll

