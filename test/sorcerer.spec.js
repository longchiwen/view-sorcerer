var Sorcerer = require("../src/Sorcerer.js");

describe("Abrakadabra", function (){

    var inst = null;

    beforeAll(function (){
        inst = new Sorcerer();
    });

    it("should handle empty input (undefined,null,empty)", function (){

        var output;
        output = inst.abrakadabra();
        expect(output).toBe("");

        output = inst.abrakadabra("");
        expect(output).toBe("");

        output = inst.abrakadabra(null);
        expect(output).toBe("");
    });

    it("should return corrent number of lines", function (){

        inst.abrakadabra("<span>");
        expect(inst.lines).toBe(1);

        inst.abrakadabra(`<span>
        <br>
        </span>`);
        expect(inst.lines).toBe(3);

    });

});

