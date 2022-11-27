const fs = require('fs');
const axios = require('axios');

const args = process.argv.slice(2)

const argsArr = []

function makeArgsArr() {
    for (let i = 0; i < args.length; i++) {
        if (args[i] == "--out") {
            argsArr.push([args[i], args[i+1], args[i+2]])
            i += 2
        } else {
            argsArr.push([args[i]])
        }
    }
}

makeArgsArr()

function cat(args, writeMode) {
    if (writeMode){
        fs.readFile(args[1], 'utf8', function(err, data) {
         if (err) {
            console.log("ERROR!", err)
            process.exit(1)
        }
        fs.writeFile(`./${args[0]}`, `${data}`, "utf8", function(err){
            if (err){
                console.log(err);
                process.exit(1);
            }
                console.log('Successfully wrote to file!')
        })
        })  
    } else {
        fs.readFile(args[0], 'utf8', function(err,data) {
            if (err) {
                console.log("ERROR!", err)
                process.exit(1)
            } 
            console.log(data)
        })
    }
}

async function webCat(args, writeMode) {
    try {
        const res = await axios.get(args[1])
        if (writeMode){
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

function doCat(argus, writeMode) {
    if (writeMode){
        if (isValidURL(argus[1])) {
            webCat(argus, writeMode)
        } else {
            cat(argus, writeMode)
        }
    } else {
        for (arg of argus){
        if (isValidURL(arg)) {
            webCat(argus, writeMode)
            
        } else {
            cat(argus, writeMode)
            
        }
    }
    }
    
}

function writeMode(args) {
    if (args[0] == "--out"){
        args.shift()
        return true;
    }
    return false;
}
for (let args of argsArr) {
    isWriteMode = writeMode(args)
    doCat(args, isWriteMode)
}

