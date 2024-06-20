# PodFi Platform Overview

PodFi is an innovative platform designed to revolutionize the podcasting industry through blockchain technology. It integrates user and content management systems, token-based incentives, and decentralized governance to create a vibrant and interactive ecosystem for both listeners and creators. Additionally, PodFi provides a seamless connection between brands and podcasters, allowing for effective advertising and engagement.

## User Storage

The `UserStorage` contract is responsible for managing user data on the PodFi platform. It includes functionality to store, retrieve, and update user information securely.

### User Structure

- `username`: The unique username of the user.
- `name`: The full name of the user.
- `addr`: The Ethereum address of the user.
- `profilePictureHash`: The IPFS hash of the user's profile picture.
- `subscribers`: The number of subscribers the user has.
- `bio`: A short biography of the user.

### User Management Functions

- `getByUsername`: Retrieves a user by their username.
- `getByAddress`: Retrieves a user by their Ethereum address.
- `store`: Stores a new user's information.
- `_doesUserExist`: Checks if a user exists.

### Example

```solidity
UserStorage userStorage = new UserStorage(ownerAddress);

// Storing a new user
userStorage.store(
    userAddress,
    "john_doe",
    "John Doe",
    "Podcaster and tech enthusiast",
    "QmHashOfProfilePicture"
);
```
```
// Retrieving a user by username
UserStorage.User memory user = userStorage.getByUsername("john_doe");

```

## Podcast Storage
The PodcastStorage contract is responsible for managing podcast data. It includes functionality to store, update, and retrieve podcast information securely.


### Podcast Structure
`id`: The unique identifier of the podcast.
`creatorAddress:` The Ethereum address of the podcast creator.
`title`: The title of the podcast.
`description`: A description of the podcast.
`duration`: The duration of the podcast in seconds.
`recordingHash`: The IPFS hash of the podcast recording.
`streamingCode`: The streaming code for live podcasts.
`type_`: The type of the podcast (Audio/Video).
`status:` The streaming status of the podcast.
`publishedAt`: The timestamp when the podcast was published


### Podcast Management Functions
`store:` Stores a new podcast's information.
`update:` Updates an existing podcast's information.
`getById:` Retrieves a podcast by its unique identifier.
`getByCreatorAddress:`Retrieves all podcasts created by a specific address.
`_doesPodcastExist:` Checks if a podcast exists.


```solidity
PodcastStorage podcastStorage = new PodcastStorage(ownerAddress);

// Storing a new podcast
podcastStorage.store(
    "podcast1",
    creatorAddress,
    "The Tech Talk",
    "A podcast about the latest in tech",
    3600,
    "QmHashOfRecording",
    "streamingCode123",
    PodcastStorage.Type.Audio,
    PodcastStorage.Status.StreamingNotStarted
);

// Retrieving a podcast by ID
PodcastStorage.Podcast memory podcast = podcastStorage.getById("podcast1");

```



### Tokenomics and Rewards
PodFi uses its native token, PodToken (POD), to incentivize users and facilitate transactions within the ecosystem.

### Listener Rewards
Listeners can earn POD tokens through various interactions on the platform:

* Listening: Users earn POD tokens based on the number of hours they listen to podcasts. The reward rate is 1 POD per hour.
* Liking: Users receive 0.1 POD for each like they give to a podcast.
* Commenting: Users earn 0.5 POD for each comment they make on a podcast.
* Sharing: Users receive 2 POD for sharing a podcast.

```solidity

function rewardListener(
    string memory podcastId,
    address listener,
    uint256 hoursListened,
    uint256 likes,
    uint256 comments,
    uint256 shares
) external onlyOwner {
    uint256 totalReward = (hoursListened * rewardRatePerHour) + 
                          (likes * likeReward) + 
                          (comments * commentReward) + 
                          (shares * shareReward);
    PodcastStorage.Podcast memory podcast = podcastStorage.getById(podcastId);
    ERC20Token(podcast.podToken).mint(listener, totalReward);
}
```


markdown
Copy code
# PodFi Platform Overview

PodFi is an innovative platform designed to revolutionize the podcasting industry through blockchain technology. It integrates user and content management systems, token-based incentives, and decentralized governance to create a vibrant and interactive ecosystem for both listeners and creators. Additionally, PodFi provides a seamless connection between brands and podcasters, allowing for effective advertising and engagement.

## User Storage

The `UserStorage` contract is responsible for managing user data on the PodFi platform. It includes functionality to store, retrieve, and update user information securely.

### User Structure

- `username`: The unique username of the user.
- `name`: The full name of the user.
- `addr`: The Ethereum address of the user.
- `profilePictureHash`: The IPFS hash of the user's profile picture.
- `subscribers`: The number of subscribers the user has.
- `bio`: A short biography of the user.

### User Management Functions

- `getByUsername`: Retrieves a user by their username.
- `getByAddress`: Retrieves a user by their Ethereum address.
- `store`: Stores a new user's information.
- `_doesUserExist`: Checks if a user exists.

### Example

