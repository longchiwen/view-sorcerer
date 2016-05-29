// list of void elements - https://www.w3.org/TR/html5/syntax.html#void-elements
const VoidTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];

module.exports = {
    leftPad:function(str,pad){
        return (pad + str).slice(-1 * pad.length);
    },
    isVoidTag:function(name){
        return VoidTags.indexOf(name.toLowerCase()) >= 0;
    }
};