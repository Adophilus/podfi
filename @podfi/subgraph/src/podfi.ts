import {
  PodcastSetup as PodcastSetupEvent,
  UserRegistered as UserRegisteredEvent
} from "../generated/Podfi/Podfi"
import { PodcastSetup, UserRegistered } from "../generated/schema"

export function handlePodcastSetup(event: PodcastSetupEvent): void {
  let entity = new PodcastSetup(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.title = event.params.title
  entity.description = event.params.description
  entity.category = event.params.category
  entity.creatorUsername = event.params.creatorUsername

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let entity = new UserRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.username = event.params.username
  entity.name = event.params.name
  entity.bio = event.params.bio
  entity.profilePictureHash = event.params.profilePictureHash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
