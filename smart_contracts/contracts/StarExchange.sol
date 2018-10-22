pragma solidity ^0.4.24;

import "./StarBase.sol";

contract StarExchange is StarBase {
  mapping(uint => uint) public starsForSale;

  function putStarUpForSale(uint _tokenId, uint _price) public {
    require(_isApprovedOrOwner(msg.sender, _tokenId), "you are not authorized to put this token for sale");

    starsForSale[_tokenId] = _price;
  }

  function buyStar(uint256 _tokenId) public payable {
    require(starsForSale[_tokenId] > 0, "not for sale");

    uint256 starCost = starsForSale[_tokenId];
    require(msg.value >= starCost, "Do you really think star is that cheap?");

    address starOwner = ownerOf(_tokenId);

    _removeTokenFrom(starOwner, _tokenId);
    _addTokenTo(msg.sender, _tokenId);

    starOwner.transfer(starCost);

    if(msg.value > starCost) {
      msg.sender.transfer(msg.value - starCost);
    }
  }
}