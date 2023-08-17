class FieldElement {
    constructor(num, prime) {
        if (num >= prime || num < 0n) {
            throw new Error(`Num ${num} not in field range 0 to ${prime - 1n}`);
        }

        this.num = num;
        this.prime = prime;
    }

    toString() {
        return `FieldElement_${this.prime}(${this.num})`;
    }

    equals(other) {
        if (!other) {
            return false;
        }

        return this.num === other.num && this.prime === other.prime;
    }

    nonEquals(other) {
        return !this.equals(other);
    }

    add(other) {
        if (this.prime !== other.prime) {
            throw new Error('Cannot add two numbers in different Fields');
        }

        const num = (this.num + other.num) % this.prime;
        return new FieldElement(num, this.prime);
    }

    subtract(other) {
        if (this.prime !== other.prime) {
            throw new Error('Cannot subtract two numbers in different Fields');
        }

        let num = (this.num - other.num) % this.prime;
        num = (num + this.prime) % this.prime;
        return new FieldElement(num, this.prime);
    }

    multiply(other) {
        if (this.prime !== other.prime) {
            throw new Error('Cannot multiply two numbers in different Fields');
        }

        const num = (this.num * other.num) % this.prime;
        return new FieldElement(num, this.prime);
    }

    // todo
    div(other) {
        if (this.prime !== other.prime) {
            throw new Error('Cannot divide two numbers in different Fields');
        }

        const num = (this.num * (other.num ** (this.prime - 2n) % this.prime)) % this.prime;
        return new FieldElement(num, this.prime);
    }

    pow(exponent) {
        // exponent may be negative, we convert it to positive
        const m = this.prime - 1n;
        // in nodejs, we use this way to convert negative to positive
        let n = exponent % m;
        n = (n + m) % m;
        const num = this.num ** n % this.prime;
        return new FieldElement(num, this.prime);
    }

    rmul(coefficient) {
        const num = (this.num * coefficient) % this.prime;
        return new FieldElement(num, this.prime);
    }
}

// FieldElement Point
class Point {
    constructor(x, y, a, b) {
        this.a = a;
        this.b = b;
        this.x = x;
        this.y = y;

        // x being None and y being None represents the point at infinity
        // Check for that here since the equation below won't make sense
        // with None values for both.
        if ((this.x === undefined || this.x === null) && (this.y === undefined || this.y === null)) {
            return;
        }

        this.isValid();
    }

    isValid() {
        // make sure that the elliptic curve equation is satisfied
        // y**2 == x**3 + a*x + b
        if (this.y ** 2n !== this.x ** 3n + this.a * this.x + this.b) {
            throw new Error(`(${this.x}, ${this.y}) is not on the curve`);
        }
    }

    equals(other) {
        // todo: deep compare
        return this.x.equals(other.x)
            && this.y.equals(other.y)
            && this.a.equals(other.a)
            && this.b.equals(other.b);
    }

    nonEquals(other) {
        return !this.equals(other);
    }

    toString() {
        if (this.x === undefined || this.x === null) {
            return 'Point(infinity)';
        } else {
            return `Point(${this.x},${this.y})_${this.a}_${this.b}`;
        }
    }

    add(other) {
        if (this.a !== other.a || this.b !== other.b) {
            throw new Error(`Points ${toString()}, ${other.toString()} are not on the same curve'`);
        }

        // Case 0.0: this is the point at infinity, return other
        if (this.x === undefined || this.x === null) {
            return other;
        }

        // Case 0.1: other is the point at infinity, return this
        if (other.x === undefined || other.x === null) {
            return this;
        }

        // Case 1: self.x == other.x, self.y != other.y
        // Result is point at infinity
        if (this.x === other.x && this.y !== other.y) {
            return new Point(null, null, this.a, this.b);
        }

        // Case 2: this.x !== other.x
        if (this.x !== other.x) {
            // Formula: (x3, y3) == (x1, y1) + (x2, y2)
            // s=(y2-y1)/(x2-x1)
            const s = (other.y - this.y) / (other.x - this.x);
            // x3=x**2-x1-x2
            const x = s ** 2n - this.x - other.x;
            // y3=s*(x1-x3)-y1
            const y = s * (this.x - x) - this.y;
            return new Point(x, y, this.a, this.b);
        } else {
            // Case 3: this === other
            // Formula (x3,y3)=(x1,y1)+(x1,y1)
            // s=(3*x1**2+a)/(2*y1)
            const s = (3n * this.x ** 2n + this.a) / (2n * this.y);
            // x3=s**2-2*x1
            const x = s ** 2n - 2n * this.x;
            // y3=s*(x1-x3)-y1
            const y = s * (this.x - x) - this.y
            return new Point(x, y, this.a, this.b);
        }
    }

