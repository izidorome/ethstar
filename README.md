# Star Notary Ethereum

All hashes and addresses are placed at Rinkeby Network

## Contract Creation

### Address: 0xa738adf035bb98c126a47acf0a4dd155d3a9114e
### Transaction Hash: 0x672832088da58747405d3550ef8819ba5da79948962cd6172e0a2b18cc948ec8

## createStar

### Transaction Hash: 0x7b460548ae8cfaaef6d07cc9ba47d62ae4f594056e0a643bfa1ef88edc2cd698

## putStarUpForSale

### Transaction Hash: 0x7c409d1d08f4112882e63064cd945898706059c14041d1e61d37701eaaf1cd7d


# Frontend

To run the frontend code, after installing the npm packages run:

```
node app.js
```

This will open the code on port 8080

On the frontend client application, you can create a star, put it for sale and see the current stars for sale.
PS: Do not forget to point Metamask to the Rinkeby network.

# API

With the server running, go to `/star/:starID` to get a json response of star info.

# Running tests

To run the tests, you should `npm test` at the `smart_contracts` path.
You should have a ganache-cli running and points the config truffle.js file to it.