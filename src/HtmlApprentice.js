var Base = require("./Apprentice.js");
var sass = require("node-sass");
var path = require("path");
var Entities = require("html-entities").AllHtmlEntities;
var entities = new Entities();

const DEFAULTS = {
    cssClassPrefix:"sorcerer",
    standalone:true
};

function HtmlApprentice(opt) {
    this.options = Object.assign(DEFAULTS,opt);

    this._classify = function(cssClass){
        if(!this.options.cssClassPrefix) return cssClass;
        return `${this.options.cssClassPrefix}-${cssClass}`;
    };

    this.encode = entities.encode;
}

HtmlApprentice.prototype = Object.create(Base.prototype);
HtmlApprentice.prototype.constructor = HtmlApprentice;

HtmlApprentice.prototype.brewContent = function(input){
    var content = `<table class="${this._classify("content")}"><tbody>${input}</tbody></table>`;

    if(this.options.standalone) {
        var styleResult = sass.renderSync({
            file:path.resolve(__dirname,"./HtmlApprentice.scss")
        });
        content = `<html>
    <head>
    <style>
${styleResult.css}
    </style>
    </head>
    <body class="${this._classify("standalone")}">
${content}
    </body>
</html>`;
    }
    return content;
};

HtmlApprentice.prototype.brewLine = function(input,lineNumber){
    return `${(lineNumber > 1)?"\n":""}         <tr>
            <td class="${this._classify("line-number")}">${lineNumber}</td>
            <td class="${this._classify("line-content")}">${input}</td>
        </tr>`;
};

HtmlApprentice.prototype.brewText = function(text){
    return `${text}`;
};

HtmlApprentice.prototype.brewOpenTag = function(tagName){
    var htmlTag = this.encode(`<${tagName}>`);
    return `<span class="${this._classify("html-tag")}">${htmlTag}</span>`;
};

HtmlApprentice.prototype.brewOpenTag = function(tagName,attributes){
    var attributesHtml = "";
    if(attributes.length > 0) {
        attributesHtml = " " + attributes.join(" ");
    }

    var htmlTag = this.encode(`<${tagName}`) + attributesHtml + this.encode(`>`);
    return `<span class="${this._classify("html-tag")}">${htmlTag}</span>`;
};

HtmlApprentice.prototype.brewCloseTag = function(tagName){
    var htmlTag = this.encode(`</${tagName}>`);
    return `<span class="${this._classify("html-tag")}">${htmlTag}</span>`;
};

HtmlApprentice.prototype.brewAttribute = function(name,value){
    var output = `<span class="${this._classify("html-attribute-name")}">${name}</span>`;
    output += `=`;
    output += `<span class="${this._classify("html-attribute-value")}">"${value}"</span>`;

    return output;
};

HtmlApprentice.prototype.brewCommentStart = function(text){
    return `<span class="${this._classify("html-comment")}">${this.encode("<!--")}${text}</span>`;
};

HtmlApprentice.prototype.brewCommentEnd = function(){
    return `<span class="${this._classify("html-comment")}">${this.encode("-->")}</span>`;
};

HtmlApprentice.prototype.brewCDataStart = function(){
    return `<span class="${this._classify("html-cdata")}">${this.encode("<![CDATA[")}</span>`;
};

HtmlApprentice.prototype.brewCDataEnd = function(){
    return `1<span class="${this._classify("html-cdata")}">${this.encode("]]>")}</span>`;
};

HtmlApprentice.prototype.brewProcessingInstruction = function(name,data){
    var htmlTag = this.encode(`<${data}>`);
    return `<span class="${this._classify("html-doctype")}">${htmlTag}</span>`;
};

module.exports = HtmlApprentice;
