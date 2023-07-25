class FieldElement {
    constructor(num, prime) {
        if (num >= prime || num < 0) {
            throw new Error(`Num ${num} not in field range 0 to ${prime - 1}`);
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
        throw new Error('Subtraction not implemented for this FieldElement class');
    }

    multiply(other) {
        if (this.prime !== other.prime) {
            throw new Error('Cannot multiply two numbers in different Fields');
        }
        throw new Error('Multiplication not implemented for this FieldElement class');
    }

    div(other) {
        if (this.prime !== other.prime) {
            throw new Error('Cannot divide two numbers in different Fields');
        }
        throw new Error('Division not implemented for this FieldElement class');
    }

    pow(exponent) {
        const n = exponent % (this.prime - 1);
        const num = Math.pow(this.num, n) % this.prime;
        return new FieldElement(num, this.prime);
    }
}

module.exports = FieldElement;
