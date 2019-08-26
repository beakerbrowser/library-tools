const fs = require('fs')

console.log('Building ESM version at index.build.js')

var indexJs = fs.readFileSync('./index.js')
fs.writeFileSync('./index.build.js', 
`const exports = {}

${indexJs}

export default exports
`)

console.log('Done')