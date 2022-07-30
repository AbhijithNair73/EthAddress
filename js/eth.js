console.log("Welcome to publicKey2Eth");
var submit = document.getElementById('sbmtBtn');
submit.addEventListener('click', convertkey);

var reset = document.getElementById('RstBtn');
reset.addEventListener('click', clearAll);

function convertkey()
{
    const elems = document.getElementsByName("pubkey");
    let pubkeystr = elems[0].value;
    pubkeystr = pubkeystr.trim();
    console.log("Data: ",pubkeystr);
    if(pubkeystr !== "" && pubkeystr !== undefined && pubkeystr !== null)
    {
        const {generateEthAddFromPubkey} = require('../createEthAddressFromPubkey');
        document.getElementById("output").innerText = generateEthAddFromPubkey(pubkeystr);
    }
}

function clearAll()
{
    document.getElementById("output").value = "";
    const elems = document.getElementsByName("pubkey");
    elems[0].value = "";
}