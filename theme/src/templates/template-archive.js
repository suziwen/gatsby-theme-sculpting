/** @jsx jsx */
import { jsx, Flex, Button, Message} from 'theme-ui'
import React from "react"
import moment from 'moment'
import { graphql } from "gatsby"
import {Calendar} from 'react-yearly-calendar'

import CalendarDiv from '../components/calendar-style'
import ContentContainer from '../components/content-container'
import Link from '../components/ui-link'
import mergePath from '../utils/merge-path'


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
    const { year, yearinfo, basePath } = pageContext
    const { group } = data.allStoryWriterMarkdown
    const years = Object.keys(yearinfo)
    const today = moment()
    const startDateStr = selectedRange[0].format('YYYYMMDD')
    const endDateStr = selectedRange[1].format('YYYYMMDD')

    return (
      <ContentContainer>
        <Flex sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: 3,
        }}>
            {years.map((_year)=>{
              const _yearinfo = yearinfo[_year]
              return (
                <Link key={_year} to={_yearinfo.slug} sx={{margin: 1}}>
                  <Button variant={year === _year? 'primary': 'secondary'} sx={{
                    fontFamily: 'english',
                  }}>
                    {_year}
                  </Button>
                </Link>
              )
            })
            }
        </Flex>
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
        {!yearinfo[year] || !yearinfo[year].count && (
          <Message sx={{mt: 3}}>
            今年还没有创建任何文章
          </Message>
        )}
        {!!yearinfo[year] && !!yearinfo[year].count && (<ol>
          {group.map(({ edges }) => {
            return edges.map(({ node }) => {
              const title = node.title
              const slug = node.slug
              const createDate = node.createYearMonthDay
              if (showAll || (startDateStr <= createDate && endDateStr >= createDate)) {
                return (
                  <li key={slug}>
                    <Link to={mergePath(basePath, slug)}>{title}</Link>
                  </li>
                )
              }
            })
          })}
        </ol>)}
      </ContentContainer>
    )
  }
}


export default ArchiveTemplate

export const pageQuery = graphql`
  query ($year: Date) {
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
