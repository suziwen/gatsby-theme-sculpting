import React, { useState, useEffect } from "react"
import { graphql } from 'gatsby'
import debounce from "lodash/debounce"
import FlexSearch from 'flexsearch'

import SearchForm from "../components/search/search-form"
import SearchResults from "../components/search/search-results"
import ContentContainer from '../components/content-container'


let flexStore = null
let importedIndex = null
let debouncedSearch = null

const Search = ({ data, location }) => {
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const searchQuery = new URLSearchParams(location.search).get("keywords") || ""
  const flexIndex = data.localSearchPages.index
  if (!flexStore) {
    flexStore = JSON.parse(data.localSearchPages.store)
    importedIndex = FlexSearch.create({
      encode: 'icase',
      tokenize: 'full',
      threshold: 1,
      resolution: 3,
      depth: 1,
      split: /[\s,.!?:]+/
    })
    importedIndex.import(flexIndex)
    debouncedSearch = debounce(async () => {
      const rawResults = await importedIndex.search(searchQuery, {})
      const posts = rawResults.map(id => flexStore[id])
      setSearching(false)
      setResults(posts)
    }, 500)
  }

  useEffect(() => {
    if (searchQuery) {
      setSearching(true)
      debouncedSearch()
    }

    if (!searchQuery) setResults([])
  }, [location.search])

  return (
    <ContentContainer>
      <SearchForm query={searchQuery}/>
      <SearchResults query={searchQuery} searching={searching} results={results} />
    </ContentContainer>
  )
}

export default Search

export const pageQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
  }
`
