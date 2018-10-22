const ContractAddress = "0x2bdc9b2d3714d708ba248d2081b0e28f8ee8f389";

if (typeof web3 != 'undefined') {
  web3 = new Web3(web3.currentProvider) // what Metamask injected
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

window.onload = () => {
  web3.eth.getAccounts(function (error, accounts) {
    if (error) {
      console.log(error)
      return
    }

    web3.eth.defaultAccount = web3.eth.accounts[0];
    window.contract = web3.eth.contract(abi).at(ContractAddress);
  });
};

function claimButtonClicked() {
  let starDec = document.getElementById("star-dec-input").value;
  let starMag = document.getElementById("star-mag-input").value;
  let starCen = document.getElementById("star-cen-input").value;
  let starStory = document.getElementById("star-story-input").value;

  if(!starDec || !starMag || !starCen || !starStory) {
    alert("You should fill all fields");
    return false;
  }

  window.contract.createStar(starStory, `dec_${starDec}`, `mag_${starMag}`, `cen_${starCen}`, (error, result) => {
    if (!error) {
      alert("Star claimed!!");
    } else {
      console.log(error);
      alert("There was an error running the contract");
    }
  });
}

function searchButtonClicked() {
  let starId = document.getElementById("star-id").value;

  window.contract.tokenIdToStarInfo(starId, (error, result) => {
    console.log(result);
  });
}