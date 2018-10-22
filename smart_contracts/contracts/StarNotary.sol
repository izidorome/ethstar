pragma solidity ^0.4.24;

contract StarNotary {
  struct Star {
    string name;
  }

  mapping(address => Star) public addressToStar;
  uint256 public currentVersion;

  constructor() public {
    currentVersion = 1;
  }


  function incrementVersion() external {
    currentVersion++;
  }
}