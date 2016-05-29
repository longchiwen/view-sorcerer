var htmlParser = require("htmlParser2");
var DefaultAprentice = require("./Apprentice.js");
var helpers = require("./Helpers.js");

const NEWLINE = "\n";

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

    var output = "";
    var offset = 0;
    var lastPos = input.indexOf(NEWLINE, offset);

    while(lastPos >= 0) {
        this.lines++;
        var lineOutput = input.substring(offset,lastPos);
        output += this.apprentice.brewLine(lineOutput,this.lines);
        offset = lastPos + NEWLINE.length;
        lastPos = input.indexOf(NEWLINE, offset);
    }

    if(offset < input.length || input.length === 0){
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
        onopentag: function (name,attributes){

            var attributePairs = [];
            var isVoidTag = helpers.isVoidTag(name);
            Object.keys(attributes||{}).forEach(function (key){
                attributePairs.push(this.apprentice.brewAttribute(key, attributes[key]));
            }.bind(this));
            output += this.apprentice.brewOpenTag(name,attributePairs,isVoidTag);

        }.bind(this),

        ontext: function (text){
            output += this.apprentice.brewText(text);
        }.bind(this),

        onclosetag: function (name){
            var isVoidTag = helpers.isVoidTag(name);

            // void tags should not have closing tag
            if(!isVoidTag) {
                output += this.apprentice.brewCloseTag(name);
            }
        }.bind(this),

        oncomment:function(data){
            output += this.apprentice.brewCommentStart(data);
        }.bind(this),

        oncommentend:function(){
            output += this.apprentice.brewCommentEnd();
        }.bind(this),

        oncdatastart:function(){
            output += this.apprentice.brewCDataStart();
        }.bind(this),

        oncdataend:function(){
            output += this.apprentice.brewCDataEnd();
        }.bind(this),

        onprocessinginstruction:function(name,data){
            output += this.apprentice.brewProcessingInstruction(name,data);
        }.bind(this),

        onerror:function(err){
            this.errors.push(err);
        }.bind(this)
    }, {
        decodeEntities: false
        //recognizeSelfClosing:true
    });
    parser.parseComplete(input);

    this.content = output;

    return this;
};

Sorcerer.prototype.wrapContent = function (){
    this.content = this.apprentice.brewContent(this.content);

    return this;
};

Sorcerer.prototype.get = function(){
    return this.content;
};

Sorcerer.prototype.abrakadabra = function (input){
    return this.reset()
        .parseContent(input||"")
        .wrapLines()
        .wrapContent().get();
};

module.exports = Sorcerer;
