import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(page)/_page/create-livestream')({
  component: CreateLivestreamPage
})

function CreateLivestreamPage() {
  const [activeTab, setActiveTab] = useState("live-shows")
  const tabs = [
    { slug: "live-shows", label: "Live Shows" },
    { slug: "statistics", label: "Statistics" },
    { slug: "podtoken", label: "Podtoken" },
    { slug: "community", label: "Community" },
  ]

  return (
    <div className="pt-36 text-lg font-futuraMd text-[#0A1640] dark:text-white min-h-screen px-4 xs:px-10 xl:px-20">
      <h1 className="mb-16 text-4xl text-sky-900">Livestream</h1>
      <div className="flex flex-col gap-y-16 xxs:flex-row">
        {/* tabs' titles */}
        <div className="w-full text-center xxs:text-left xxs:w-fit flex flex-col gap-y-4 text-xl xs:text-2xl text-cyan-800">
          {tabs.map((tab) => (
            <h2
              key={tab.slug}
              onClick={() => setActiveTab(tab.slug)}
              className={`p-1 pr-2 xs:pr-8 lg:pr-24 rounded cursor-pointer ${activeTab === tab.slug
                ? "text-white bg-blue-500"
                : "bg-blue-200"
                }`}
            >
              {tab.label}
            </h2>
          ))}
        </div>
        {/* tabs' content */}
        <div className="-mt-6 mb-20 p-4 border-2 border-cyan-500 rounded-lg w-full min-h-[400px]">
          {activeTab === "live-shows" ? (
            <form
              action=""
              className="flex flex-col items-center gap-y-10 py-4 px-0 sm:px-4 lg:px-20"
            >
              {/* image */}
              <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-center w-full">
                <div className="w-48 min-w-48 h-48 rounded-2xl border-2 border-blue-500 overflow-hidden">
                  <img
                    id="livestream-image-container"
                    src="/images/user.svg"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="livestream-image"
                    id="livestream-image"
                    onChange={(e) => {
                      let imageLink = URL.createObjectURL(e.target.files[0]);
                      document.querySelector('#livestream-image-container').src = imageLink
                    }}
                  />
                  <button
                    onClick={() =>
                      document.querySelector("#livestream-image").click()
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
                  htmlFor="live-room-title"
                  className="w-44 min-w-44 text-left md:text-right text-nowrap"
                >
                  Live Room Title:
                </label>
                <input
                  name="live-room-title"
                  id="live-room-title"
                  type="text"
                  className="border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 w-full px-3 py-1"
                />
              </div>
              {/* about */}
              <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
                <label
                  htmlFor="about-show"
                  className="w-44 min-w-44 text-left md:text-right text-nowrap"
                >
                  About This Show:
                </label>
                <textarea
                  name="about-show"
                  id="about-show"
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
              {/* visibility */}
              <div className="flex flex-col md:flex-row gap-x-6 gap-y-2 items-start w-full">
                <label className="w-44 min-w-44 text-left md:text-right text-nowrap">
                  Visibility:
                </label>
                <div className="w-full flex flex-col gap-y-6">
                  <div>
                    <input
                      name="visibility"
                      id="visibility-public"
                      type="radio"
                      value="public"
                      className="cursor-pointer mr-2"
                    />
                    <label
                      htmlFor="visibility-public"
                      className="inline-flex flex-col w-4/5"
                    >
                      <span className="cursor-pointer font-bold">Public</span>
                      <span className="block text-sm text-blue-500">
                        Everyone can join the show.
                      </span>
                    </label>
                  </div>
                  <div>
                    <input
                      name="visibility"
                      id="visibility-private"
                      type="radio"
                      value="private"
                      className="cursor-pointer mr-2"
                    />
                    <label
                      htmlFor="visibility-private"
                      className="inline-flex flex-col w-4/5"
                    >
                      <span className="cursor-pointer font-bold">Private</span>
                      <span className="block text-sm text-blue-500">
                        Anyone with the sharing link can join. Suitable for
                        invitation-only streams, remote co-host recording, or
                        testing.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {/* start */}
              <button
                type="submit"
                className="my-8 w-fit bg-[#0A1640] hover:bg-slate-900 text-white rounded-xl px-8 py-4"
              >
                Start Now
              </button>
            </form>
          ) : activeTab === "statistics" ? (
            <div className="pt-4 dark:text-[#0A1640] flex flex-col items-center gap-y-12">
              <div className="w-full flex flex-col md:flex-row justify-center gap-y-2 gap-x-4 lg:gap-x-8">
                <div className="flex items-center gap-x-3 w-fit rounded-xl bg-blue-100 border-2 border-blue-300 px-3 py-2 lg:px-6 lg:py-4">
                  <span className="text-2xl lg:text-5xl font-bold tracking-tighter lg:-tracking-[4px]">
                    {133}
                  </span>
                  Listeners
                </div>
                <div className="flex items-center gap-x-3 w-fit rounded-xl bg-blue-100 border-2 border-blue-300 px-3 py-2 lg:px-6 lg:py-4">
                  <span className="text-2xl lg:text-5xl font-bold tracking-tighter lg:-tracking-[4px]">
                    {133}
                  </span>
                  Engagement
                </div>
                <div className="flex items-center gap-x-3 w-fit rounded-xl bg-blue-100 border-2 border-blue-300 px-3 py-2 lg:px-6 lg:py-4">
                  <span className="text-2xl lg:text-5xl font-bold tracking-tighter lg:-tracking-[4px]">
                    {133}
                  </span>
                  Level
                </div>
              </div>
              <select
                name="stat-time-filter"
                defaultValue="today"
                id="stat-time-filter"
                className="text-lg select w-fit h-fit rounded-xl bg-blue-100 border-2 border-blue-300 px-4 pr-10 py-3 focus:border-cyan-500 focus:outline-cyan-500"
              >
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
              </select>
            </div>
          ) : activeTab === "podtoken" ? (
            <div className=" lg:p-10 dark:text-[#0A1640]">
              <div className="w-full bg-blue-100 border-2 border-blue-300 rounded-xl flex items-center gap-x-3 px-2 py-4">
                <span className="text-2xl lg:text-5xl font-bold tracking-tighter lg:-tracking-[4px]">133k</span>
                Points
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
