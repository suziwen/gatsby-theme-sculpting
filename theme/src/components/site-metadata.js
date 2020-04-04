import React from "react"
import Helmet from "react-helmet"

import ContextConsumer from "../components/context"
import logoIcon from "../assets/logo-icon.png"

const SiteMetadata = ({ pathname }) => (
  <ContextConsumer>
    {({siteMetadata: {title, siteUrl}}) => {
      return (
      <Helmet defaultTitle={title} titleTemplate={`%s | ${title}`}>
        <html lang="en" />
        <link rel="canonical" href={`${siteUrl}${pathname}`} />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
        />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={`${siteUrl}${logoIcon}`} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
      </Helmet>
      )
    }}
  </ContextConsumer>
)

export default SiteMetadata