```solidity
UserStorage userStorage = new UserStorage(ownerAddress);

// Storing a new user
userStorage.store(
    userAddress,
    "john_doe",
    "John Doe",
    "Podcaster and tech enthusiast",
    "QmHashOfProfilePicture"
);

// Retrieving a user by username
UserStorage.User memory user = userStorage.getByUsername("john_doe");
Podcast Storage
The PodcastStorage contract is responsible for managing podcast data. It includes functionality to store, update, and retrieve podcast information securely.

Podcast Structure
id: The unique identifier of the podcast.
creatorAddress: The Ethereum address of the podcast creator.
title: The title of the podcast.
description: A description of the podcast.
duration: The duration of the podcast in seconds.
recordingHash: The IPFS hash of the podcast recording.
streamingCode: The streaming code for live podcasts.
type_: The type of the podcast (Audio/Video).
status: The streaming status of the podcast.
publishedAt: The timestamp when the podcast was published.
Podcast Management Functions
store: Stores a new podcast's information.
update: Updates an existing podcast's information.
getById: Retrieves a podcast by its unique identifier.
getByCreatorAddress: Retrieves all podcasts created by a specific address.
_doesPodcastExist: Checks if a podcast exists.
Example
solidity
Copy code
PodcastStorage podcastStorage = new PodcastStorage(ownerAddress);

// Storing a new podcast
podcastStorage.store(
    "podcast1",
    creatorAddress,
    "The Tech Talk",
    "A podcast about the latest in tech",
    3600,
    "QmHashOfRecording",
    "streamingCode123",
    PodcastStorage.Type.Audio,
    PodcastStorage.Status.StreamingNotStarted
);

// Retrieving a podcast by ID
PodcastStorage.Podcast memory podcast = podcastStorage.getById("podcast1");
Tokenomics and Rewards
PodFi uses its native token, PodToken (POD), to incentivize users and facilitate transactions within the ecosystem.

Listener Rewards
Listeners can earn POD tokens through various interactions on the platform:

Listening: Users earn POD tokens based on the number of hours they listen to podcasts. The reward rate is 1 POD per hour.
Liking: Users receive 0.1 POD for each like they give to a podcast.
Commenting: Users earn 0.5 POD for each comment they make on a podcast.
Sharing: Users receive 2 POD for sharing a podcast.
Example
solidity
Copy code
function rewardListener(
    string memory podcastId,
    address listener,
    uint256 hoursListened,
    uint256 likes,
    uint256 comments,
    uint256 shares
) external onlyOwner {
    uint256 totalReward = (hoursListened * rewardRatePerHour) + 
                          (likes * likeReward) + 
                          (comments * commentReward) + 
                          (shares * shareReward);
    PodcastStorage.Podcast memory podcast = podcastStorage.getById(podcastId);
    ERC20Token(podcast.podToken).mint(listener, totalReward);
}
```
### Tokenized Polls
PodFi allows for decentralized governance through tokenized polls. Users can create and vote on polls, with voting power determined by the number of POD tokens they hold.

### Creating Polls
Only the owner can create new polls.

### Voting
Users vote on polls using their POD tokens, and their voting power is proportional to their token holdings.

Example
```solidity
function createPoll(string memory question, string[] memory options) external onlyOwner {
    uint256 pollId = _pollIdCounter.current();
    Poll storage newPoll = polls[pollId];
    newPoll.question = question;
    for (uint256 i = 0; i < options.length; i++) {
        newPoll.options.push(options[i]);
    }
    _pollIdCounter.increment();
    emit PollCreated(pollId, question);
}

function vote(string memory podcastId, uint256 pollId, uint256 option) external {
    require(option < polls[pollId].options.length, "Invalid option");
    require(!polls[pollId].hasVoted[msg.sender], "Already voted");
    PodcastStorage.Podcast memory podcast = podcastStorage.getById(podcastId);
    ERC20Token podToken = ERC20Token(podcast.podToken);
    uint256 voterBalance = podToken.balanceOf(msg.sender);
    require(voterBalance > 0, "No voting power");

    polls[pollId].votes[option] += voterBalance;
    polls[pollId].hasVoted[msg.sender] = true;
    emit VoteCast(msg.sender, pollId, option, voterBalance);
}

```

### Advertising Integration
Our platform also pushes for advertising through podcasts. Brands can connect with podcasters to advertise their products directly on the PodFi platform. This integration allows brands to:

### Buy PodTokens (POD): Brands must purchase POD tokens to pay fees for advertising activities.
Connect with Podcasters: Brands can easily connect with podcasters to discuss and set up advertising deals.
Incentivize Users: Brands can create incentives or rewards for users who engage with their advertised products.
Example

```solidity
// Brand buying POD tokens for advertising
usdcToken.transferFrom(brandAddress, platformAddress, usdcAmount);
podToken.mint(brandAddress, podAmount);

// Brand setting up a reward for users
rewardListener("podcast1", userAddress, hoursListened, likes, comments, shares);
```

PodFi's integration of UserStorage and PodcastStorage ensures robust and secure management of user and podcast data. The tokenomics system rewards users for their engagement and participation, while the decentralized governance model allows for community-driven decision-making. The advertising integration provides a valuable opportunity for brands to connect with the podcasting community, enhancing the overall ecosystem with incentives and rewards. Through these 
