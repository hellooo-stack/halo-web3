const {Point, FieldElement} = require('./ecc');

describe('FieldElementTest', () => {

    test('test_ne', () => {
        const a = new FieldElement(2n, 31n);
        const b = new FieldElement(2n, 31n);
        const c = new FieldElement(15n, 31n);

        expect(a.equals(b)).toBeTruthy();
        expect(a.equals(c)).toBeFalsy();
        expect(!a.equals(b)).toBeFalsy();
    });

    test('test_add', () => {
        let a = new FieldElement(2n, 31n);
        let b = new FieldElement(15n, 31n);
        expect(a.add(b).equals(new FieldElement(17n, 31n))).toBeTruthy();

        a = new FieldElement(17n, 31n);
        b = new FieldElement(21n, 31n);
        expect(a.add(b).equals(new FieldElement(7n, 31n))).toBeTruthy();
    });

    test('test_sub', () => {
        let a = new FieldElement(29n, 31n);
        let b = new FieldElement(4n, 31n);
        expect(a.subtract(b).equals(new FieldElement(25n, 31n))).toBeTruthy();

        a = new FieldElement(15n, 31n);
        b = new FieldElement(30n, 31n);
        expect(a.subtract(b).equals(new FieldElement(16n, 31n))).toBeTruthy();
    });

    test('test_mul', () => {
        let a = new FieldElement(24n, 31n);
        let b = new FieldElement(19n, 31n);
        expect(a.multiply(b).equals(new FieldElement(22n, 31n))).toBeTruthy();
    });

    test('test_pow', () => {
        let a = new FieldElement(17n, 31n);
        expect(a.pow(3n).equals(new FieldElement(15n, 31n))).toBeTruthy();

        a = new FieldElement(5n, 31n);
        let b = new FieldElement(18n, 31n);
        expect(a.pow(5n).multiply(b).equals(new FieldElement(16n, 31n))).toBeTruthy();
    });

    test('test_div', () => {
        let a = new FieldElement(3n, 31n);
        let b = new FieldElement(24n, 31n);
        expect(a.div(b).equals(new FieldElement(4n, 31n))).toBeTruthy();
        a = new FieldElement(17n, 31n);
        expect(a.pow(-3n).equals(new FieldElement(29n, 31n))).toBeTruthy();
        a = new FieldElement(4n, 31n);
        b = new FieldElement(11n, 31n)
        expect(a.pow(-4n).multiply(b).equals(new FieldElement(13n, 31n))).toBeTruthy();
    });
});

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

// todo
describe('ECCTest', () => {
    test('test_on_curve', () => {

    })
});


// https://github.com/jimmysong/pb-exercises/blob/master/session3/ecc.py



