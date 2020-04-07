/** @jsx jsx */
import { jsx, Message, Heading, Flex } from 'theme-ui'
import React, { useState, useEffect } from "react"
import {FaRegEdit, FaSignOutAlt, FaSignInAlt, FaHandSpock, FaLightbulb} from "react-icons/fa"

import ContentContainer from '../components/content-container'
          //content: `"\2669\266B\266A\266C"`,
          //content: `"\266C\266A\266B\2669"`,

const Home = ({ data, location }) => {
  return (
    <ContentContainer sx={{
      minHeight: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}>
    <Flex sx={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Heading as="h2" sx={{
        display: ['flex', 'block'],
        flexDirection: ['column'],
        alignItems: ['center'],
        "&:before": {
          display: 'inline-block',
          content: `"\u2669\u266A\u266B\u266C"`,
        },
        "&:after": {
          display: 'inline-block',
          content: `"\u266C\u266B\u266A\u2669"`,
        }

      }}>
        <span sx={{display: "inline-block", mx: 4, fontSize: 5}}>欢迎使用小书匠</span>
      </Heading>
      <p sx={{
        "&:before": {
          content: `" "`,
          display: 'inline-block',
          width: '2em',
        }
      }}>当您看到该页面时,表示已经成功安装了 Sculpting 主题的博客,接下来只需要完成下面的步骤,就可以查看自己的文章了.</p>
      <ol>
        <li><FaRegEdit /> 使用<a href="http://markdown.xiaoshujiang.com" target="_blank">小书匠编辑器</a> 撰写一篇文章</li>
        <li><FaSignOutAlt /> 通过小书匠编辑器的<a href="http://soft.xiaoshujiang.com/docs/tutorial/import_and_export/" target="_blank">导出</a>功能,将刚撰写的文章导出成 zip 格式文件</li>
        <li><FaSignInAlt /> 将导出的 zip 文件放置在博客安装目录下的 <code>posts</code> 文件夹里</li>
        <li><FaHandSpock /> 重新编译 Sculpting,刷新网页,就可以在博客里查看新文章了</li>
        <li><FaLightbulb /> 更多个性化修改,可以参考<a href="https://github.com/suziwen/gatsby-theme-sculpting" target="_blank">这里</a></li>
      </ol>
    </Flex>
    </ContentContainer>
  )
}
export default Home

