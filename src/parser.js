const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')

const parse = (path) => {
  return new Promise((resolve, reject) => {

    // Recommended by xml2js' author, see "Parsing multiple files": https://www.npmjs.com/package/xml2js
    const parser = new xml2js.Parser()

    // TODO: right now it only supports file/folder names relative to the running directory, research how to make this more robust.
    fs.readFile(`${process.cwd()}/${path}`, (err, data) => {

      console.log(`Parsing ${path}`)

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
