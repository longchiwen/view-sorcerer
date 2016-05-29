var Base = require("./ApprenticeBase.js");

function HtmlApprentice() {

}

HtmlApprentice.prototype = Object.create(Base.prototype);
HtmlApprentice.prototype.constructor = HtmlApprentice;

HtmlApprentice.prototype.brewLine = function(input,lineNumber){
    return `<tr><td class="line-number">${lineNumber}</td><td class="line-content">${input}</td></tr>
`;
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
    output += `<span class="html-attribute-value">${value}</span>`;

    return output;
};

HtmlApprentice.prototype.brewComment = function(text){
    return `<span class="html-comment">${text}</span>`;
};

module.exports = HtmlApprentice;