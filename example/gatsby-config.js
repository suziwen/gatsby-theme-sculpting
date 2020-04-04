const siteMetadata = {
  title: "小书匠tttt",
  siteUrl: "http://www.xiaoshujiang.com",
  author: "suziwentttt",
  description: `一款让你爱不释手的写作软件`,
}
module.exports = {
  siteMetadata,
  plugins: [{ 
    resolve: `@suziwen/gatsby-theme-stone-sculpture`,
    options: {} 
  }],
}
