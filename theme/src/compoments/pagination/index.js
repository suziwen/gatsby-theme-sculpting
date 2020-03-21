import React from "react"
import { navigate } from "gatsby"
import {MdArrowForward, MdArrowBack} from "react-icons/md"
import PaginationLink from "./PaginationLink"

class Pagination extends React.Component {
  changePage = e => {
    navigate(e.target.value ? `/page/${e.target.value}` : `/`)
  }
  render() {
    const { numPages, currentPage } = this.props.context
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPageNum =
      currentPage - 1 === 1 ? `` : `page/${(currentPage - 1).toString()}`
    const nextPageNum = (currentPage + 1).toString()
    const prevPageLink = isFirst ? null : `/page/${prevPageNum}`
    const nextPageLink = isLast ? null : `/page/${nextPageNum}`
    return (
      <div
      >
        <div
        >
          <PaginationLink to={prevPageLink}>
            <MdArrowBack style={{ verticalAlign: `sub` }} />
            上一篇
          </PaginationLink>
          <PaginationLink to={nextPageLink}>
            下一篇
            <MdArrowForward style={{ verticalAlign: `sub` }} />
          </PaginationLink>
        </div>
        {numPages>1?
        <div
        >
          <span>跳转到 &nbsp;</span>
          <select
            value={currentPage === 1 ? `` : currentPage.toString()}
            onChange={this.changePage}
          >
            {Array.from({ length: numPages }, (_, i) => (
              <option
                value={`${i === 0 ? `` : i + 1}`}
                key={`pagination-number${i + 1}`}
              >
                {i + 1}
              </option>
            ))}
          </select>
          <svg
            width="10"
            height="5"
            viewBox="0 0 10 5"
          >
            <path d="M0 0l5 4.998L10 0z" fillRule="evenodd" />
          </svg>
          <span>of &nbsp;</span>
          <span>{numPages}</span>
        </div>
        : ""
        }
      </div>
    )
  }
}

export default Pagination
