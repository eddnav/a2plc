const fs = require('fs')

const write = (name, data, cb) => {
  fs.writeFile(name, data.join('\n'), (err) => {
    if (err) {
      throw err
    }
    cb()
  })
}

module.exports = write
