import { auth } from '@/lib/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(page)/_page/$creatorUsername/create-podcast')({
  component: CreatePodcastPage
})

function CreatePodcastPage() {
  const { creatorUsername } = Route.useParams()
  const { user } = auth.hooks.useAuthUnsafe()

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
      ) : (
        <div className="bg-white dark:bg-neutral-800 -mt-6 mb-20 p-4 border-2 border-cyan-500 rounded-lg w-full min-h-[400px]">
          <form
            action=""
            className="flex flex-col items-center gap-y-10 py-4 px-0 sm:px-4 lg:px-20 text-[#0A1640] dark:text-white text-lg"
          >
            {/* image */}
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-center w-full">
              <div className="relative w-48 min-w-48 h-48 rounded-2xl border-2 border-blue-500 bg-[#3e3f41] overflow-hidden">
                <div className="w-36 h-36 bg-white dark:bg-neutral-800 absolute z-0 top-6 left-6"></div>
                <img
                  id="podcast-image-container"
                  src="/images/image.svg"
                  className="w-full h-full object-cover object-center z-10 relative"
                />
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  name="podcast-image"
                  id="podcast-image"
                  onChange={(e) => {
                    let imageLink = URL.createObjectURL(e.target.files[0])
                    document.querySelector("#podcast-image-container").src =
                      imageLink
                  }}
                />
                <button
                  onClick={() =>
                    document.querySelector("#podcast-image").click()
                  }
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-8 py-2 w-fit h-fit"
                >
                  Upload Image
                </button>
              </div>
            </div>
            {/* title */}
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
              <label
                htmlFor="podcast-title"
                className="w-44 min-w-44 text-left md:text-right text-nowrap"
              >
                Title:
              </label>
              <input
                name="podcast-title"
                id="podcast-title"
                type="text"
                className="border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full px-3 py-1"
              />
            </div>
            {/* description */}
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
              <label
                htmlFor="description"
                className="w-44 min-w-44 text-left md:text-right text-nowrap"
              >
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                className="border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full min-h-24 px-3 py-1"
              />
            </div>
            {/* category */}
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
              <label
                htmlFor="category"
                className="w-44 min-w-44 text-left md:text-right text-nowrap"
              >
                Category:
              </label>
              <input
                name="category"
                id="category"
                type="text"
                className="border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full px-3 py-1"
              />
            </div>
            {/* create */}
            <button
              type="submit"
              className="my-8 w-fit bg-[#0A1640] hover:bg-slate-900 text-white rounded-xl px-8 py-4"
            >
              Create Podcast
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
