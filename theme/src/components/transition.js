import React from "react"
import tocbot from 'tocbot';
import ContextConsumer from "./context"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"

const timeout = 250
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    zIndex: `-10`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
  },
}

class Transition extends React.PureComponent {
  render() {
    const _props = this.props
    const { children, location } = this.props

    return (
      <ContextConsumer>
        {({data, set})=>{
          return (
            <TransitionGroup>
              <ReactTransition
                appear={true}
                mountOnEnter={true}
                unmountOnExit={true}
                key={location.pathname}
                onExit={()=>{
                    console.log('exit')
                    console.log(_props)
                    set({
                      transitionStatus: 1
                    })
                  }
                }
                onEntered={()=>{
                  console.log('entered')
                  console.log(location)
                  console.log(_props)
                  if (data.transitionStatus === 2) {
                    set({
                      transitionStatus: 3
                    })
                  }
                }}
                addEndListener={(node, done) => {
                  console.log(node)
                  node.addEventListener('transitionend', function(){
                    done();
                  }, false);
                }}
                timeout={{
                  enter: timeout,
                  exit: timeout,
                }}
              >
                {status => (
                  <div
                    style={{
                      ...getTransitionStyles[status],
                    }}
                  >
                    {children}
                  </div>
                )}
              </ReactTransition>
            </TransitionGroup>

          )
        }}
      </ContextConsumer>
    )
  }
}

export default Transition
