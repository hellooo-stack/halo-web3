const {opCheckSig, decodeNum, opHash160} = require("./op");

describe('OpTest', () => {

    test('op_hash160', () => {
        const stack = [Buffer.from('hello world', 'ascii')];
        expect(opHash160(stack)).toBeTruthy();
        expect(stack[0].toString('hex')).toBe('d7d5ee7824ff93f94c3055af9382c86c68b5ca92');
    });

    test('op_checksig', () => {
        const z = 0x7c076ff316692a3d7eb3c3bb0f8b1488cf72e1afcd929e29307032997a838a3dn
        const sec = Buffer.from('04887387e452b8eacc4acfde10d9aaf7f6d9a0f975aabb10d006e4da568744d06c61de6d95231cd89026e286df3b6ae4a894a3378e393e93a0f45b666329a0ae34', 'hex');
        const sig = Buffer.from('3045022000eff69ef2b1bd93a66ed5219add4fb51e11a840f404876325a1e8ffe0529a2c022100c7207fee197d27c618aea621406f6bf5ef6fca38681d82b2f06fddbdce6feab601', 'hex');
        const stack = [sig, sec];
        expect(opCheckSig(stack, z)).toBeTruthy();
        expect(decodeNum(stack[0])).toBe(1);
    });
});