var browserify = require("browserify");
var process = require("process");
var fs = require("fs");
var path = require("path");
var version = process.env.npm_package_version;

var inst = browserify([path.resolve(__dirname,"../src/Sorcerer.js")],{
    sandalone:"ViewSorcerer"
});

var out = fs.createWriteStream(path.resolve(__dirname,"../dist/view-sorcerer-"+version+".js"));
inst.bundle().pipe(out);
