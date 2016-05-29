var Base = require("./Apprentice.js");

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
}

HtmlApprentice.prototype = Object.create(Base.prototype);
HtmlApprentice.prototype.constructor = HtmlApprentice;

HtmlApprentice.prototype.brewContent = function(input){
    var content = `<table class="${this._classify("content")}">
    <tbody>
${input}
    </tbody>
</table>`;
    return content;
};

HtmlApprentice.prototype.brewLine = function(input,lineNumber){
    return `${(lineNumber > 1)?"\n":""}         <tr>
            <td class="${this._classify("line-number")}">${lineNumber}</td>
            <td class="${this._classify("line-content")}">${input}</td>
        </tr>`;
};

HtmlApprentice.prototype.brewOpenTag = function(tagName){
    return `<span class="html-tag">&lt;${tagName}&gt;</span>`;
};

HtmlApprentice.prototype.brewCloseTag = function(tagName){
    return `<span class="html-tag">&lt;/${tagName}&gt;</span>`;
};

HtmlApprentice.prototype.brewAttribute = function(name,value){
    var output = `<span class="html-attribute-name">${name}</span>`;
    output += `=`;
    output += `<span class="html-attribute-value">"${value}"</span>`;

    return output;
};

HtmlApprentice.prototype.brewCommentStart = function(text){
    return `<span class="html-comment"><!--${text}</span>`;
};

HtmlApprentice.prototype.brewCommentEnd = function(text){
    return `<span class="html-comment">--></span>`;
};

HtmlApprentice.prototype.brewCDataStart = function(){
    return "<![CDATA[";
};

HtmlApprentice.prototype.brewCDataEnd = function(){
    return "]]>";
};

HtmlApprentice.prototype.brewProcessingInstruction = function(name,data){
    return `<${data}>`;
};

module.exports = HtmlApprentice;