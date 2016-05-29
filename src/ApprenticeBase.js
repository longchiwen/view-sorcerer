function ApprenticeBase() {

}

ApprenticeBase.prototype.brewLine = function(input,lineNumber){
    return lineNumber + ":" + input;
};

ApprenticeBase.prototype.brewText = function(text){
    return text;
};

ApprenticeBase.prototype.brewOpenTag = function(tagName){
    return tagName;
};

ApprenticeBase.prototype.brewCloseTag = function(tagName){
    return tagName;
};

ApprenticeBase.prototype.brewAttribute = function(name,value){
    return name + "=" + value;
};

ApprenticeBase.prototype.brewComment = function(text){
    return text;
};

ApprenticeBase.prototype.brewCData = function(text){
    return text;
};


module.exports = ApprenticeBase;