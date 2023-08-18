const {Point, FieldElement, FinitePoint} = require('./ecc');

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

describe('FinitePointTest', () => {
    test('test_on_curve', () => {
        // tests the following points whether they are on the curve or not
        // on curve y^2=x^3-7 over F_223:
        // (192,105) (17,56) (200,119) (1,193) (42,99)
        // the ones that aren't should throw an Error
        const prime = 223n;
        const a = new FieldElement(0n, prime);
        const b = new FieldElement(7n, prime);

        const valid_points = [[192n, 105n], [17n, 56n], [1n, 193n]];
        const invalid_points = [[200n, 119n], [42n, 99n]];

        // iterate over valid points
        for (const validPoint of valid_points) {
            // Initialize points this way:
            // x = FieldElement(x_raw, prime)
            // y = FieldElement(y_raw, prime)
            // FinitePoint(x, y, a, b)
            const [x_raw, y_raw] = validPoint;
            const x = new FieldElement(x_raw, prime);
            const y = new FieldElement(y_raw, prime);
            // Creating the point should not result in an error
            new FinitePoint(x, y, a, b);
        }

        // iterate over invalid points
        for (const invalidPoint of invalid_points) {
            // Initialize points this way:
            // x = FieldElement(x_raw, prime)
            // y = FieldElement(y_raw, prime)
            // FinitePoint(x, y, a, b)
            const [x_raw, y_raw] = invalidPoint;
            const x = new FieldElement(x_raw, prime);
            const y = new FieldElement(y_raw, prime);
            // Check that creating the point results in an Error
            expect(() => {
                new FinitePoint(x, y, a, b);
            }).toThrow(Error);
        }
    });
    test('test_add', () => {
        // tests the following additions on curve y^2=x^3-7 over F_223:
        // (192,105) + (17,56)
        // (47,71) + (117,141)
        // (143,98) + (76,66)
        const prime = 223n;
        const a = new FieldElement(0n, prime);
        const b = new FieldElement(7n, prime);
        const additions = [
            // (x1, y1, x2, y2, x3, y3)
            [192n, 105n, 17n, 56n, 170n, 142n],
            [47n, 71n, 117n, 141n, 60n, 139n],
            [143n, 98n, 76n, 66n, 47n, 71n],
        ];
        // iterate over the additions
        for (const addition of additions) {
            // Initialize points this way:
            // x1 = FieldElement(x1_raw, prime)
            // y1 = FieldElement(y1_raw, prime)
            // p1 = Point(x1, y1, a, b)
            // x2 = FieldElement(x2_raw, prime)
            // y2 = FieldElement(y2_raw, prime)
            // p2 = Point(x2, y2, a, b)
            // x3 = FieldElement(x3_raw, prime)
            // y3 = FieldElement(y3_raw, prime)
            // p3 = Point(x3, y3, a, b)
            const [x1_raw, y1_raw, x2_raw, y2_raw, x3_raw, y3_raw] = addition;
            const x1 = new FieldElement(x1_raw, prime);
            const y1 = new FieldElement(y1_raw, prime);
            const p1 = new FinitePoint(x1, y1, a, b);
            const x2 = new FieldElement(x2_raw, prime);
            const y2 = new FieldElement(y2_raw, prime);
            const p2 = new FinitePoint(x2, y2, a, b);
            const x3 = new FieldElement(x3_raw, prime);
            const y3 = new FieldElement(y3_raw, prime);
            const p3 = new FinitePoint(x3, y3, a, b);
            const result = p1.add(p2);
            expect(result.equals(p3)).toBeTruthy();
        }
    });
    test('test_rmul', () => {
        // tests the following scalar multiplications
        // 2*(192,105)
        // 2*(143,98)
        // 2*(47,71)
        // 4*(47,71)
        // 8*(47,71)
        // 21*(47,71)
        const prime = 223n;
        const a = new FieldElement(0n, prime);
        const b = new FieldElement(7n, prime);

        const multiplications = [
            // (coefficient, x1, y1, x2, y2)
            [2n, 192n, 105n, 49n, 71n],
            [2n, 143n, 98n, 64n, 168n],
            [2n, 47n, 71n, 36n, 111n],
            [4n, 47n, 71n, 194n, 51n],
            [8n, 47n, 71n, 116n, 55n],
            [21n, 47n, 71n, null, null]
        ];
        for (const multiplication of multiplications) {
            const [s, x1_raw, y1_raw, x2_raw, y2_raw] = multiplication;
            // Initialize points this way:
            // x1 = FieldElement(x1_raw, prime)
            // y1 = FieldElement(y1_raw, prime)
            // FinitePoint(x1, y1, a, b)
            const x1 = new FieldElement(x1_raw, prime);
            const y1 = new FieldElement(y1_raw, prime);
            const p1 = new FinitePoint(x1, y1, a, b);
            let p2;
            // initialize the second point based on whether it's the point at infinity
            // x2 = FieldElement(x2_raw, prime)
            // y2 = FieldElement(y2_raw, prime)
            // p2 = Point(x2, y2, a, b)
            if (x2_raw === null) {
                p2 = new FinitePoint(null, null, a, b);
            } else {
                const x2 = new FieldElement(x2_raw, prime);
                const y2 = new FieldElement(y2_raw, prime);
                p2 = new FinitePoint(x2, y2, a, b);
            }

            expect(p1.rmul(s).equals(p2)).toBeTruthy();
        }
    });
});

// todo
describe('S256Test', () => {
});

describe('SignatureTest', () => {
//     todo
});

describe('PrivateKeyTest', () => {
//     todo
});


// https://github.com/jimmysong/pb-exercises/blob/master/session3/ecc.py



