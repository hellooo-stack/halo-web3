const FieldElement = require('./ecc');
describe('FieldElementTest', () => {

    test('test_ne', () => {
        const a = new FieldElement(2, 31);
        const b = new FieldElement(2, 31);
        const c = new FieldElement(15, 31);

        expect(a.equals(b)).toBeTruthy();
        expect(a.equals(c)).toBeFalsy();
        expect(!a.equals(b)).toBeFalsy();
    });

    test('test_add', () => {
        let a = new FieldElement(2, 31);
        let b = new FieldElement(15, 31);
        expect(a.add(b).equals(new FieldElement(17, 31))).toBeTruthy();

        a = new FieldElement(17, 31);
        b = new FieldElement(21, 31);
        expect(a.add(b).equals(new FieldElement(7, 31))).toBeTruthy();
    });

    test('test_mul', () => {
        let a = new FieldElement(24, 31);
        let b = new FieldElement(19, 31);
        expect(a.multiply(b).equals(new FieldElement(22, 31))).toBeTruthy();
    });

    test('test_sub', () => {
        let a = new FieldElement(29, 31);
        let b = new FieldElement(4, 31);
        expect(a.subtract(b).equals(new FieldElement(25, 31))).toBeTruthy();

        a = new FieldElement(15, 31);
        b = new FieldElement(30, 31);
        expect(a.subtract(b).equals(new FieldElement(16, 31))).toBeTruthy();
    });
});
