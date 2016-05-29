var Base = require("../HtmlApprentice.js");

function ChromeApprentice() {
    Base.apply(this,arguments);
}

ChromeApprentice.prototype = Object.create(Base.prototype);
ChromeApprentice.prototype.constructor = ChromeApprentice;

module.exports = ChromeApprentice;