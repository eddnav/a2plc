const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')

const parse = file => {
  return new Promise((resolve, reject) => {

    // Recommended by xml2js' author, see "Parsing multiple files": https://www.npmjs.com/package/xml2js
    const parser = new xml2js.Parser()

    fs.readFile(path.resolve(file), (err, data) => {

      console.log(`Parsing ${file}`)

      if (err) {
        reject(err)
      }

      parser.parseString(data, (err, result) => {
        if (err) {
          console.log(`There was a problem parsing the file at ${path}.`)
          reject(err)
        }

        resolve(result)
      })
    })
  })
}

module.exports = parse
