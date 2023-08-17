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

        throw new Error('Division not implemented for this FieldElement class');
    }

    pow(exponent) {
        const num = this.num ** exponent % this.prime;
        return new FieldElement(num, this.prime);
    }

    rMultiply(coefficient) {
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

        // 跳过无穷远点的检查
        if ((this.x === undefined || this.x === null) && (this.y === undefined || this.y === null)) {
            return;
        }

        // this.y ** 2n !== this.x ** 3n + this.a * this.x + b
        if (this.y.pow(2n).nonEquals(this.x.pow(3n).add(this.a.multiply(this.x)).add(b))) {
            throw new Error(`(${x}, ${y}) is not on the curve`);
        }
    }

    equals(other) {
        return this.x.equals(other.x)
            && this.y.equals(other.y)
            && this.a.equals(other.a )
            && this.b.equals(other.b);
    }

    nonEquals(other) {
        return !this.equals(other);
    }

    toString() {
        if (this.x === undefined || this.x === null) {
            return 'Point(infinity)';
        } else {
            return `Point(${this.x.toString()},${this.y.toString()})_${this.a.toString()}_${this.b.toString()}`;
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

        // Case 1: Result is point at infinity
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
            const s = (3n * this.x ** 2n + this.a) / (2n * this.y)
            // x3=s**2-2*x1
            const x = s ** 2n - 2n * this.x
            // y3=s*(x1-x3)-y1
            const y = s * (this.x - x) - this.y
            return new Point(x, y, this.a, this.b);
        }
    }

    // todo
    rmul(coefficient) {

    }

}

module.exports = {
    FieldElement,
    Point
};
