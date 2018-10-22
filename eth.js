const ContractAddress = "0xa738adf035bb98c126a47acf0a4dd155d3a9114e";

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
    updateStarsForSale();
  });
};

function claimButtonClicked() {
  let starDec = document.getElementById("star-dec-input").value;
  let starMag = document.getElementById("star-mag-input").value;
  let starCen = document.getElementById("star-cen-input").value;
  let starStory = document.getElementById("star-story-input").value;

  if (!starDec || !starMag || !starCen || !starStory) {
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
    if (!error) {
      document.getElementById("star-name").innerHTML = result[0];
      document.getElementById("star-story").innerHTML = result[1];
      document.getElementById("star-dec").innerHTML = result[2];
      document.getElementById("star-mag").innerHTML = result[3];
      document.getElementById("star-cen").innerHTML = result[4];
    } else {
      alert("There was an error getting this StarID");
    }
  });
}

function sellButtonClicked() {
  let starId = document.getElementById("sell-star-id").value;
  let price = document.getElementById("price-id").value;

  let priceInEth = web3.toWei(price, "ether");

  console.log(priceInEth);

  window.contract.putStarUpForSale(starId, priceInEth, (error, result) => {
    if (!error) {
      alert("Your star is for sale! Good Luck!");
    } else {
      alert("There was an error getting this StarID");
    }
  });
}

function updateStarsForSale() {
  window.contract.starsForSale((error, result) => {
    if (!error) {
      document.getElementById("stars-for-sale").innerHTML = "";
      let row = "<tr>";
      row += "<td>Star Name</td>";
      row += "<td>Story</td>";
      row += "<td>Dec.</td>";
      row += "<td>Mag.</td>";
      row += "<td>Cen.</td>";
      row += "<td>Price (ETH)</td>";
      row += "</tr>";
      document.getElementById("stars-for-sale").innerHTML += row;

      for (starId of result) {
        window.contract.tokenIdToStarInfo(parseInt(starId), (error, result) => {
          if (!error) {
            window.contract.tokenIdToPrice(parseInt(starId), (error, price) => {
              let priceInEth = web3.fromWei(parseInt(price), 'ether');

              let row = "<tr>";
              row += "<td>" + result[0] + "</td>";
              row += "<td>" + result[1] + "</td>";
              row += "<td>" + result[2] + "</td>";
              row += "<td>" + result[3] + "</td>";
              row += "<td>" + result[4] + "</td>";
              row += "<td>" + priceInEth + "</td>";
              row += "</tr>"
              document.getElementById("stars-for-sale").innerHTML += row;
            });
          }
        });

      }
    } else {
      alert("There was an error trying to fetch stars for sale");
    }
  });
}