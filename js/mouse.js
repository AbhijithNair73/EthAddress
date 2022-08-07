const entropy = [];
let captureStart = false;
const MAX_LEN = 350; // size of entropy's array
document.addEventListener("mousemove", myFunction);
let percent = document.getElementById("percent");
let percentbar = document.getElementById("percentbar");

function myFunction(e) {
  if (entropy.length >= MAX_LEN) {
    createEthAddressFromEntropy();
    document.removeEventListener("mousemove", myFunction);
    return;
  }
  if (!captureStart) {
    return setTimeout(() => {
      captureStart = true;
    }, 1000); // capturing starts in 3 seconds to set the mouse cursor at random position...
  }
  const now = Date.now();
  if (now >= 1 && now % 5 !== 0) return;
  const iw = window.innerWidth;
  const ih = window.innerHeight;
  const iwPlusIh = iw + ih;
  const px = e.pageX;
  const py = e.pageY;
  const pxPlusPy = px + py;
  const ret = Math.round((pxPlusPy / iwPlusIh) * 255);
  entropy.push(ret);
  var percentage = ((entropy.length * 100) / MAX_LEN).toFixed(2);
  percent.innerText = percentage;
  percentbar.style.width =  percentage.toString()+"%";
  if (entropy.length >= MAX_LEN) {
    // console.log("entropy:", entropy);
    shuffle(entropy);
    // console.log("suffledEntropy:", entropy);
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

async function createEthAddressFromEntropy() 
{
  let beforeElem = document.getElementById("before");
  let afterElem = document.getElementById("after");
  let outEthElem = document.getElementById("output1");
  let outPrivElem = document.getElementById("output2");

  const Web3 = require('web3')
  const web3 = new Web3();
  const keccak256 = require('keccak256');
  const finalEntropy = keccak256(entropy);
  console.log("final entropy: ",finalEntropy);
  let accountDetail = await web3.eth.accounts.create(finalEntropy);
  beforeElem.setAttribute("hidden", "true");
  afterElem.removeAttribute("hidden");
  outEthElem.innerText = accountDetail.address;
  outPrivElem.innerText = accountDetail.privateKey;
  makeQR(accountDetail.address, "etherqr.png");
}

const makeQR = (url, filename) => {
  var qrcode = new QRCode("qrcode", {
    text: url,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  qrcode.makeCode(url);

  setTimeout(() => {
    let qelem = document.querySelector('#qrcode img');
    let dlink = document.getElementById("qrdl");
    let qr = qelem.getAttribute('src');
    dlink.setAttribute('href', qr);
    dlink.setAttribute('download','ether.png');
    dlink.removeAttribute('hidden');
  }, 500);
}
