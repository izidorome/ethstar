const express = require('express');
const app = express();
const port = 8080;

// This data should be placed at environment variables in a real app
var Web3 = require('web3');
var web3 = new Web3('https://rinkeby.infura.io/v3/5bd3c96bf68d406e86823288ae030026');
var abi = require('./abi');
var contract = new web3.eth.Contract(abi, '0xa738adf035bb98c126a47acf0a4dd155d3a9114e');

app.use(express.static('public'));
app.set('view engine')

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/star/:starId', async (req, res) => {
  let star = {};

  try {
    star = await contract.methods.tokenIdToStarInfo(req.params.starId).call();
  } catch (err) {
    console.log(err);
  }

  res.json(star);
});

app.listen(port, () => console.log(`Running on port ${port}!`));