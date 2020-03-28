import React from "react"
import styled from '@emotion/styled'
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import {Calendar, CalendarControls} from 'react-yearly-calendar'

import CalendarDiv from '../components/calendar-style'




const Tags = ({ pageContext, data, location }) => {
  const { year } = pageContext
  const { group } = data.allStoryWriterMarkdown

  return (
    <div>
      <h1>{year}</h1>
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
    </div>
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
