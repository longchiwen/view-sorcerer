var fs = require("fs");
var path = require("path");
var Sorcerer = require(path.resolve(__dirname,"../src/Sorcerer.js"));


var inst = new Sorcerer();
input = fs.readFileSync(path.resolve(__dirname,"../examples/example.html")).toString();

var output = inst.abrakadabra(input);
console.log(output);