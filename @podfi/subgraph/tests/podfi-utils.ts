import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import { PodcastSetup, UserRegistered } from "../generated/Podfi/Podfi"

export function createPodcastSetupEvent(
  title: string,
  description: string,
  category: string,
  creatorUsername: string
): PodcastSetup {
  let podcastSetupEvent = changetype<PodcastSetup>(newMockEvent())

  podcastSetupEvent.parameters = new Array()

  podcastSetupEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  podcastSetupEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  podcastSetupEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  podcastSetupEvent.parameters.push(
    new ethereum.EventParam(
      "creatorUsername",
      ethereum.Value.fromString(creatorUsername)
    )
  )

  return podcastSetupEvent
}

export function createUserRegisteredEvent(
  username: string,
  name: string,
  bio: string,
  profilePictureHash: string
): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("username", ethereum.Value.fromString(username))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("bio", ethereum.Value.fromString(bio))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "profilePictureHash",
      ethereum.Value.fromString(profilePictureHash)
    )
  )

  return userRegisteredEvent
}
