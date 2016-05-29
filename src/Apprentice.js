var helpers = require("./Helpers.js");

function Apprentice() {

}

Apprentice.prototype.brewContent = function(input){
    return input;
};

Apprentice.prototype.brewLine = function(input,lineNumber){
    return `${(lineNumber > 1)?"\n":""}${helpers.leftPad(lineNumber,"      ")}|${input}`;
};

Apprentice.prototype.brewText = function(text){
    return text;
};

Apprentice.prototype.brewOpenTag = function(tagName,attributes){
    if(attributes.length === 0) return `<${tagName}>`;
    return `<${tagName} ${attributes.join(" ")}>`;
};

Apprentice.prototype.brewCloseTag = function(tagName){
    return `</${tagName}>`;
};

Apprentice.prototype.brewAttribute = function(name,value){
    return `${name}="${value}"`;
};

Apprentice.prototype.brewCommentStart = function(text){
    return `<!--${text}`;
};

Apprentice.prototype.brewCommentEnd = function(){
    return "-->";
};

Apprentice.prototype.brewCDataStart = function(){
    return "<![CDATA[";
};

Apprentice.prototype.brewCDataEnd = function(){
    return "]]>";
};

Apprentice.prototype.brewProcessingInstruction = function(name,data){
    return `<${data}>`;
};

module.exports = Apprentice;