// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTContract is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter _itemId;
    address _ownerAddress;

    constructor (address contractAddress) ERC721("rmNFT", "RNFT") {
        _ownerAddress = contractAddress;
    }

    function getOwner() public view returns(address){
        return _ownerAddress;
    }

    function mintNft(string memory tokenURI) public onlyOwner returns(uint256){
        _itemId.increment();

        // set item id;
        uint256 newItemId = _itemId.current();
        _mint(_ownerAddress, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}