const mergePath = (basePath = '/', path = '')=>{
  let result = "/" + basePath + "/" + path
  result = result.replace(/\/+/g, '/')
  return result
}
export default mergePath
