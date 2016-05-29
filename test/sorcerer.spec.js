var Sorcerer = require("../src/Sorcerer.js");

describe("Abrakadabra", function (){

    var inst = null;

    beforeEach(function (){
        inst = new Sorcerer();
    });

    // empty input should produce 1 line of empty content
    it("should handle empty input (undefined,null,empty)", function (){

        var output;
        output = inst.abrakadabra();
        expect(output).toBe("     1|");

        output = inst.abrakadabra("");
        expect(output).toBe("     1|");

        output = inst.abrakadabra(null);
        expect(output).toBe("     1|");
    });

    it("should return correct number of lines", function (){

        inst.abrakadabra("");
        expect(inst.lines).toBe(1);

        inst.abrakadabra("<span>");
        expect(inst.lines).toBe(1);

        inst.abrakadabra(`<span>
        <br>
        </span>`);
        expect(inst.lines).toBe(3);

    });

    it("should call reset", function (){

        spyOn(inst,"reset").and.callThrough();
        inst.abrakadabra("<span><span>");
        expect(inst.reset).toHaveBeenCalled();

    });

    it("should have correct output", function (){

        var output = inst.abrakadabra(
`<span>
    Some text <br>
</span>`);

        expect(output).toBe(
`     1|<span>
     2|    Some text <br>
     3|</span>`);

    });

});

