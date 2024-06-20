// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { UserStorage} from "./UserStorage.sol";
import { PodcastStorage} from "./PodcastStorage.sol";
import { PodToken} from "./PodToken.sol";

contract Podfi {
  UserStorage userStorage;
  PodcastStorage podcastStorage;
  mapping(address => PodToken) userToPodToken;

  event PodcastSetup(string title, string description, string category, string creatorUsername);
  event UserRegistered(string username, string name, string bio, string profilePictureHash);

  function registerUser(string memory _username,
                        string memory _name,
                        string memory _bio,
                        string memory _profilePictureHash) external{
                          address _userAddress = msg.sender;
    userStorage.store(_userAddress,
                      _username,
                      _name,
                      _bio,
                      _profilePictureHash);
                      emit UserRegistered(_username, _name, _bio, _profilePictureHash);
                      userToPodToken[_userAddress] = new PodToken();
  }

  function getUserProfile() public view returns (UserStorage.User memory) {
    return userStorage.getByAddress(msg.sender);
  }

  function getUserByUsername(string memory _username) external view returns (UserStorage.User memory) {
    return userStorage.getByUsername(_username);
  }

  function getUserPodcastsByUsername(string memory _username) external view returns (PodcastStorage.Podcast[] memory) {
    UserStorage.User memory user = userStorage.getByUsername(_username);
    return podcastStorage.getByCreatorAddress(user.addr);
  }

  function setupPodcast (string memory _id,
                         string memory _title,
                         string memory _description,
                         string memory _category
    ) public {
      UserStorage.User memory creator = userStorage.getByAddress(msg.sender);

    podcastStorage.store(_id,
                         creator.addr,
                         _title,
                         _description,
                         _category,
                         0,
                         "",
                         "",
                         PodcastStorage.Type.Video,
                         PodcastStorage.Status.StreamingNotStarted);
                         
                         emit PodcastSetup(_title, _description, _category, creator.username);
  }

  function startPodcast (string memory _id) external {
    podcastStorage.start(_id, msg.sender);
  }

  function joinPodcast(string memory _id) external {
    podcastStorage.join(_id, msg.sender);
  }

  function endPodcast (string memory _id) external {
    PodcastStorage.Podcast memory podcast = podcastStorage.end(_id, msg.sender);
    _rewardListeners(podcast);
  }

  function _rewardListeners(PodcastStorage.Podcast memory _podcast) internal {
    for (uint i = 0; i < _podcast.listeners.length; i++) {
      address listener = _podcast.listeners[i];
      userToPodToken[_podcast.creatorAddress].mint(listener, 10 * 1 ether);
    }
  }
}

