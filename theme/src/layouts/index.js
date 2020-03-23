import React from "react"
import { navigate, PageRenderer } from "gatsby"
import SiteMetadata from "../components/site-metadata"
import Transition from "../components/transition"
import ContextConsumer, { ContextProviderComponent } from "../components/context"


class DefaultLayout extends React.PureComponent {
  constructor() {
    super()
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const pageContext = this.props.pageContext
    const props = this.props
    return (
    <ContextProviderComponent>
      <ContextConsumer>
        {({data, set})=>{
          return (
            <div>
              <SiteMetadata pathname={props.location.pathname} />
              <div
                className={`main-body`}
              >
                  <Transition location={props.location}>
                    {props.children}
                  </Transition>
              </div>
            </div>
          )
        }}
      </ContextConsumer>
    </ContextProviderComponent>
    )
  }
}

export default DefaultLayout
