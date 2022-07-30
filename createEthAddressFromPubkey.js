const keccak256 = require('keccak256');
const { toChecksumAddress } = require('ethereum-checksum-address');
// const {pubkey} = require('./generatePrivatePublicKeyPair');

const generateEthAddFromPubkey = function(publicKey)
{
    if (typeof publicKey === 'string' && publicKey !== "")
    {
        if(publicKey.startsWith("0x"))
        {
           publicKey = publicKey.slice(2)
        }
        if(publicKey.startsWith("04"))
        {
           publicKey = publicKey.slice(2)
        } 
        console.log("Public Key: ",publicKey);
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');
        const EthAddress = keccak256(publicKeyBuffer).toString('hex').slice(-40);
        const finalEthAddr = toChecksumAddress(EthAddress);
        console.log('Eth Addr: ',finalEthAddr);
        return finalEthAddr;
    } 
}

module.exports.generateEthAddFromPubkey = generateEthAddFromPubkey;

// Works and verified on : https://lab.miguelmota.com/ethereum-public-key-to-address/example/
// Git: https://github.com/miguelmota/ethereum-public-key-to-address