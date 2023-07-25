const FieldElement = require('./ecc');
describe('FieldElementTest', () => {

    test('test ne', () => {
        const a = new FieldElement(2, 31)
        const b = new FieldElement(2, 31)
        const c = new FieldElement(15, 31)

        expect(a.equals(b)).toBeTruthy();
        expect(a.equals(c)).toBeFalsy();
        expect(!a.equals(b)).toBeFalsy();
    });
});
