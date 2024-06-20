// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {console} from "hardhat/console.sol";

contract UserStorage is Ownable {
  
  struct User {
    string username;
    string name;
    address addr;
    string profilePictureHash;
    uint subscribers;
    string bio;
  }

  mapping(address => User) addressToUser;
  mapping(string => address) usernameToAddress;

  constructor (address owner) Ownable(owner){}

  function _getByUsername (string memory _username) internal view returns (User storage) {
    return _getByAddress(usernameToAddress[_username]);
  }

  function getByUsername (string memory _username) external view returns (User memory) {
    User storage user = _getByUsername(_username);

    if (!_doesUserExist(user))
      revert("INEXISTENT_USER_ERROR");

    return user;
  }

  function _getByAddress (address _addr) internal view returns (User storage) {
    return addressToUser[_addr];
  }

  function getByAddress (address addr) external view returns (User memory) {
    User storage user = _getByAddress(addr);

    if (!_doesUserExist(user))
      revert("INEXISTENT_USER_ERROR");

    return user;
  }

  function store(address _userAddress,
                 string memory _username,
                 string memory _name,
                 string memory _bio,
                 string memory _profilePictureHash) public onlyOwner {
    if (_doesUserExist(_getByUsername(_username)) || _doesUserExist(_getByAddress(_userAddress)))
      revert("USER_ALREADY_REGISTERED_ERROR");

    User memory user = User({
      username: _username,
      addr: _userAddress,
      name: _name,
      bio: _bio,
      profilePictureHash: _profilePictureHash,
      subscribers: 0
    });
    addressToUser[_userAddress] = user;
    usernameToAddress[_username] = _userAddress;
  }

  function _doesUserExist(User memory _user) public pure returns (bool) {
    return _user.addr != address(0);
  }
}
