const {opHash160, opCheckSig, decodeNum} = require("./op");
const {SmartBuffer} = require("smart-buffer");
const {Script} = require("./script");
describe('ScriptTest', () => {

    test('parse', () => {
        const scriptPubkey = SmartBuffer.fromBuffer(
            Buffer.from(
                "6a47304402207899531a52d59a6de200179928ca900254a36b8dff8bb75f5f5d71b1cdc26125022008b422690b8461cb52c3cc30330b23d574351872b7c361e9aae3649071c1a7160121035d5c93d9ac96881f19ba1f686f15f009ded7c62efe85a872e6a19b43c15a2937",
                "hex"
            )
        );
        const script = Script.parse(scriptPubkey);
        let want = Buffer.from(
            "304402207899531a52d59a6de200179928ca900254a36b8dff8bb75f5f5d71b1cdc26125022008b422690b8461cb52c3cc30330b23d574351872b7c361e9aae3649071c1a71601",
            "hex"
        );
        expect((script.cmds[0]).data.equals(want)).toBe(true);
        want = Buffer.from(
            "035d5c93d9ac96881f19ba1f686f15f009ded7c62efe85a872e6a19b43c15a2937",
            "hex"
        );
        expect((script.cmds[1]).data.equals(want)).toBe(true);
    });

    test("serialize", () => {
        const want =
            "6a47304402207899531a52d59a6de200179928ca900254a36b8dff8bb75f5f5d71b1cdc26125022008b422690b8461cb52c3cc30330b23d574351872b7c361e9aae3649071c1a7160121035d5c93d9ac96881f19ba1f686f15f009ded7c62efe85a872e6a19b43c15a2937";
        const scriptPubkey = SmartBuffer.fromBuffer(Buffer.from(want, "hex"));
        const script = Script.parse(scriptPubkey);
        expect(script.serialize().toString("hex")).toBe(want);
    });
});