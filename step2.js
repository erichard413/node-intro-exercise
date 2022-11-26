const fs = require('fs');
const axios = require('axios');

const args = process.argv.slice(2)

function cat(path) {
        fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log("ERROR!", err)
            process.exit(1)
        }
        console.log(data)
    });
}

async function webCat(url) {
    try {
        const res = await axios.get(arg)
        console.log(res.data)
    } catch (e) {
        console.log(e.code)
    }
    
}

const isValidURL = string=> {
    try {
        return Boolean(new URL(`${string}`));
    }
    catch (e) {
        return false;
    }
} 

function doCat(args) {
    for (arg of args){
        if (isValidURL(arg)) {
            webCat(arg)
        } else {
            cat(arg)
        }
    }
}

doCat(args)
