const fs = require('fs');

const args = process.argv.slice(2)

function cat(path) {
    for (let arg of args) {
        fs.readFile(arg, 'utf8', function(err, data) {
        if (err) {
            console.log("ERROR!", err)
            process.exit(1)
        }
        console.log(data)
    });
    }
    
}

cat(args)
