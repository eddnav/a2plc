require('pkginfo')(module, 'version')

const fs = require('fs')
const path = require('path')
const commander = require('commander')
const parse = require('./parser')
const convert = require('./converter')
const write = require('./writer')

const version = module.exports.version

const a2plc = () => {
  commander
    .arguments('<file>')
    .option('-f, --folder', 'Batch convert all files in the folder to a single property file.')
    .option('-o, --out <out>', 'Name for the output file')
    .version(version)
    .action((file) => {
      console.log('Starting!')

      if (commander.folder) {
        const folder = file
        const parses = []
        fs.readdir(folder, (err, files) => {

          if (!files) {
            console.log(`${folder} is not a folder.`)
            return
          }

          files.forEach(file => {
            if(path.extname(file) === '.xml') {
              parses.push(parse(`${folder}/${file}`))
            }
          })

          Promise.all(parses).then(result => {
            let data = result.reduce((acc, curr) => {
              return {
                string: curr.resources.string ? acc.string.concat(curr.resources.string) : acc.string,
                plurals: curr.resources.plurals ? acc.plurals.concat(curr.resources.plurals) : acc.plurals,
                stringArray: curr.resources['string-array'] ? acc.stringArray.concat(curr.resources['string-array']) : acc.stringArray
              }
            }, { string: [], plurals: [], stringArray: [] })
            write(commander.out || 'converted-localization.txt', convert((data)), () => console.log('Done!'))
          }, err => {
            console.log(err)
          })
        })
      } else {
        fs.stat(file, (err) => {

          if (err) {
            console.log(`${file} does not exist.`)
            return
          }

          const pathInfo = path.parse(file)

          if (pathInfo.ext === '.xml') {
            parse(file).then(result => {
              write(commander.out || `${pathInfo.name}.txt`, convert({ string: result.resources.string || [], plurals: result.resources.plurals || [], stringArray: result.resources['string-array'] || [] }), () => console.log('Done!'))
            }, err => {
              console.log(err)
            })
          }
        })
      }
    })
    .parse(process.argv)
}

module.exports = a2plc
