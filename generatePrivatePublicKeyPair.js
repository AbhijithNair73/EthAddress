const crypto = require('crypto');
const secp256k1 = require('secp256k1');
// const buf = crypto.randomBytes(32).toString('hex');

const generateKeyPair = function()
{
    const buf = crypto.randomBytes(32);
    // console.log('Private Key: ',buf);
    console.log('Private Key: ',buf.toString('hex'));
    // const privateKeyBuf = Buffer.from(buf, 'hex');
    // const publicKey = Buffer.from(secp256k1.publicKeyCreate(privateKeyBuf,false)).toString('hex');
    const publicKey = Buffer.from(secp256k1.publicKeyCreate(buf,false)).toString('hex');
    console.log('Public Key: ',publicKey);
    const slicedPubKey = publicKey.slice(2);
    return slicedPubKey;
    // console.log('Public Key Sliced : ',slicedPubKey);
}
module.exports.generateKeyPair = generateKeyPair;

// We can verify public key generation in bitaddress.org/walletdetails by passing private key
 