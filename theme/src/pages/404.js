/** @jsx jsx */
import { jsx, Message, Heading } from 'theme-ui'
import React from "react"
import Helmet from "react-helmet"
import ContentContainer from '../components/content-container'


export default ({ pageContext: { basePath } }) => {
  return (
    <ContentContainer sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: `center`,
      alignContent: 'center',
    }}>
      <Helmet>
        <title>页面不存在</title>
      </Helmet>
      <Message >
        <Heading>您要访问的页面不存在</Heading>
      </Message>
    </ContentContainer>
  )
}

