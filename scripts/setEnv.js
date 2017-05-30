let fs = require('fs');

console.log((process.argv[2] + ' mode').toUpperCase());

let arg = process.argv[2];

fs.createReadStream('./src/environment/' + arg + '.js').pipe(fs.createWriteStream('./src/environment/index.js'));