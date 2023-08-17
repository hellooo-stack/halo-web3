const {Point} = require('./ecc');
describe('PointTest', () => {
    test('test_ne', () => {
        const a = new Point(3n, -7n, 5n, 7n);
        const b = new Point(18n, 77n, 5n, 7n);
        expect(a.nonEquals(b)).toBeTruthy();
        expect(a.nonEquals(a)).toBeFalsy();
    });
    test('test_on_curve', () => {
        expect(() => {
            new Point(-2n, 4n, 5n, 7n)
        }).toThrow(Error);

        new Point(3n, -7n, 5n, 7n);
        new Point(18n, 77n, 5n, 7n);
    });
    test('test_add0', () => {
        const a = new Point(null, null, 5n, 7n);
        const b = new Point(2n, 5n, 5n, 7n);
        const c = new Point(2n, -5n, 5n, 7n);
        expect(a.add(b).equals(b)).toBeTruthy();
        expect(b.add(a).equals(b)).toBeTruthy();
        expect(b.add(c).equals(a)).toBeTruthy();
    });
    test('test_add1', () => {
        const a = new Point(3n, 7n, 5n, 7n);
        const b = new Point(-1n, -1n, 5n, 7n);
        expect(a.add(b).equals(new Point(2n, -5n, 5n, 7n))).toBeTruthy();
    })
    test('test_add2', () => {
        const a = new Point(-1n, 1n, 5n, 7n)
        expect(a.add(a).equals(new Point(18n, -77n, 5n, 7n))).toBeTruthy();
    })
});
