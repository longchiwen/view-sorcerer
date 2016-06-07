var fs = require("fs");
var path = require("path");
var fs = require("fs");
var Sorcerer = require(path.resolve(__dirname,"../src/Sorcerer.js"));
var Apprentice = require(path.resolve(__dirname,"../src/HtmlApprentice.js"));

var inst = new Sorcerer();
inst.withApprentice(new Apprentice({

}));
input = fs.readFileSync(path.resolve(__dirname,"./example.html")).toString();

var output = inst.abrakadabra(input);
var ouputDir = path.resolve(__dirname,"./output");

// create output folder if not exist
if(!fs.existsSync(ouputDir)){
    fs.mkdirSync(ouputDir);
}

var file = fs.createWriteStream(path.resolve(ouputDir,"./example.html"));
file.write(output);
file.end();
console.log(output);
