pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "./Utils.sol";

contract StarBase is ERC721, Utils, Ownable {
  struct Star {
    string name;
    string story;
    string ra;
    string dec;
    string mag;
  }

  Star[] public stars;

  mapping(bytes32 => uint) hashToTokenId;

  function createStar(string _name, string _story, string _ra, string _dec, string _mag) external returns (uint) {
    bytes32 starHash = keccak256(abi.encodePacked(_ra, _dec, _mag));

    require(hashToTokenId[starHash] == 0, "Star already registered");

    Star memory star = Star(_name, _story, _ra, _dec, _mag);
    uint starId = stars.push(star);

    hashToTokenId[starHash] = starId;
    _mint(msg.sender, starId);

    return starId;
  }

  function checkIfStarExist(string _ra, string _dec, string _mag) external view returns (bool) {
    bytes32 starHash = keccak256(abi.encodePacked(_ra, _dec, _mag));

    return hashToTokenId[starHash] > 0;
  }

  function tokenIdToStarInfo(uint _tokenId) external view returns (string, string, string, string, string) {
    require(ownerOf(_tokenId) != address(0), "Star not found");

    Star memory star = stars[_tokenId - 1];

    return (star.name, star.story, star.ra, star.dec, star.mag);
  }

  function mint(address _to, uint _tokenId) public onlyOwner returns (bool) {
    _mint(_to, _tokenId);
    return true;
  }
}