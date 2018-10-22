pragma solidity ^0.4.24;

import "./StarBase.sol";

contract StarNotary is StarBase {
  mapping(uint => uint) public tokenIdToPrice;
  uint[] private _forSale;

  function putStarUpForSale(uint _tokenId, uint _price) public {
    require(_isApprovedOrOwner(msg.sender, _tokenId), "you are not authorized to put this token for sale");

    tokenIdToPrice[_tokenId] = _price;
    _forSale.push(_tokenId);
  }

  function buyStar(uint256 _tokenId) public payable {
    require(tokenIdToPrice[_tokenId] > 0, "not for sale");

    uint256 starCost = tokenIdToPrice[_tokenId];
    require(msg.value >= starCost, "Do you really think star is that cheap?");

    address starOwner = ownerOf(_tokenId);

    _removeTokenFrom(starOwner, _tokenId);
    _addTokenTo(msg.sender, _tokenId);

    _removeTokenFromExchange(_tokenId);

    starOwner.transfer(starCost);

    if(msg.value > starCost) {
      msg.sender.transfer(msg.value - starCost);
    }
  }

  function _removeTokenFromExchange(uint256 _tokenId) private {
    delete tokenIdToPrice[_tokenId];

    // here we could rebalance the array to hold only
    // the length of active token for sell, but I will
    // keep this way for simplicity
    for(uint i = 0; i < _forSale.length; i++) {
      if(_forSale[i] == _tokenId) {
        delete _forSale[i];
      }
    }
  }

  function starsForSale() external view returns (uint[]) {
    return _forSale;
  }
}