var Sorcerer = require("../src/Sorcerer.js");

describe("Parsing of single line", function (){

    var funct = null;

    beforeAll(function (){
        var inst = new Sorcerer();
        funct = inst.parseLineContent;
    });

    it("should handle empty input (undefined,null,empty)", function (){

        var output;
        output = funct();
        expect(output).toBe("");

        output = funct("");
        expect(output).toBe("");

        output = funct(null);
        expect(output).toBe("");
    });

    it("should create html-tag wrapper for node", function (){

        var output;
        output = funct("<span>");
        expect(output).toBe(`<span class="html-tag">&lt;span&gt;</span>`);

    });

});

