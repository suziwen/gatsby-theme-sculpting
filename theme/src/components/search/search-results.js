import React from "react"
import Highlighter from "react-highlight-words"

const SearchResults = ({ query, results }) => (
  <section aria-label="Search results for all posts">
    {!!results.length && query && (
      <h2>
        Found {results.length} posts on "{query}"
      </h2>
    )}
    {!results.length && query &&(
      <h2>
        Not Found post on "{query}"
      </h2>
    )}
    {!!results.length && (
      <ol className="search-results-list">
        {results.map(({ title, url, date, description }) => (
          <li key={title}>
            <h3 className="search-results-list__heading">
              <a href={url} className="search-results-list__link">
                <Highlighter
                  searchWords={[query]}
                  autoEscape={true}
                  textToHighlight={title}
                />
              </a>
            </h3>
            <small>{new Date(date).toLocaleString("en-GB")}</small>
            {description && (
              <p>
                <Highlighter
                  searchWords={[query]}
                  autoEscape={true}
                  textToHighlight={description}
                />
              </p>
            )}
          </li>
        ))}
      </ol>
    )}
  </section>
)

export default SearchResults
