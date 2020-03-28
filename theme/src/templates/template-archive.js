import React from "react"
import styled from '@emotion/styled'
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import {Calendar, CalendarControls} from 'react-yearly-calendar'


const CalendarDiv = styled.div`
  & table.calendar {
    border-collapse: collapse;
  }

  & table.calendar thead {
    background-color: #5A5A5A;
    color: white;
    margin-bottom: 3px;
    border-bottom: 2px solid white
  }


  & table.calendar thead th {
    font-weight: normal;
    padding: 10px 3px;
  }

  & table.calendar thead th.bolder {
    font-weight: bold;
  }

  & table.calendar tbody {
    font-size: 0.8em;
  }

  & table.calendar td {
    text-align: center;
    padding: 8px;
    cursor: pointer;
    border: 1px solid rgba(185, 185, 185, 0.13);
    background-color: white;
    min-width: 15px;
  }

  & table.calendar tr:last-child td {
    border-bottom: none;
  }

  & table.calendar td.month-name {
    font-weight: bold;
    text-align: left;
    cursor: default;
    border-left: none;
  }

  & table.calendar td.prev-month,
  & table.calendar td.next-month {
    color: transparent;
    cursor: default;
    pointer-events: none;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAABZJREFUCB1jYEADmzdv/o8iRA0BoIEAKngPeSAlnXcAAAAASUVORK5CYII=');
  }

  & table.calendar td.week-separator {
    pointer-events: none;
    padding: 0;
    width: 8px;
    min-width: 0;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAABZJREFUCB1jYEADmzdv/o8iRA0BoIEAKngPeSAlnXcAAAAASUVORK5CYII=');
  }

  & table.calendar td.bolder {
    font-weight: bold;
  }

  /* Single selected day */
  & table.calendar td.selected {
    background-color: orangered;
    color: white;
    font-weight: bold;
  }

  /* Selected range */
  & table.calendar td.range {
    background-color: rgba(255,69,0, 0.7);
    font-weight: bold;
    color: white;
  }

  & table.calendar td.range-left {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    overflow: hidden;
    background: orangered;
  }

  & table.calendar td.range-right {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    overflow: hidden;
    background: orangered;
  }

`

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
