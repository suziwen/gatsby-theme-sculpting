/** @jsx jsx */
import { jsx, Button} from 'theme-ui'
import React from "react"
import styled from '@emotion/styled'
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import {Calendar, CalendarControls} from 'react-yearly-calendar'

import CalendarDiv from '../components/calendar-style'
import ContentContainer from '../components/content-container'


const Tags = ({ pageContext, data, location }) => {
  const { year, yearinfo } = pageContext
  const { group } = data.allStoryWriterMarkdown
  const years = Object.keys(yearinfo)

  return (
    <ContentContainer>
      <h1 sx={{
        display: 'flex',
        }}>
          {years.map((_year)=>{
            const _yearinfo = yearinfo[_year]
            if (_year === year) {
              return (<div key={_year}>{year}</div>)
            } else {
              return (<Link key={_year} to={_yearinfo.slug} >{_year}</Link>)
            }
          })
          }
      </h1>
      <CalendarDiv>
      <Calendar year={parseInt(year)}/>
      </CalendarDiv>
      <ul>
        {group.map(({ edges }) => {
          return edges.map(({ node }) => {
            const title = node.title
            const slug = node.slug
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            )
          })
        })}
      </ul>
    </ContentContainer>
  )
}


export default Tags

export const pageQuery = graphql`
  query ($year: Date) {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }

    allStoryWriterMarkdown(
      sort: { fields: [updateDate], order: DESC }
      filter: {createYear: {eq: $year}}
    ) {
      group(field: createYearMonthDay) {
        totalCount
        field
        fieldValue
        edges {
          node {
            title
            slug
            createYearMonthDay
          }
        }
      }
    }
  }
`;
