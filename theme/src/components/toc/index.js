/** @jsx jsx */
import { jsx, BaseStyles } from "theme-ui"
import ContextConsumer from "../context"
import React, {useEffect} from "react";
import tocbot from 'tocbot';


const Toc = ({onClick}) => {
  return (
      <ContextConsumer>
        {({data, set})=>{
          if (data.transitionStatus === 1) {
            set({
              transitionStatus: 2
            })
            console.log('exited mount')
            tocbot.destroy()
          }
          if (data.transitionStatus === 3) {
            console.log('entered mount')
            set({
              transitionStatus: 0
            })
            tocbot.init({
              tocSelector: `.toc`,
              contentSelector: `.post-body`,
              headingSelector: `h1,h2,h3`,
              scrollSmooth: true,
              scrollSmoothDuration: 1,
            });
          }
          return (<></>)
        }}
      </ContextConsumer>
        )
}
export default Toc
