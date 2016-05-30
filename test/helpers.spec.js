var helpers = require("../src/Helpers.js");

describe("Helpers", function (){


    // empty input should produce 1 line of empty content
    it("leftPad", function (){

        expect(helpers.leftPad("1"," ")).toBe("1");
        expect(helpers.leftPad("1","   ")).toBe("  1");
        expect(helpers.leftPad("123456","      ")).toBe("123456");

    });

});
