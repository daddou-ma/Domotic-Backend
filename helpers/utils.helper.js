const removeUndefined = (obj) => {
  Object.keys(obj).forEach(key =>
    (obj[key] === undefined) && delete obj[key]
  )
  return obj
}

/** Export the module **/
module.exports = {
    removeUndefined,
}