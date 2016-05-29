var htmlParser = require("htmlParser2");
var DefaultAprentice = require("./Chrome/ChromeApprentice.js");

function Sorcerer() {
    this.apprentice = new DefaultAprentice();
    this.reset();
}

Sorcerer.prototype.reset = function (){
    this.lines = 0;
    this.content = "";
    this.errors = [];

    return this;
};

Sorcerer.prototype.withApprentice = function(apprentice){
    this.apprentice = apprentice;

    return this;
};

Sorcerer.prototype.wrapLines = function (){
    var input = this.content;
    if(!input) return this;

    var output = "";
    var offset = 0;
    const NEWLINE = "\n";
    var lastPos = input.indexOf(NEWLINE, offset);

    while(lastPos >= 0) {
        this.lines++;
        var lineOutput = input.substring(offset,lastPos);
        output += this.apprentice.brewLine(lineOutput,this.lines);
        offset = lastPos + NEWLINE.length;
        lastPos = input.indexOf(NEWLINE, offset);
    }

    if(offset < input.length) {
        this.lines++;
        output += this.apprentice.brewLine(input.substring(offset),this.lines);
    }

    this.content = output;
    return this;

};

Sorcerer.prototype.parseContent = function (input){
    if(!input) return this;

    var output = "";
    var parser = new htmlParser.Parser({
        onopentagname: function (name){
                output += this.apprentice.brewOpenTag(name);
            }.bind(this),

        ontext: function (text){
                output += this.apprentice.brewText(text);
            }.bind(this),

        onclosetag: function (name){
                output += this.apprentice.brewCloseTag(name);
            }.bind(this),

        onattribute:function(name, value){
                output += this.apprentice.brewAttribute(name, value);
            }.bind(this),

        oncomment:function(data){
                output += this.apprentice.brewComment(data);
            }.bind(this),
        onerror:function(err){
            this.errors.push(err);
        }
    }, {
        decodeEntities: true,
        recognizeSelfClosing:false
    });
    parser.write(input);
    parser.end();

    this.content = output;

    return this;
};

Sorcerer.prototype.wrapContent = function (){
    if(!this.content) return this;
    this.content = `<table><tbody>${this.content}</tbody></table>`;

    return this;
};

Sorcerer.prototype.get = function(){
    return this.content;
};

Sorcerer.prototype.abrakadabra = function (input){
    return this.reset()
        .parseContent(input)
        .wrapLines()
        .wrapContent().get();
};

module.exports = Sorcerer;
