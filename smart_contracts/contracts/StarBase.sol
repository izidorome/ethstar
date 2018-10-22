pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "./Utils.sol";

contract StarBase is ERC721, Utils, Ownable {
  struct Star {
    string story;
    string dec;
    string mag;
    string cen;
  }

  Star[] public stars;

  mapping(bytes32 => uint) hashToTokenId;

  function createStar(string _story, string _dec, string _mag, string _cen) external returns (uint) {
    bytes32 starHash = keccak256(abi.encodePacked(_dec, _mag, _cen));

    require(hashToTokenId[starHash] == 0, "Star already registered");

    Star memory star = Star(_story, _dec, _mag, _cen);
    uint starId = stars.push(star);

    hashToTokenId[starHash] = starId;
    _mint(msg.sender, starId);

    return starId;
  }

  function checkIfStarExist(string _dec, string _mag, string _cen) external view returns (bool) {
    bytes32 starHash = keccak256(abi.encodePacked(_dec, _mag, _cen));

    return hashToTokenId[starHash] > 0;
  }

  function tokenIdToStarInfo(uint _tokenId) external view returns (string, string, string, string, string) {
    require(ownerOf(_tokenId) != address(0), "Star not found");

    Star memory star = stars[_tokenId - 1];

    string memory name = strConcat("Star Power #", uint2str(_tokenId));

    return (name, star.story, star.dec, star.mag, star.cen);
  }

  function mint(address _to, uint _tokenId) public onlyOwner returns (bool) {
    _mint(_to, _tokenId);
    return true;
  }
}