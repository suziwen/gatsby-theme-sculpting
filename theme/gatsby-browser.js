exports.shouldUpdateScroll = ({prevRouterProps, routerProps}) => {
  if (prevRouterProps && (prevRouterProps.location.pathname !== routerProps.location.pathname )){
    if (routerProps.location.hash) {
      return true
    }
  }
  return false
}
