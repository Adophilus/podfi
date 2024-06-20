import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import {} from "@graphprotocol/graph-ts"
import { PodcastSetup } from "../generated/schema"
import { PodcastSetup as PodcastSetupEvent } from "../generated/Podfi/Podfi"
import { handlePodcastSetup } from "../src/podfi"
import { createPodcastSetupEvent } from "./podfi-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let title = "Example string value"
    let description = "Example string value"
    let category = "Example string value"
    let creatorUsername = "Example string value"
    let newPodcastSetupEvent = createPodcastSetupEvent(
      title,
      description,
      category,
      creatorUsername
    )
    handlePodcastSetup(newPodcastSetupEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("PodcastSetup created and stored", () => {
    assert.entityCount("PodcastSetup", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PodcastSetup",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "title",
      "Example string value"
    )
    assert.fieldEquals(
      "PodcastSetup",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )
    assert.fieldEquals(
      "PodcastSetup",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "category",
      "Example string value"
    )
    assert.fieldEquals(
      "PodcastSetup",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creatorUsername",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
