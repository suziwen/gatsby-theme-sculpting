/** @jsx jsx */
import { jsx, Input} from 'theme-ui'
import React from "react"
import { navigate } from "gatsby"
import reactComposition from "react-composition"

class SearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: props.query
    }
  }

  render() {
    const self = this;
    const { query } = this.state
    return (
      <Input
        type="search"
        name="keywords"
        placeholder="输入文字,开始搜索...."
        aria-controls="search-results-count"
        {...reactComposition({
          onChange: e =>{
            const newQuery = e.target.value
            if (e.reactComposition.composition === false) {
              if (newQuery.trim()) {
                navigate(`/search?keywords=${encodeURIComponent(newQuery.trim())}`)
              } else {
                navigate(`/search`)
              }
            }
            self.setState({
              query: newQuery
            })
          }
        })}
        value={query}
      />
    )
  }
}

export default SearchForm
