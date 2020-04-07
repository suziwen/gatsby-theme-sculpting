/** @jsx jsx */
import { jsx, Message, Heading, Flex, useThemeUI} from 'theme-ui'
import React from "react"
import {GiThink} from "react-icons/gi"
import Highlighter from "react-highlight-words"
import GridLoader from "react-spinners/GridLoader"
import Link from '../ui-link'
import ContextConsumer from "../context"
import mergePath from '../../utils/merge-path'


const SearchResults = ({ query, results, searching }) => {
  const { theme } = useThemeUI()
  return (
    <ContextConsumer>
      {({pluginOptions: {basePath}})=>{
        if (searching) {
          return (
            <Flex sx={{justifyContent: 'center', my: 4}}>
              <GridLoader color={theme.colors.primary} />
            </Flex>
          )
        }
        return (
        <section>
          {!!results.length && query && (
            <h2>
              总共找到 {results.length} 篇 "{query}" 相关的文章
            </h2>
          )}
          {!results.length && query &&(
            <Message sx={{mt: 3, display: 'flex'}}>
              <GiThink sx={{
                fontSize: '3em',
                verticalAlign: 'middle',
                margin: 3,
              }} />
              <div sx={{flex: 1, mr: 3}}>
                <Heading>没有找到跟 "<strong>{query}</strong>" 相关的文章</Heading>
                <p sx={{mb: 0}}>为了提高查找命中率,可以将多个不同的词语用空格分开.</p>
              </div>
            </Message>
          )}
          {!!results.length && (
            <ol>
              {results.map(({ title, id, slug}) => (
                <li key={slug}>
                  <Link to={mergePath(basePath, slug)}>{title}</Link>
                </li>
              ))}
            </ol>
          )}
        </section>
        )
      }}
    </ContextConsumer>
  )}

export default SearchResults
