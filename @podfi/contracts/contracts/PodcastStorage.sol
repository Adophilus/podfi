// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PodcastStorage is Ownable {

  enum Type {
    Audio,
    Video
  }

  enum Status {
    StreamingNotStarted,
    StreamingStarted,
    StreamingEnded
  }

  struct Podcast {
    string id;
    address creatorAddress;
    string title;
    string description;
    string category;
    uint duration;
    string recordingHash;
    string streamingCode;
    Type type_;
    Status status;
    uint publishedAt;
    address[] listeners;
  }

  mapping(string => address) podcastIdToCreatorAddress;
  mapping(string => Podcast) podcastIdToPodcast;
  mapping(address => string[]) creatorAddressToPodcastIds;

  constructor (address owner) Ownable(owner){}
  
  function store(
    string memory _id,
    address _creatorAddress,
    string memory _title,
    string memory _description,
    string memory _category,
    uint _duration,
    string memory _recordingHash,
    string memory _streamingCode,
    Type _type,
    Status _status
  ) public onlyOwner {

    if (_doesPodcastExist(podcastIdToPodcast[_id]))
        revert('PODCAST_ID_TAKEN_ERROR');

      address[]  memory listeners;

    Podcast memory podcast = Podcast({
      id: _id,
      creatorAddress: _creatorAddress,
      title: _title,
      description: _description,
      category: _category,
      duration: _duration,
      recordingHash: _recordingHash,
      streamingCode: _streamingCode,
      type_: _type,
      status: _status,
      publishedAt: block.timestamp,
      listeners: listeners
    });

    podcastIdToCreatorAddress[_id] = _creatorAddress;
    podcastIdToPodcast[_id] = podcast;
    creatorAddressToPodcastIds[_creatorAddress].push(_id);
  }

  function update(
    string memory _id,
    string memory _title,
    string memory _description,
    string memory _category,
    uint _duration,
    string memory _recordingHash,
    string memory _streamingCode,
    Type _type,
    Status _status
  ) public onlyOwner  returns (string memory){

    if (!_doesPodcastExist(podcastIdToPodcast[_id]))
        revert('INEXISTENT_PODCAST_ERROR');

    Podcast storage podcast = podcastIdToPodcast[_id];
    podcast.title = _title;
    podcast.description = _description;
    podcast.duration = _duration;
    podcast.category = _category;
    podcast.recordingHash = _recordingHash;
    podcast.streamingCode = _streamingCode;
    podcast.type_ = _type;
    podcast.status = _status;

    return _id;
  }

  function _getPodcastById(string memory _id) internal view returns (Podcast memory){
    return podcastIdToPodcast[_id];
  }

  function getById(string memory _podcastId) external view returns (Podcast memory) {
    Podcast memory podcast = _getPodcastById(_podcastId);

    if (!_doesPodcastExist(podcast))
      revert('INEXISTENT_PODCAST_ERROR');

    return podcast;
  }

  function getByCreatorAddress(address _creatorAddress) public view returns  (Podcast[] memory) {
    string[] memory podcastIds = creatorAddressToPodcastIds[_creatorAddress];
    Podcast[] memory podcasts;

    for (uint i = 0; i < podcastIds.length; i++) {
      podcasts[i]=_getPodcastById(podcastIds[i]);
    }

    return podcasts;
  }

  function join(string memory _id, address _listener) external {
    Podcast memory podcast = _getPodcastById(_id);

    if (!_doesPodcastExist(podcast))
      revert("INEXISTENT_PODCAST_ERROR");


    if (_isListenerInPodcast(_listener, podcast))
      revert("LISTENER_ALREADY_IN_PODCAST_ERROR");

    // podcast.listeners.push(_listener);
  }

  function start (string memory _id, address _starterAddress) external {
    Podcast memory podcast = _getPodcastById(_id);
    if (!_doesPodcastExist(podcast))
      revert("INEXISTENT_PODCAST_ERROR");

    if (podcast.status != Status.StreamingNotStarted)
      revert("PODCAST_STREAMING_PAST_ERROR");

    if (podcast.creatorAddress != _starterAddress)
      revert("STARTER_IS_NOT_CREATOR");

    podcast.status = Status.StreamingStarted;
  }

  function end(string memory _id, address _enderAddress) external returns (Podcast memory){
    Podcast memory podcast = _getPodcastById(_id);
    if (!_doesPodcastExist(podcast))
      revert("INEXISTENT_PODCAST_ERROR");

    if (podcast.status != Status.StreamingStarted)
      revert("PODCAST_NOT_STARTED_ERROR");

    if (podcast.creatorAddress != _enderAddress)
      revert("ENDER_IS_NOT_CREATOR");

    podcast.status = Status.StreamingEnded;
    return podcast;
  }

  function _isListenerInPodcast(address _listener, Podcast memory _podcast) internal returns (bool){
    for (uint i = 0; i < _podcast.listeners.length; i++) {
      if (_podcast.listeners[i] == _listener) {
        return true;
      }
    }

    return false;
  }

  function _doesPodcastExist(Podcast memory _podcast) internal view returns (bool) {
    return _podcast.creatorAddress != address(0);
  }
}
