import { createNanoEvents } from 'nanoevents'
import { nanoid } from "nanoid"
import { Result } from 'true-myth'

type Podcast = {
  id: string
}

type Streams = {
  local: MediaStream,
  remote: MediaStream
}

type PodcastWithStreams = Podcast & {
  streams: Streams
}

type PodcastCreatedHandle = PodcastWithStreams & {
  end: () => Promise<Result<undefined, string>>
}

type PodcastJoinedHandle = PodcastWithStreams & {
  onEnded: (cb: () => void) => void
}

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

type IceCandidateOffer = {
  offer: RTCSessionDescriptionInit
  candidates: RTCIceCandidate[]
}

interface Database {
  createPodcast: (id: string, iceCandidateOffer: IceCandidateOffer) => Promise<Result<undefined, string>>
  getPodcast: (id: string) => Promise<Result<IceCandidateOffer, string>>
  joinPodcast: (id: string, iceCandidateOffer: IceCandidateOffer) => Promise<Result<undefined, string>>
  endPodcast: (id: string) => Promise<Result<undefined, string>>
}

class PodcastService {
  constructor(private db: Database) { }

  async endPodcast(id: string): Promise<Result<undefined, string>> {
    const endPodcastResult = await this.db.endPodcast(id)

    if (endPodcastResult.isErr)
      return Result.err(endPodcastResult.error)

    return Result.ok(undefined)
  }

  createPodcast(): Promise<Result<PodcastCreatedHandle, string>> {
    const id = nanoid()

    return new Promise<Result<PodcastCreatedHandle, string>>((resolve, reject) => {
      this.setupCreateStream()
        .then(({ offer, candidates, event }) => {
          event.on("finish-preparation", async (streams) => {
            const createPodcastResult = await this.db.createPodcast(id, {
              offer,
              candidates,
            })

            if (createPodcastResult.isErr) {
              resolve(Result.err(createPodcastResult.error))
            }
            else {
              resolve(Result.ok({
                id,
                streams,
                end: () => this.endPodcast(id)
              }))
            }
          })
        })
        .catch(err => reject(err))
    })
  }

  private async setupCreateStream() {
    type CreateStreamEvent = {
      "finish-preparation": (streams: Streams) => void
    }

    const eventEmitter = createNanoEvents<CreateStreamEvent>()

    const peerConnection = new RTCPeerConnection(servers);
    const localStream = await this.initLocalStream()

    const streams = {
      local: new MediaStream(),
      remote: new MediaStream()
    }

    const offer = {} as RTCSessionDescriptionInit

    peerConnection.addEventListener("negotiationneeded", async () => {
      await peerConnection.setLocalDescription(
        await peerConnection.createOffer(),
      );

      if (peerConnection.localDescription) {
        offer.type = peerConnection.localDescription.type;
        offer.sdp = peerConnection.localDescription.sdp;
      }
    });

    for (const track of localStream.getTracks()) {
      peerConnection.addTrack(track, localStream);
    }

    peerConnection.addEventListener("track", (e) => {
      for (const track of e.streams[0].getTracks()) {
        streams.remote.addTrack(track);
      }
    });

    peerConnection.addEventListener("connectionstatechange", () => {
      switch (peerConnection.connectionState) {
        case "connected": {
          console.log("Connected")
        }
      }
    });

    const candidates: RTCIceCandidate[] = [];
    peerConnection.addEventListener("icecandidate", async (event) => {
      if (event.candidate) {
        candidates.push(event.candidate);
      }
    });

    peerConnection.addEventListener("icegatheringstatechange", async (e) => {
      const connection = e.target;

      switch (connection?.iceGatheringState) {
        case "complete": {
          eventEmitter.emit("finish-preparation", streams)
          break;
        }
      }
    });

    return {
      offer,
      candidates,
      event: eventEmitter
    }
  }

  async initLocalStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    return stream
  }

  async joinPodcast(id: string): Promise<Result<PodcastJoinedHandle, string>> {
    const podcast = await this.db.getPodcast(id)

    if (podcast.isErr)
      return Result.err(podcast.error)


    return new Promise<Result<PodcastJoinedHandle, string>>((resolve, reject) => {
      this.setupJoinStreams(podcast.value)
        .then(({ offer, candidates, event }) => {
          event.on("finish-preparation", async (streams) => {
            const joinPodcastResult = await this.db.joinPodcast(id, {
              offer,
              candidates,
            })

            if (joinPodcastResult.isErr) {
              resolve(Result.err(joinPodcastResult.error))
            }
            else {
              resolve(Result.ok({
                id,
                streams,
                onEnded: (cb: () => void) => {
                  // TODO: logic to listen for podcast ended and then call cb
                }
              }))
            }
          })
        })
        .catch(err => reject(err))
    })
  }

  private async setupJoinStreams(iceCandidateOffer: IceCandidateOffer) {
    type JoinStreamEvent = {
      "finish-preparation": (streams: Streams) => void
    }

    const eventEmitter = createNanoEvents<JoinStreamEvent>()

    const peerConnection = new RTCPeerConnection(servers);
    const localStream = await this.initLocalStream()

    peerConnection.setRemoteDescription(
      new RTCSessionDescription(iceCandidateOffer.offer)
    )
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    const streams = {
      local: new MediaStream(),
      remote: new MediaStream()
    }

    const offer = {} as RTCSessionDescriptionInit

    for (const track of localStream.getTracks()) {
      peerConnection.addTrack(track, localStream);
    }

    peerConnection.addEventListener("track", (e) => {
      for (const track of e.streams[0].getTracks()) {
        streams.remote.addTrack(track);
      }
    });

    peerConnection.addEventListener("connectionstatechange", () => {
      switch (peerConnection.connectionState) {
        case "connected": {
          console.log("Connected")
        }
      }
    });

    const candidates: RTCIceCandidate[] = [];
    peerConnection.addEventListener("icecandidate", async (event) => {
      if (event.candidate) {
        candidates.push(event.candidate);
      }
    });

    peerConnection.addEventListener("icegatheringstatechange", async (e) => {
      const connection = e.target;

      switch (connection?.iceGatheringState) {
        case "complete": {
          eventEmitter.emit("finish-preparation", streams)

          break;
        }
      }
    });

    return {
      offer,
      candidates,
      event: eventEmitter
    }
  }
}

export default PodcastService
