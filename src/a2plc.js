let commander = require('commander')

let a2plc = () => {
  commander
    .arguments('<file>')
    .version('0.0.0')
    .action((file) => {
      console.log('starting!')
    })
    .parse(process.argv)
}

module.exports = a2plc
