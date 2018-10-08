const convertPlaceholders = value => {
  return value.replace(/(%((\d+)\$)*(\.\d+)?([a-zA-Z]){1})/g,
  (m, a, g1, g2) => {
    if (g2) {
      return `{${g2 - 1}}`
    } else return ''
  })
}

const removeDuplicates = (array) => {
  return array.reduce((acc, curr) => {
    if (!acc.find(item => item.$.name === curr.$.name)) {
      acc.push(curr)
    }
    return acc
  }, [])
}

const convert = data => {

  const strings = removeDuplicates(data.string).map(element => {
    return `${element.$.name} = ${convertPlaceholders(element._)}`
  })

  const plurals = removeDuplicates(data.plurals).map(element => {
    return element.item.map(subElement => {
      return `${element.$.name}.${subElement.$.quantity} = ${convertPlaceholders(subElement._)}`
    })
  })

  const pluralsFlat = [].concat(...plurals)

  const stringArray = removeDuplicates(data.stringArray).map(element => {
    return element.item.map((subElement, index) => {
      return `${element.$.name}.${index} = ${convertPlaceholders(subElement)}`
    })
  })

  const stringArrayFlat = [].concat(...stringArray)

  return strings.concat(pluralsFlat).concat(stringArrayFlat)
}

module.exports = convert
