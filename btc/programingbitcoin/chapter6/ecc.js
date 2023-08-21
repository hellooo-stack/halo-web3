const {bigIntToBuffer, bufferToBigInt, randomInt, randomBigInt} = require("./numbers");
const crypto = require("crypto");
const {encodeBase58Checksum, hash160, pow} = require("./helper");
const {SmartBuffer} = require("smart-buffer");

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

    div(other) {
        if (this.prime !== other.prime) {
            throw new Error('Cannot divide two numbers in different Fields');
        }

        const num = (this.num * pow(other.num, this.prime - 2n, this.prime)) % this.prime;

        return new FieldElement(num, this.prime);
    }

    pow(exponent) {
        // exponent may be negative, we convert it to positive
        const m = this.prime - 1n;
        // in nodejs, we use this way to convert negative to positive
        let n = exponent % m;
        n = (n + m) % m;
        let num;
        try {
            num = this.num ** n % this.prime;
        } catch (e) {
            console.log(e);
        }
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
        return this.x === other.x && this.y === other.y && this.a === other.a && this.b === other.b;
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

class FinitePoint extends Point {
    constructor(x, y, a, b) {
        super(x, y, a, b);
    }

    isValid() {
        if (this.y.pow(2n).nonEquals(this.x.pow(3n).add(this.a.multiply(this.x)).add(this.b))) {
            throw new Error(`(${this.x}, ${this.y}) is not on the curve`);
        }
    }

    equals(other) {
        return (this.x == null && other.x == null && this.y == null && other.y == null && this.a.equals(other.a) && this.b.equals(other.b))
            || (this.x.equals(other.x) && this.y.equals(other.y) && this.a.equals(other.a) && this.b.equals(other.b));
    }

    toString() {
        if (this.x === undefined || this.x === null) {
            return 'FinitePoint(infinity)';
        } else {
            return `FinitePoint(${this.x.num},${this.y.num})_${this.a.num}_${this.b.num}`;
        }
    }

    add(other) {
        if (this.a.nonEquals(other.a) || this.b.nonEquals(other.b)) {
            throw new Error(`FinitePoint ${toString()}, ${other.toString()} are not on the same curve'`);
        }

        // Case 0.0: this is the point at infinity, return other
        if (this.x === undefined || this.x === null) {
            return other;
        }

        // Case 0.1: other is the point at infinity, return this
        if (other.x === undefined || other.x === null) {
            return this;
        }

        // Case 1: this.x == other.x, this.y != other.y
        // Result is point at infinity
        if (this.x.equals(other.x) && this.y.nonEquals(other.y)) {
            return new FinitePoint(null, null, this.a, this.b);
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
            return new FinitePoint(x, y, this.a, this.b);
        } else {
            // Case 3: this === other
            // Formula (x3,y3)=(x1,y1)+(x1,y1)
            // s=(3*x1**2+a)/(2*y1)
            const s = this.x.pow(2n).rmul(3n).div(this.y.rmul(2n));
            // const s = (this.x.pow(2n).multiply(3n)).div();
            // x3=s**2-2*x1
            const x = s.pow(2n).subtract(this.x.rmul(2n));
            // y3=s*(x1-x3)-y1
            const y = s.multiply(this.x.subtract(x)).subtract(this.y);
            return new FinitePoint(x, y, this.a, this.b);
        }
    }

    rmul(coefficient) {
        let coef = coefficient;
        let current = this;
        // rmul calculates coefficient * this
        let result = new FinitePoint(null, null, this.a, this.b);

        while (coef) {
            if (coef & 1n) {
                result = result.add(current);
            }

            current = current.add(current);
            coef >>= 1n;
        }

        return result;
    }
}

class S256Field extends FieldElement {
    static A = 0n;
    static B = 7n;
    static P = 2n ** 256n - 2n ** 32n - 977n;
    static N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141n;

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

class S256Point extends FinitePoint {
    constructor(x, y) {
        super(new S256Field(x), new S256Field(y), new S256Field(S256Field.A), new S256Field(S256Field.B));
    }

    toString() {
        if (this.x == null) {
            return 'S256Point(infinity)';
        } else {
            return `S256Point(${this.x.num}, ${this.y.num})`;
        }
    }

    rmul(coefficient) {
        const coef = coefficient % S256Field.N;
        const finitePoint = super.rmul(coef);
        return new S256Point(finitePoint.x.num, finitePoint.y.num);
    }

    sec(compressed = true) {
        if (compressed) {
            if (this.y.num % 2 === 0) {
                return Buffer.concat([Buffer.alloc(1, 0x02), bigIntToBuffer(this.x.num)]);
            } else {
                return Buffer.concat([Buffer.alloc(1, 0x03), bigIntToBuffer(this.x.num)]);
            }
        } else {
            return Buffer.concat([Buffer.alloc(1, 0x04), bigIntToBuffer(this.x.num)]);
        }
    }

    address(compressed = true, network = 'mainnet') {
        const sec = this.sec(compressed);
        const h160 = hash160(sec);

        let prefix;
        if (network === 'testnet' || network === 'signet') {
            prefix = Buffer.alloc(1, 0x6f);
        } else {
            prefix = Buffer.alloc(1, 0x00);
        }

        return encodeBase58Checksum(Buffer.concat([prefix, h160]));
    }

    verify(z, sig) {
//        remember sig.r and sig.s are the main things we're checking
//        remember 1/s = pow(s, -1, N)
        const sInv = pow(sig.s, S256Field.N - 2n, S256Field.N);
//        u = z / s
        const u = z * sInv % S256Field.N;
//        v = r / s
        const v = sig.r * sInv % S256Field.N;
//        u*G + v*P should have as the x coordinate, r
        const total = G.rmul(u).add(this.rmul(v));
        return total.x.num === sig.r;
    }

    // parse S256Point from sec binary data
    // sec_bin is hex string
    static parse(sec_bin) {
        if (sec_bin.startsWith('0x')) {
            sec_bin = sec_bin.substring(2);
        }
        const secBinBuffer = Buffer.from(sec_bin, 'hex');

        // compressed
        if (secBinBuffer[0] === 4) {
            const xBuffer = secBinBuffer.subarray(1, 33);
            const x = BigInt('0x' + xBuffer.toString('hex'));

            const yBuffer = secBinBuffer.subarray(33);
            const y = BigInt('0x' + yBuffer.toString('hex'));

            return new S256Point(x, y);
        }

        const isEven = secBinBuffer[0] === 2;
        const xBuffer = secBinBuffer.subarray(1, 33);
        const x = BigInt('0x' + xBuffer.toString('hex'));
        const xField = new S256Field(x);
        // right side of the equation y^2 = x^3 + 7
        const alpha = xField.pow(3n).add(new S256Field(S256Field.B));
        // solve for left side
        const beta = alpha.sqrt();

        let even_beta;
        let odd_beta;
        if (beta.num % 2n === 0n) {
            even_beta = beta;
            odd_beta = new S256Field(S256Field.P - beta.num);
        } else {
            even_beta = new S256Field(S256Field.P - beta.num);
            odd_beta = beta;
        }

        if (isEven) {
            return new S256Point(xField, even_beta);
        } else {
            return new S256Point(xField, odd_beta);
        }
    }
}

class Signature {
    constructor(r, s) {
        // r: BigInt, s: BigInt
        this.r = r;
        this.s = s;
    }

    toString() {
        return `Signature(${this.r}, ${this.s})`;
    }

    der() {
        let result;

        // convert the r part to bytes
        let rBin = this.r.toString(16).padStart(64, '0');
        let rBinBuffer = Buffer.from(rBin, 'hex');
        // if rbin has a high bit, add a 00
        if (rBinBuffer[0] >= 128) {
            rBinBuffer = Buffer.concat([Buffer.from([0]), rBinBuffer]);
        }

        result = Buffer.concat([Buffer.from([2]), Buffer.from([rBinBuffer.length]), rBinBuffer]);

        let sBin = this.s.toString(16).padStart(64, '0');
        let sBinBuffer = Buffer.from(sBin, 'hex');
        if (sBinBuffer[0] >= 128) {
            sBinBuffer = Buffer.concat([Buffer.from([0]), sBinBuffer]);
        }
        result = Buffer.concat([result, Buffer.from([2]), Buffer.from([sBinBuffer.length]), sBinBuffer]);

        return Buffer.concat([Buffer.alloc(1, 0x30), Buffer.from([result.length]), result]);
    }

    static parse(signature) {
        const sig = SmartBuffer.fromBuffer(signature);
        const compound = sig.readUInt8();
        if (compound !== 0x30) {
            throw Error("Bad Signature compound");
        }
        const length = sig.readUInt8();
        if (length + 2 !== signature.length) {
            throw Error("Bad Signature Length");
        }
        let marker = sig.readUInt8();
        if (marker !== 0x02) {
            throw Error("Bad Signature marker");
        }
        const rlength = sig.readUInt8();
        const r = bufferToBigInt(sig.readBuffer(rlength));
        marker = sig.readUInt8();
        if (marker !== 0x02) {
            throw Error("Bad Signature marker");
        }
        const slength = sig.readUInt8();
        const s = bufferToBigInt(sig.readBuffer(slength));
        if (signature.length !== 6 + rlength + slength) {
            throw Error("Signature too long");
        }
        return new Signature(r, s);
    }
}

// Generator Point
const G = new S256Point(0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798n, 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8n);

class PrivateKey {
    constructor(secret) {
        this.secret = secret;
        this.point = G.rmul(secret);
    }

    hex() {
        return this.secret.toString(16).padStart(64, '0');
    }

    sign(z) {
//        we need a random number k
        const k = this.deterministicK(z);
//        r is the x coordinate of the resulting point k*G
        const r = G.rmul(k).x.num;
//        remember 1/k = pow(k, -1, N)
        const kInv = pow(k, S256Field.N - 2n, S256Field.N);
        let s = (z + r * this.secret) * kInv % S256Field.N;
        if (s > S256Field.N / 2n) {
            s = S256Field.N - s;
        }
        return new Signature(r, s);
    }

    deterministicK(z) {
        let k = Buffer.alloc(32, 0x00);
        let v = Buffer.alloc(32, 0x01);
        if (z > S256Field.N) {
            z = -S256Field.N;
        }

        const zBytes = bigIntToBuffer(z);
        const secretBytes = bigIntToBuffer(this.secret);

        k = crypto.createHmac('sha256', k)
            .update(Buffer.concat([v, Buffer.from([0]), secretBytes, zBytes]))
            .digest();
        v = crypto.createHmac('sha256', k)
            .update(v)
            .digest();
        k = crypto.createHmac('sha256', k)
            .update(Buffer.concat([v, Buffer.from([1]), secretBytes, zBytes]))
            .digest();
        v = crypto.createHmac('sha256', k)
            .update(v)
            .digest();

        while (true) {
            v = crypto.createHmac('sha256', k)
                .update(v)
                .digest();
            const candidate = bufferToBigInt(v);
            if (candidate >= 1n && candidate < S256Field.N) {
                return candidate;
            }
            k = crypto.createHmac('sha256', k)
                .update(Buffer.concat([v, Buffer.from([0])]))
                .digest();
            v = crypto.createHmac('sha256', k)
                .update(v)
                .digest();
        }
    }

    wif(compressed = true, testnet = false) {
        const secretBytes = bigIntToBuffer(this.secret);

        let prefix, suffix;
        if (testnet) {
            prefix = Buffer.from([0xef]);
        } else {
            prefix = Buffer.from([0x80]);
        }

        if (compressed) {
            suffix = Buffer.from([0x01]);
        } else {
            suffix = Buffer.alloc(0);
        }

        const wifBytes = Buffer.concat([prefix, secretBytes, suffix]);
        return encodeBase58Checksum(wifBytes);
    }
}

module.exports = {
    FieldElement,
    Point,
    FinitePoint,
    S256Field,
    S256Point,
    Signature,
    PrivateKey
};
