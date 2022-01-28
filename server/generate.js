const EC = require('elliptic').ec;

const ec1 = new EC('secp256k1');
const ec2 = new EC('secp256k1');
const ec3 = new EC('secp256k1');

const key1 = ec1.genKeyPair();
const key2 = ec2.genKeyPair();
const key3 = ec3.genKeyPair();

const publicKey1 = key1.getPublic().encode('hex');
const publicKey2 = key2.getPublic().encode('hex');
const publicKey3 = key3.getPublic().encode('hex');

console.log({
  privateKey1: key1.getPrivate().toString(16),
  publicKey1
});
console.log({
  privateKey2: key2.getPrivate().toString(16),
  publicKey2
});
console.log({
  privateKey3: key3.getPrivate().toString(16),
  publicKey3
});


