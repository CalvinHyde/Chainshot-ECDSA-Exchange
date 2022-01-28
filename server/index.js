const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const EC = require('elliptic').ec;
const SHA256 = require("crypto-js/SHA256");
const ec = new EC('secp256k1');

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const balances = {}
for(let i =0; i<3; i++){
  const key = ec.genKeyPair();
  const publicKey = key.getPublic().encode('hex');

  balances[publicKey] = 100;

  console.log(`
  Public Key #${i} 100ETH ${publicKey}
  Private Key #${i} ${key.getPrivate().toString(16)}
  `)
}


app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address.toLowerCase()] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {tx, sig, publicKey} = req.body;

  const key = ec.keyFromPublic(publicKey, "hex");
  const hash= SHA256(JSON.stringify(tx)).toString();
  if(key.verify(hash,sig)){

    balances[publicKey] -= tx.amount;
    balances[tx.recipient] = (balances[tx.recipient] || 0) + +tx.amount;
    res.send({ balance: balances[publicKey] });
  }
else{
  res.send(400);
}
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
