require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})
const siteMetadata = {
  title: "小书匠",
  siteUrl: "http://www.xiaoshujiang.com",
  author: "suziwen",
  description: `一款让你爱不释手的写作软件`,
}
module.exports = {
  siteMetadata,
  plugins: [{ 
    resolve: `@suziwen/gatsby-theme-sculpting`,
    options: {
      contentPath: `posts`,
      _disqus: {
        shortname: process.env.DISQUS_SHORT_NAME
      },
      _gitalk: {
        clientID: process.env.GITALK_CLIENT_ID,
        clientSecret: process.env.GITALK_CLIENT_SECRET,
        repo: process.env.GITALK_REPO,
        owner: process.env.GITALK_OWNER,
        admin: [process.env.GITALK_ADMIN],
      }
    } 
  }],
}
