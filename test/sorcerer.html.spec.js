var Sorcerer = require("../src/Sorcerer.js");
var Apprentice = require("../src/HtmlApprentice.js");

xdescribe("Abrakadabra with Html apprentice", function (){

    var inst = null;

    beforeEach(function (){
        inst = new Sorcerer();
        inst.withApprentice(new Apprentice({
            standalone:false,
            cssClassPrefix:null
        }));
    });

    it("should have correct output", function (){

        var output = inst.abrakadabra(
`<span</span>`);

        expect(output).toBe(
`<table class="content">
    <tbody>
        <tr>
            <td class="line-number">1</td>
            <td class="line-content"><span class="html-tag">&lt;span<&gt;</span><span class="html-tag">&lt;/span<&gt;</span></td>
        </tr>
    </tbody>
</table>`);

    });

});

