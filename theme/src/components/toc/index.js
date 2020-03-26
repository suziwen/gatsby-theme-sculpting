/** @jsx jsx */
import { jsx, BaseStyles } from "theme-ui"
import React, {useEffect} from "react";
import tocbot from 'tocbot';


const Toc = ({onClick}) => {
  useEffect(()=>{
    tocbot.init({
      tocSelector: `.toc`,
      contentSelector: `.post-body`,
      headingSelector: `h1,h2,h3`,
      scrollSmooth: true,
      scrollSmoothDuration: 1,
    });
    return () => tocbot.destroy()
  })
  return (<div className="toc" onClick={onClick}></div>)
}
export default Toc
