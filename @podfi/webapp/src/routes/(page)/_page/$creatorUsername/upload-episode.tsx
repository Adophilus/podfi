import { useState } from "react"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMicrophone } from "@fortawesome/free-solid-svg-icons"
import { createFileRoute } from '@tanstack/react-router'
import { auth } from "@/lib/auth"

export const Route = createFileRoute('/(page)/_page/$creatorUsername/upload-episode')({
  component: UploadPodcastPage
})

function UploadPodcastPage() {
  const { user } = auth.hooks.useAuthUnsafe()
  //check for user and existing podcast
  const { creatorUsername, activePodcastId } = useParams()
  const [addParti, setAddParti] = useState(false)
  const [audioFile, setAudioFile] = useState(null)

  return (
    <div className="pt-36 font-futuraMd min-h-screen relative overflow-hidden px-4 xs:px-10 xl:px-20 z-0">
      {/* bg */}
      <div className="w-fit h-fit absolute -top-96 -right-[450px] -z-10">
        <img src="/images/profile_bg.svg" width={1000} height={1000} />
      </div>
      {/* page content */}
      {creatorUsername !== user.username ? (
        <p className=" dark:text-white pt-64 text-center text-3xl">
          NOT ALLOWED OPERATION
        </p>
      ) : !user.podcasts.find((pod) => pod.id == activePodcastId) ? (
        <p className=" dark:text-white pt-64 text-center text-3xl">
          YOU DON'T HAVE A PODCAST WITH THE REQUESTED ID. MAKE SURE TO CREATE A
          PODCAST FIRST AND UPLOAD TO IT MANUALLY.
        </p>
      ) : (
        <div className="bg-white dark:bg-neutral-800 -mt-6 mb-20 p-4 border-2 border-cyan-500 rounded-lg w-full min-h-[400px]">
          <form
            action=""
            className="flex flex-col items-center gap-y-10 py-4 px-0 sm:px-4 lg:px-20 text-[#0A1640] dark:text-white text-lg"
          >
            {/* audio */}
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-center w-full">
              {audioFile ? (
                <audio
                  hidden={audioFile ? false : true}
                  controls
                  id="episode-audio"
                  className="my-20 w-full max-w-72"
                  src={audioFile ? URL.createObjectURL(audioFile) : ""}
                />
              ) : (
                <div className="w-48 min-w-48 h-48 rounded-2xl border-2 border-blue-500 overflow-hidden p-8">
                  <FontAwesomeIcon
                    icon={faMicrophone}
                    className="w-full h-full text-[#3e3f41]"
                  />
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="audio/*"
                  hidden
                  name="episode-audio"
                  id="episode-audio-input"
                  onChange={(e) => {
                    setAudioFile(e.target.files[0])
                  }}
                />
                <button
                  onClick={() =>
                    document.querySelector("#episode-audio-input").click()
                  }
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-2 w-fit h-fit"
                >
                  Upload Audio
                </button>
              </div>
            </div>
            {/* title */}
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
              <label
                htmlFor="episode-title"
                className="w-44 min-w-44 text-left md:text-right text-nowrap"
              >
                Title:
              </label>
              <input
                name="episode-title"
                id="episode-title"
                type="text"
                className="border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full px-3 py-1"
              />
            </div>
            {/* host */}
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
              <label
                htmlFor="host"
                className="w-44 min-w-44 text-left md:text-right text-nowrap"
              >
                Host's Username:
              </label>
              <input
                name="host"
                id="host"
                type="text"
                className="border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full px-3 py-1"
              />
            </div>
            {/* participants */}
            <div className="flex items-center gap-x-4 w-full">
              <input
                name="add-parti"
                id="add-parti"
                type="checkbox"
                checked={addParti}
                onChange={() => setAddParti((prev) => !prev)}
                className="w-5 h-5 cursor-pointer rounded-3xl"
              />
              <label htmlFor="add-parti" className="cursor-pointer">
                Add Participants?
              </label>
            </div>
            {addParti ? (
              <>
                <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
                  <label
                    htmlFor="participant1"
                    className="w-44 min-w-44 text-left md:text-right text-nowrap"
                  >
                    Participant's Username:
                  </label>
                  <input
                    name="participant1"
                    id="participant1"
                    type="text"
                    className="border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full px-3 py-1"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
                  <label
                    htmlFor="participant2"
                    className="w-44 min-w-44 text-left md:text-right text-nowrap"
                  >
                    Participant's Username:
                  </label>
                  <input
                    name="participant2"
                    id="participant2"
                    type="text"
                    className="border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full px-3 py-1"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
                  <label
                    htmlFor="participant3"
                    className="w-44 min-w-44 text-left md:text-right text-nowrap"
                  >
                    Participant's Username:
                  </label>
                  <input
                    name="participant3"
                    id="participant3"
                    type="text"
                    className="border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full px-3 py-1"
                  />
                </div>
              </>
            ) : (
              ""
            )}
            {/* upload */}
            <button
              type="submit"
              className="my-8 w-fit bg-[#0A1640] hover:bg-slate-900 text-white rounded-xl px-8 py-4"
            >
              Upload Episode
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
