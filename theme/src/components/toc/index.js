/** @jsx jsx */
import { jsx } from "theme-ui"
import React, {useEffect} from "react";
import tocbot from 'tocbot';


const tocbotInstance = {}
const Toc = ({onClick, location}) => {
  useEffect(()=>{
    let hasInstanceTocbot = false
    Object.keys(tocbotInstance).forEach((key)=>{
      if (tocbotInstance[key]) {
        hasInstanceTocbot = true
      }
      delete tocbotInstance[key]
    })
    if (hasInstanceTocbot) {
      tocbot.destroy()
    }

    tocbot.init({
      tocSelector: `.toc`,
      contentSelector: `.post-body`,
      headingSelector: `h1,h2,h3`,
      scrollSmooth: true,
      scrollSmoothDuration: 1,
    });
    tocbotInstance[location.pathname] = true

    return ()=>{
      if (tocbotInstance[location.pathname]) {
        tocbot.destroy()
        delete tocbotInstance[location.pathname]
      }
    }
  }, [location.pathname])
  return (<></>)
}
export default Toc
