let fs = require('fs')
let xml2js = require('xml2js')

let parse = (path) => {
  var parser = new xml2js.Parser()
  fs.readFile(path, function(err, data) {
      parser.parseString(data, function (err, result) {
          if (!err) {
            console.dir(result)
            return result
          } else {
            console.log(`There was a problem parsing the file at ${path}`)
          }
      });
  });
}