    rmul(coefficient) {
        let coef = coefficient;
        let current = this;
        // rmul calculates coefficient * this
        let result = new Point(null, null, this.a, this.b);

        while (coef) {
            if (coef & 1) {
                result += current;
            }

            current += current;
            coef >>= 1;
        }

        return result;
    }
}

class S256Field extends FieldElement {
    static A = 0;
    static B = 7;
    static P = 2n ** 256 - 2n ** 32n - 977n;
    static N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141;

    constructor(num) {
        super(num, S256Field.P);
    }

    hex() {
        return this.num.toString(16).padStart(64, '0');
    }

    toString() {
        return this.hex();
    }

    sqrt() {
        this.pow((S256Field.P + 1n) / 4n);
    }
}

class FinitePoint extends Point {
    constructor(x, y, a, b) {
        super(x, y, a, b);
    }

    isValid() {
        if (this.y.pow(2n).nonEquals(this.x.pow(3n).add(this.a.multiply(this.x)).add(b))) {
            throw new Error(`(${this.x}, ${this.y}) is not on the curve`);
        }
    }

    toString() {
        if (this.x === undefined || this.x === null) {
            return 'Point(infinity)';
        } else {
            return `Point(${this.x.num},${this.y.num})_${this.a.num}_${this.b.num}`;
        }
    }

    add(other) {
        if (this.a.nonEquals(other.a) || this.b.nonEquals(other.b)) {
            throw new Error(`Points ${toString()}, ${other.toString()} are not on the same curve'`);
        }

        // Case 0.0: this is the point at infinity, return other
        if (this.x === undefined || this.x === null) {
            return other;
        }

        // Case 0.1: other is the point at infinity, return this
        if (other.x === undefined || other.x === null) {
            return this;
        }

        // Case 1: self.x == other.x, self.y != other.y
        // Result is point at infinity
        if (this.x.equals(other.x) && this.y.nonEquals(other.y)) {
            return new Point(null, null, this.a, this.b);
        }

        // Case 2: this.x !== other.x
        if (this.x.nonEquals(other.x)) {
            // Formula: (x3, y3) == (x1, y1) + (x2, y2)
            // s=(y2-y1)/(x2-x1)
            const s = (other.y.subtract(this.y)).div(other.x.subtract(this.x));
            // x3=x**2-x1-x2
            const x = s.pow(2n).subtract(this.x).subtract(other.x);
            // y3=s*(x1-x3)-y1
            const y = s.multiply(this.x.subtract(x)).subtract(this.y);
            return new Point(x, y, this.a, this.b);
        } else {
            // Case 3: this === other
            // Formula (x3,y3)=(x1,y1)+(x1,y1)
            // s=(3*x1**2+a)/(2*y1)
            const s = (this.x.pow(2n).multiply(3n)).div(this.y.multiply(2n));
            // x3=s**2-2*x1
            const x = s.pow(2n).subtract(this.x.multiply(2n));
            // y3=s*(x1-x3)-y1
            const y = s.multiply(this.x.subtract(x)).subtract(this.y);
            return new Point(x, y, this.a, this.b);
        }
    }

    rmul(coefficient) {
        let coef = coefficient;
        let current = this;
        // rmul calculates coefficient * this
        let result = new Point(null, null, this.a, this.b);

        while (coef) {
            if (coef & 1) {
                result = result.add(current);
            }

            current = current.add(current);
            coef >>= 1;
        }

        return result;
    }


}

class S256Point extends Point {
    constructor(x, y) {
        super(new S256Field(x), new S256Field(y), new S256Field(S256Field.A), new S256Field(S256Field.B));
    }
}


module.exports = {
    FieldElement,
    Point,
    S256Field,

};
