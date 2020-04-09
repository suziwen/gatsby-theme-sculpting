# 开始使用

本博客使用 Gatsby 进行开发,在开始使用 Sculpting 时,建议先了解下一些 Gatsby 的开发流程.

Gatsby 支持两种创建博客方式,一种是全新的安装模式,一种是在现有的 Gatsby 博客上进行扩展.

## 全新模式安装

```
gatsby new suziwen/gatsby-starter-sculpting
```


## 扩展模式安装

如果你已经有了一个 Gatsbyjs 的静态网站,想在该网站的基础上安装 sculpting 主题,可以使用这种方式安装.

1. 安装 `gatsby-theme-sculpting` 组件

```
npm install `@suziwen/gatsby-theme-sculpting`
```

2. 在配置文件 `gatsby-config.js` 里注册安装的组件
``` javascript?title=gatsby-config.js
module.exports = {
  plugins: [ 'gatsby-theme-sculpting']
}
```

# 配置

## 插件支持的参数

可以使用下面的形式,对 `gatsby-theme-sculpting` 主题进行参数设置

``` javascript?title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-sculpting',
      options: {
        basePath: '/',
        tagsPath: 'tags',
        archivesPath: 'archives',
        contentPath: 'posts',
        disqus: { // 需要使用时再配置这个节点
            shortname: ''
        },
        gitalk: {  // 需要使用时再配置这个节点
            clientID: '',
            clientSecret: '',
            repo: '',
            owner: '',
            admin: []
        }
      }
  ]
}
```

### BasePath

生成博客的基础路径,默认为值为 `/`

### tagsPath

标签的基础访问路径,默认值为 `tags`

### archivesPath

归档的基础访问路径,默认值为 `archives`

### contentPath

指定放置小书匠 zip 文件的位置(相对路径时,以博客的安装目录为起点算起),默认值为 `posts`

### 评论

目前支持 disqus 和 gitalk.

当同时配置了 disqus 和 gitalk 时,系统直接使用 gitalk.

#### disqus

##### shortname

#### gitalk

支持的参数可以参考[这里](https://github.com/suziwen/gitalk#options).

## 通用的 sitemetadata 配置

可以在 `gatsby-config.js` 里的 sitemetadata 节点,配置一些网站的基本信息.

``` javascript?title=gatsby-config.js
module.exports = {
    siteMetadata: {
       title: '小书匠', // 网站标题, 页面左上角的文字
       siteUrl: 'http://www.xiaoshujiang.com', // 网站地址
       description: '', // 对网站的一些介绍
       idiom: '', // 谚语,可以为空,页面左下角的文字
       author: '', // 作者, 页面右下角 copyright 上作者信息.
    },
    plugins: [...]
}

```


# 文章元数据支持

## title

文章标题

## createDate

文章创建时间,如果不指定,系统直接使用内置的创建时间

## slug

用于生成文章的访问路径,如果不指定,直接使用 title 做为访问路径.

## tags

标签,多个标签以逗号分开,也可以使用 yaml 的数组定义多个标签

## excerpt

文章摘要

# 定制

想要对主题进行微调的,需要使用到 Gatsby 的 shadowing component 功能,进行继承修改,详细教程可以参考 Gatsby 官方[教程](https://www.gatsbyjs.org/docs/themes/shadowing/).

当然你也可以直接在主题上进行修改,然后重新发布一个新的主题.

## 目录结构

```
├── gatsby-browser.js
├── gatsby-config.js // gatsby 默认的配置文件 
├── gatsby-node.js
├── gatsby-ssr.js
├── index.js
├── package.json
├── posts
│   └── 在这里存储小书匠导出的 zip 文件
├── README.md
├── src
│   ├── assets
│   ├── components //组件目录
│   ├── gatsby-plugin-theme-ui //样式主题
│   │   └── index.js
│   ├── header.mdx
│   ├── layouts //整个博客框架页面
│   │   ├── button.js
│   │   ├── footer.js
│   │   ├── header.js
│   │   ├── index.js
│   │   ├── menu-button.js
│   │   ├── nav-link.js
│   │   └── sidenav.js
│   ├── pages
│   │   ├── 404.js // 404 页面
│   │   ├── index-default.js //默认主页
│   │   └── search.js //搜索页面
│   ├── templates
│   │   ├── template-archive.js //归档模板
│   │   ├── template-blog-list.js //博客列表模板
│   │   ├── template-blog-post.js //博客文章模板
│   │   └── template-tag.js //标签模板
│   └── utils // 一些帮助函数
└── static // 静态引用的文件
```

## 主题颜色配置

可以创建一个主题专用的配置文件 `src/gatsby-plugin-theme-ui/index.js` 来修改主题样式的配置.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/).

Here are some places to start:

### Themes

- To learn more about Gatsby themes specifically, we recommend checking out the [theme docs](https://www.gatsbyjs.org/docs/themes/).

### General

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Reference Guides_ and _Gatsby API_ sections in the sidebar.


# 其他

## 如何添加统计功能

可以直接安装一些统计插件
[gatsby-plugin-google-analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/) 和 [gatsby-plugin-baidu-analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-baidu-analytics/)

