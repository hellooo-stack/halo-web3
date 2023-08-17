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

// todo
describe('PointTest', () => {

    test('test_ne', () => {
        const a = new Point(3, -7, 5,  7);
        const b = new Point(18, 77, 5, 7);
        expect(a.nonEquals(b)).toBeTruthy();
        expect(a.nonEquals(b)).toBeFalsy();
    });
});

// todo
describe('ECCTest', () => {

});


// https://github.com/jimmysong/pb-exercises/blob/master/session3/ecc.py



