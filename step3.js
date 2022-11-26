const fs = require('fs');
const axios = require('axios');

const args = process.argv.slice(2)
const isWriteMode = writeMode()

function cat(path) {
        fs.readFile(path, 'utf8', function(err, data) {
         if (err) {
            console.log("ERROR!", err)
            process.exit(1)
        }
        if (isWriteMode){
            fs.writeFile(`./${args[0]}`, `${data}`, "utf8", function(err){
                if (err){
                    console.log(err);
                    process.exit(1);
                }
                console.log('Successfully wrote to file!')
            })
        } else {
            console.log(data)
        }
    })
        
}

async function webCat(url) {
    try {
        const res = await axios.get(url)
        if (isWriteMode){
            fs.writeFile(`./${args[0]}`, `${res.data}`, "utf8", function(err){
                if (err){
                    console.log(err);
                    process.exit(1);
                }
                console.log('Successfully wrote to file!')
            })
        } else {
            console.log(res.data)
        }
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

function doCat(argus) {
    if (isWriteMode){
        for (arg of argus.slice(1)){
            if (isValidURL(arg)) {
                webCat(arg)
            } else {
                cat(arg)
            }
        }
    } else {
        for (arg of argus){
        if (isValidURL(arg)) {
            webCat(arg)
        } else {
            cat(arg)
        }
    }
    }

}

function writeMode() {
    if (args[0] == "--out"){
        args.shift()
        return true;
    }
    return false;
}

doCat(args)
