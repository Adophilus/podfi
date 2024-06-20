import { useNavigate, useParams } from "react-router-dom"
import React, { useRef, useState, useEffect } from "react"
import WaveSurfer from "wavesurfer.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
  faVolumeUp,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons"

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "rgba(255, 255, 255, 0.7)",
  progressColor: "#172554",
  cursorColor: "#93c5fd",
  height: 50,
  barWidth: 2,
  gapWidth: 0.1,
  normalize: true,
  backend: "MediaElement",
  audioRate: 1,
  preservePitch: true,
})

export const AudioPlayer = ({ episode, creator, podcastId }) => {
  const { activeEpisodeId } = useParams()
  const navigate = useNavigate()

  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  useEffect(() => {
    //create wavesurfer instance with options
    const options = formWaveSurferOptions(waveformRef.current)
    wavesurfer.current = WaveSurfer.create(options)

    //load audio file
    wavesurfer.current.load(episode.url)

    //wavesurfer is ready
    wavesurfer.current.on("ready", () => {
      setDuration(wavesurfer.current.getDuration())
      if (activeEpisodeId == episode.id) {
        playPauseHandler()
      }
    })

    //update current time in state as audio plays
    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime())
    })

    // on finish event
    wavesurfer.current.on("finish", () => {
      setIsPlaying(false)
    })


    //clean up event listeners and destroy instance on unmount
    return () => {
      setIsPlaying(false)
      wavesurfer.current.un("audioprocess")
      wavesurfer.current.un("ready")
      wavesurfer.current.destroy()
    }
  }, [activeEpisodeId, episode.url])

  const playPauseHandler = () => {
    //handle first time playing
    if (!isPlaying && activeEpisodeId != episode.id) {
      navigate(`/profile/${creator}/${podcastId}/${episode.id}`)
      return
    }

    wavesurfer.current.playPause()
    if (wavesurfer.current.isPlaying()) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }

  const handleVolumeChange = (e) => {
    const value = e.target.value
    setVolume(value)
    wavesurfer.current.setVolume(value)
  }

  const skipHandler = (amount) => {
    const newTime = currentTime + amount
    const clampedTime = Math.max(0, Math.min(newTime, duration))
    setCurrentTime(clampedTime)
    wavesurfer.current.seekTo(clampedTime / duration)
  }

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed)
    wavesurfer.current.setPlaybackRate(speed, true)
  }

  return (
    <div className="p-4 w-full">
      {/* Waveform Slider */}
      <div ref={waveformRef} className="my-4 cursor-pointer w-full"></div>

      <div className="flex justify-between items-center w-full">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="w-fit mx-auto mt-4 flex flex-col xxs:flex-row gap-y-4 gap-x-2 xs:gap-x-4 sm:gap-x-8 items-center justify-center">
        {/* Volume Slider */}
        <div className="flex items-center">
          <FontAwesomeIcon icon={volume >= 0.5 ? faVolumeUp : faVolumeDown} />
          <input
            type="range"
            value={volume}
            min={0}
            max={1}
            step={0.05}
            onChange={handleVolumeChange}
            className="ml-2 w-16 xxs:w-20 cursor-pointer"
          />
        </div>

        {/* skip/play btn  */}
        <div className="flex gap-x-2 items-center">
          {/* Skip Backward Button */}
          <button onClick={() => skipHandler(-5)} className="text-xl mx-2">
            <FontAwesomeIcon icon={faStepBackward} />
          </button>

          {/* Play/Pause Button */}
          <button onClick={playPauseHandler} className="play text-2xl outline-cyan-500 outline-offset-4 rounded-2xl">
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>

          {/* Skip Forward Button */}
          <button onClick={() => skipHandler(5)} className="text-xl mx-2">
            <FontAwesomeIcon icon={faStepForward} />
          </button>
        </div>
        {/* Playback Speed Controls */}
        <select
          onChange={(e) =>
            handlePlaybackSpeedChange(parseFloat(e.target.value))
          }
          value={playbackSpeed}
          className="bg-blue-500 p-1 w-fit h-fit rounded-xl border-2 border-blue-300  focus:border-cyan-500 focus:outline-cyan-500"
        >
          <option value={0.25}>0.25x</option>
          <option value={0.5}>0.5x</option>
          <option value={0.75}>0.75x</option>
          <option value={1}>1x</option>
          <option value={1.25}>1.25x</option>
          <option value={1.5}>1.5x</option>
          <option value={1.75}>1.75x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  )
}

// Helper function to format time in HH:MM:SS or MM:SS
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600)
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = Math.floor(timeInSeconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
      }${seconds}`
  } else {
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }
}

export default AudioPlayer
