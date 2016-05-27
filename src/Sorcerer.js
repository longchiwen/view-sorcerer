var htmlParser = require("htmlParser2");

function Sorcerer() {

    this.reset();
}

Sorcerer.prototype.reset = function (){
    this.lines = 0;
    this.errors = [];

    return this;
};

Sorcerer.prototype.parse = function (input){
    if(!input) return "";

    this.lines = 0;

    var output = "";
    var offset = 0;
    var lastPos = 0;
    while((lastPos = input.indexOf("\n", offset)) >= 0) {
        this.lines++;
        var lineOutput = this.parseLineContent(input.substring(offset,lastPos));
        output += `<tr><td class="line-number" value="${this.lines}"></td><td class="line-content"><span class="html-tag">${lineOutput}</span></td></tr>`;

        offset = lastPos;
    }

    return output;

};

Sorcerer.prototype.parseLineContent = function (input, lineNumber){
    if(!input) return "";

    var output = "";
    var parser = new htmlParser.Parser({
        onopentag: function (name, attribs){
                output += `<span class="html-tag">&lt;${name}&gt;</span>`;
            },

        ontext: function (text){
                output += text;
            },

        onclosetag: function (tagname){
            output += `<span class="html-tag">${tagname}</span>`;
        }
    }, {
        decodeEntities: true,
        recognizeSelfClosing:false
    });
    parser.write(input);
    parser.end();

    return output;
};

Sorcerer.prototype.wrap = function (input){
    return input;
};

Sorcerer.prototype.abrakadabra = function (input){
    return this.reset().wrap(this.parse(input));
};

module.exports = Sorcerer;
