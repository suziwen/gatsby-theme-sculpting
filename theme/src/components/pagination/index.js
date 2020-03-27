/** @jsx jsx */
import { jsx, Select} from 'theme-ui'
import React from "react"
import { navigate } from "gatsby"
import {MdArrowForward, MdArrowBack} from "react-icons/md"
import PaginationLink from "./PaginationLink"
import mergePath from "../../utils/merge-path"

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.changePage = this.changePage.bind(this)

  }
  changePage(e){
    const basePath = this.props.context.basePath
    const pageStr = e.target.value ? `/page/${e.target.value}` : `/`
    navigate(mergePath(basePath, pageStr))
  }
  render() {
    const { numPages, currentPage, basePath } = this.props.context
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPageStr =
      currentPage - 1 === 1 ? `` : `/page/${(currentPage - 1).toString()}`
    const nextPageStr = `/page/${currentPage + 1}`
    const prevPageLink = isFirst ? null : mergePath(basePath, prevPageStr)
    const nextPageLink = isLast ? null : mergePath(basePath, nextPageStr)
    return (
      <div
        sx={{
          display: `flex`,
          justifyContent: `space-between`,
          my: 5,
          mx: 0,
          flexDirection: [`column`, `row`],
        }}
      >
        <div
          sx={{
            display: `flex`,
            margin: 0,
            padding: 0,
            justifyContent: `space-between`,
            width: `15em`,
            alignItems: `center`,
            mb: 1
          }}
        >
          <PaginationLink to={prevPageLink}>
            <MdArrowBack style={{ verticalAlign: `sub` }} />
            上一页
          </PaginationLink>
          <PaginationLink to={nextPageLink}>
            下一页
            <MdArrowForward style={{ verticalAlign: `sub` }} />
          </PaginationLink>
        </div>
        {numPages>1?
        <div
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `flex-end`,
            mb: 2,
            position: 'relative',
          }}
        >
          <span>跳转到 &nbsp;</span>
          <Select
            value={currentPage === 1 ? `` : currentPage.toString()}
            onChange={this.changePage}
            sx={{

              fontFamily: 'english',
              width: '3em',
              border: 'none'
            }}
          >
            {Array.from({ length: numPages }, (_, i) => (
              <option
                value={`${i === 0 ? `` : i + 1}`}
                key={`pagination-number${i + 1}`}
              >
                {i + 1}
              </option>
            ))}
          </Select>
          <span sx={{
            fontFamily: 'english',
          }}> &nbsp;/ &nbsp;</span>
            <span sx={{
              fontFamily: 'english',
            }}>{numPages}</span>
        </div>
        : ""
        }
      </div>
    )
  }
}

export default Pagination
