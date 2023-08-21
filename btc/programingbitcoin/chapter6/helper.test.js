const {toBigIntLE, toBufferLE} = require("./helper");
describe('HelperTest', () => {

    test('toBigIntLE', () => {
        let h = Buffer.from('99c3980000000000', 'hex');
        let want = 10011545n;
        expect(toBigIntLE(h)).toBe(want);

        h = Buffer.from('a135ef0100000000', 'hex');
        want = 32454049n;
        expect(toBigIntLE(h)).toBe(want);
    });

    test('toBigIntBE', () => {
        let n = 1n;
        let want = Buffer.from('01000000', 'hex');
        expect(toBufferLE(n, 4)).toEqual(want);

        n = 10011545n;
        want = Buffer.from('99c3980000000000', 'hex');
        expect(toBufferLE(n, 8)).toEqual(want);
    });
});