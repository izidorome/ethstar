if(typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider) // what Metamask injected
} else {
    // Instantiate and set Ganache as your provider
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

// The default (top) wallet account from a list of test accounts
web3.eth.defaultAccount = web3.eth.accounts[0];

// The interface definition for your smart contract (the ABI)
var StarNotary = web3.eth.contract(abi);

// Grab the contract at specified deployed address with the interface defined by the ABI
var starNotary = StarNotary.at('0x83b0a6520d77d2568050caf8bf8efda77014f1c1');

starNotary.currentVersion( (error, result) => {
  alert(result.toString());
});

// Get and display star name
// starNotary.starName(function (error, result) {
//     if (!error) {
//         document.getElementById('star-name').innerText = result
//     } else {
//         console.log(error);
//     }
// });

// Get and display star owner
// starNotary.starOwner(function (error, result) {
//     if (!error) {
//         document.getElementById('star-owner').innerText = result
//     } else {
//         console.log(error);
//     }
// });

// Enable claim button being clicked
function claimButtonClicked() {
    web3.eth.getAccounts(function(error, accounts) {
        if (error) {
            console.log(error)
            return
        }
        var account = accounts[0]
        starNotary.incrementVersion(function (error, result) {
            if (!error) {
                console.log(result);
                // var starClaimedEvent = starNotary.starClaimed({from: account});
                // starClaimedEvent.watch(function(error, result) {
                //     if (!error) {
                //         location.reload();
                //     } else {
                //         console.log('watching for star claimed event is failing');
                //     }
                // });
            } else {
                console.log(error);
            }
        });

    })
}