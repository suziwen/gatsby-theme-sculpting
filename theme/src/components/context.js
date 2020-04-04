import React from "react"
import { graphql, StaticQuery } from "gatsby"

const defaultContextValue = {
  data: {
  },
  set: ()=>{}
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

class ContextProviderComponent extends React.Component {
  constructor(props) {
    super(props)

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultContextValue,
      ...props,
      set: this.setData,
    }
  }

  setData(newData) {
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }

  render() {
    const self = this
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                siteUrl
                title
                author
                idoms
                description
              }
            }
          }
        `}
        render={({
          site: {
            siteMetadata,
          },
        }) => (
          <Provider value={{
            siteMetadata,
            ...self.state,
          }}>{self.props.children}</Provider>
        )}
      />
    )
  }
}

export { Consumer as default, ContextProviderComponent }
