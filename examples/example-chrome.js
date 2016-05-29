var fs = require("fs");
var path = require("path");
var Sorcerer = require(path.resolve(__dirname,"../src/Sorcerer.js"));
var Apprentice = require(path.resolve(__dirname,"../src/Chrome/ChromeApprentice.js"));

var inst = new Sorcerer();
inst.withApprentice(new Apprentice({
    
}));
input = fs.readFileSync(path.resolve(__dirname,"../examples/example.html")).toString();

var output = inst.abrakadabra(input);
console.log(output);