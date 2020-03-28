import React, { useState, useEffect } from "react"
import debounce from "lodash.debounce"
import FlexSearch from 'flexsearch'
import SearchForm from "../components/search/search-form"
import SearchResults from "../components/search/search-results"
import ContentContainer from '../components/content-container'

const Search = ({ data, location }) => {
  const [results, setResults] = useState([])
  const searchQuery = new URLSearchParams(location.search).get("keywords") || ""
  const flexIndex = data.localSearchPages.index
  const flexStore = JSON.parse(data.localSearchPages.store)
  const importedIndex = FlexSearch.create({
    encode: 'icase',
    tokenize: 'full',
    threshold: 1,
    resolution: 3,
    depth: 1,
    split: /[\s\,\.\!\?\:]+/
  })
  importedIndex.import(flexIndex)

  useEffect(() => {
    if (searchQuery) {
      const debouncedSearch = debounce(async () => {
        const rawResults = await importedIndex.search(searchQuery, {})
        const posts = rawResults.map(id => flexStore[id])
        setResults(posts)
      }, 500)

      debouncedSearch()
    }

    if (!searchQuery) setResults([])
  }, [location.search])

  return (
    <ContentContainer>
      <SearchForm query={searchQuery} />
      <SearchResults query={searchQuery} results={results} />
    </ContentContainer>
  )
}

export default Search

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
      localSearchPages {
        index
        store
      }
  }
`
