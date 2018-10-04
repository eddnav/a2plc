const convertPlaceholders = value => {
  // TODO: Naive, just taking into account numbers and strings.
  // Also there's probably a more efficient solution. Look for it.
  return value.replace(/(%(\d)\$d)/g, '{$2, number}').replace(/(%(\d)\$s)/g, '{$2}')
}

const convert = data => {
  return data.map(element => {
    return `${element.$.name} = ${convertPlaceholders(element._)}`
  })
}

module.exports = convert
