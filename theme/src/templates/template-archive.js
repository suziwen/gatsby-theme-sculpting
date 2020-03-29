/** @jsx jsx */
import { jsx, Button} from 'theme-ui'
import React from "react"
import styled from '@emotion/styled'
import PropTypes from "prop-types"
import moment from 'moment'
import { Link, graphql } from "gatsby"
import {Calendar, CalendarControls} from 'react-yearly-calendar'

import CalendarDiv from '../components/calendar-style'
import ContentContainer from '../components/content-container'


class ArchiveTemplate extends React.Component {
  constructor(props) {
    super(props)
    const data = props.data
    const { group } = data.allStoryWriterMarkdown
    const dayInfo = {}
    group.map(({totalCount, fieldValue})=> {
      dayInfo[fieldValue] = totalCount
    })
    this.datePicked = this.datePicked.bind(this)
    this.rangePicked = this.rangePicked.bind(this)
    this.showThisYear = this.showThisYear.bind(this)
    const today = moment()
    this.state = {
      selectedDay: today,
      selectedRange: [today, today],
      dayInfo: dayInfo,
      showAll: true,
    }
  }

  datePicked(date) {
    this.setState({
      selectedDay: date,
      selectedRange: [date, moment(date).add(15, 'day')]
    });
  }

  showThisYear() {
    const today = moment()
    this.setState({
      showAll: true,
      selectedDay: today,
      selectedRange: [today, today]
    })
  }

  rangePicked(start, end) {
    this.setState({
      showAll: false,
      selectedRange: [start, end],
      selectedDay: start
    });
  }

  render() {
    const {pageContext, data} = this.props
    const {selectedRange, selectedDay, showAll, dayInfo} = this.state
    const { year, yearinfo } = pageContext
    const { group } = data.allStoryWriterMarkdown
    const years = Object.keys(yearinfo)
    const today = moment()
    const startDateStr = selectedRange[0].format('YYYYMMDD')
    const endDateStr = selectedRange[1].format('YYYYMMDD')

    return (
      <ContentContainer>
        <h1 sx={{
          display: 'flex',
          }}>
            {years.map((_year)=>{
              const _yearinfo = yearinfo[_year]
              if (_year === year) {
                return (<Button key={_year} onClick={this.showThisYear}>{year}</Button>)
              } else {
                return (<Link key={_year} to={_yearinfo.slug} >{_year}</Link>)
              }
            })
            }
        </h1>
        <CalendarDiv>
          <Calendar 
            year={parseInt(year)}
            selectRange={true}
            selectedRange={selectedRange}
            onPickDate={this.datePicked}
            onPickRange={this.rangePicked}
            customClasses={{"hot":  (day)=> {
              return dayInfo[day.format('YYYYMMDD')] > 0
            }}}
          />
        </CalendarDiv>
        <ul>
          {group.map(({ edges }) => {
            return edges.map(({ node }) => {
              const title = node.title
              const slug = node.slug
              const createDate = node.createYearMonthDay
              if (showAll || (startDateStr <= createDate && endDateStr >= createDate)) {
                return (
                  <li key={slug}>
                    <Link to={slug}>{title}</Link>
                  </li>
                )
              }
            })
          })}
        </ul>
      </ContentContainer>
    )
  }
}


export default ArchiveTemplate

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
