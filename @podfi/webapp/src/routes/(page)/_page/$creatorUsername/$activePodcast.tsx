import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { users } from "@/demoData"
import { Share } from "../../-components/share"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { AudioPlayer } from '../../-components/player'

export const Route = createFileRoute('/(page)/_page/$creatorUsername/$activePodcast')({
  component: ActivePodcastPage
})

function ActivePodcastPage() {
  const { creatorUsername, activePodcastId } = useParams()

  const creatorData = users.find((user) => user.username === creatorUsername)
  if (!creatorData) {
    return (
      <p className=" dark:text-white pt-96 text-center min-h-screen text-3xl">
        NO SUCH USER
      </p>
    )
  }

  //active podcast navigation through links
  const navigate = useNavigate()

  //handle swiper
  const swiperRef = useRef(null)

  const handleSlideClick = (index) => {
    if (swiperRef) {
      swiperRef.current.slideTo(index)
    }
  }
  const handleSlideChange = (swiper) => {
    const activeSlideIndex = swiper.activeIndex
    const { creator, podcastId } = swiper.slides[activeSlideIndex]?.dataset
    navigate(`/profile/${creator}/${podcastId}`)
  }
  const handleActiveSlideOnLoad = (swiper) => {
    if (activePodcastId) {
      //find the slideIndex that contains the activePodcastId within its dataset
      const slideIndex = [...swiper.slides].findIndex(
        (slide) => slide?.dataset?.podcastId === activePodcastId
      )
      swiper.slideTo(slideIndex)
    }
  }

  useEffect(() => {
    if (!activePodcastId) {
      const podcastId =
        swiperRef.current?.slides[swiperRef.current.activeIndex]?.dataset
          ?.podcastId
      navigate(`/profile/${creatorData.username}/${podcastId ? podcastId : ""}`)
    }
  }, [])

  const [podcastData, setPodcastData] = useState(null)
  useEffect(() => {
    if (activePodcastId) {
      let tempPodcastData = creatorData.podcasts.find(
        (podcast) => podcast.id == activePodcastId
      )
      if (!tempPodcastData) {
        tempPodcastData = creatorData.podcasts.find(
          (podcast) =>
            podcast.id == swiperRef.current.slides[0]?.dataset?.podcastId
        )
      }

      if (tempPodcastData) {
        setPodcastData(tempPodcastData)
        swiperRef.current.slideTo(
          [...swiperRef.current.slides].findIndex(
            (slide) => slide.dataset.podcastId == activePodcastId
          )
        )
      }
    }
  }, [activePodcastId])

  return (
    <div className="font-futuraMd min-h-screen relative overflow-hidden px-4 xs:px-10 xl:px-20 z-0">
      {/* bg */}
      <div className="w-fit h-fit absolute -top-96 -right-[450px] -z-10">
        <img src="/images/profile_bg.svg" width={1000} height={1000} />
      </div>
      {/* page content */}
      <div className="w-full flex flex-col-reverse items-center xl:items-start gap-y-8 gap-x-4 justify-between mt-36 xl:flex-row">
        <div className="flex flex-col w-full xl:w-8/12 gap-y-16">
          {/* profile details */}
          <div className="w-full h-fit">
            {/* text */}
            <div className="flex flex-col px-0 xs:px-4 sm::px-8 py-4 w-full max-w-[600px] text-lg text-sky-900 dark:text-blue-300">
              {/* username/followers and follow/share btns */}
              <div className="flex flex-col xs:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-y-4">
                  {/* username */}
                  <h2 className="text-2xl xxs:text-3xl">Whyds Creations</h2>
                  {/* followers/followings */}
                  <div className="flex gap-x-12 pl-4">
                    {/* followers */}
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl font-bold">500</h2>
                      <span className="text-cyan-600 text-sm">Followers</span>
                    </div>
                    {/* following */}
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl font-bold">500</h2>
                      <span className="text-cyan-600 text-sm">Following</span>
                    </div>
                  </div>
                </div>
                {/* follow/edit/share profile */}
                <div className="flex items-center gap-x-2 w-full xs:w-fit">
                  {/* follow/edit profile btn */}
                  {creatorData.username === user.username ? (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 w-full py-2 rounded-xl">
                      Edit Profile
                    </button>
                  ) : (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 w-full py-2 rounded-xl">
                      Follow
                    </button>
                  )}
                  {/* profile share btn */}
                  <div
                    onClick={(e) =>
                      e.currentTarget.querySelector(".share-modal").showModal()
                    }
                    className="w-fit h-fit cursor-pointer rounded-xl border-2 fill-sky-900 dark:fill-blue-300 dark:hover:fill-sky-500 hover:fill-sky-500 border-blue-500 hover:border-sky-500 p-2"
                  >
                    <svg
                      className="fill-inherit"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.6667 4.16808C16.6667 3.06263 17.1057 2.00247 17.8871 1.2208C18.6685 0.439135 19.7283 0 20.8333 0C21.9384 0 22.9982 0.439135 23.7796 1.2208C24.561 2.00247 25 3.06263 25 4.16808C24.9995 4.86997 24.8218 5.56038 24.4834 6.17525C24.145 6.79013 23.6569 7.30956 23.0642 7.68537C22.4716 8.06117 21.7937 8.28119 21.0934 8.32501C20.3932 8.36883 19.6931 8.23503 19.0583 7.93602L15.2167 12.5392L18.6133 17.3042C19.2437 16.9072 19.9688 16.6865 20.7134 16.665C21.4579 16.6436 22.1946 16.8222 22.8467 17.1822C23.4989 17.5423 24.0426 18.0706 24.4213 18.7122C24.8 19.3538 24.9998 20.0853 25 20.8304C25.0002 21.4838 24.8469 22.1281 24.5524 22.7113C24.2579 23.2945 23.8305 23.8002 23.3046 24.1877C22.7787 24.5753 22.1691 24.8337 21.525 24.9422C20.8809 25.0506 20.2204 25.0061 19.5966 24.8122C18.9729 24.6182 18.4035 24.2803 17.9343 23.8257C17.4652 23.3712 17.1094 22.8126 16.8958 22.1951C16.6822 21.5777 16.6167 20.9186 16.7045 20.2712C16.7924 19.6238 17.0312 19.006 17.4017 18.4679L13.7433 13.3395H8.24833C8.03739 14.3482 7.46049 15.2431 6.62893 15.8514C5.79737 16.4598 4.77006 16.7385 3.74517 16.6339C2.72028 16.5293 1.77043 16.0487 1.07884 15.2849C0.387251 14.5211 0.00292512 13.5281 0 12.4976C0.00102746 11.4646 0.385426 10.4689 1.07867 9.70337C1.77191 8.93785 2.72462 8.4571 3.75207 8.35432C4.77952 8.25154 5.80852 8.53405 6.63957 9.14709C7.47062 9.76013 8.04452 10.66 8.25 11.6723H13.77L17.72 6.93735C17.0401 6.17545 16.665 5.18941 16.6667 4.16808Z" />
                    </svg>
                    <Share
                      shareUrl={`${window.location.origin}/profile/${creatorData.username}`}
                    />
                  </div>
                </div>
              </div>

              {/* bio */}
              <p className="py-4">NEW Sme</p>
            </div>
            {/* podcast container */}
            <div className="w-full h-fit rounded-3xl bg-neutral-200 dark:bg-neutral-900 p-4 xxs:p-8 flex flex-col gap-y-4">
              {/* new podcast */}
              <div className="w-full px-0 xs:px-8 h-fit flex flex-col xxs:flex-row justify-between items-start xxs:items-center">
                <h1 className="text-xl font-bold text-sky-900 dark:text-blue-300">
                  Podcasts
                </h1>
                {creatorData?.username === user?.username ? (
                  <Link
                    to={`/profile/${creatorData.username}/create-podcast`}
                    className="text-lg w-fit flex text-nowrap gap-x-4 my-4 items-center text-blue-500 dark:text-sky-500 hover:scale-110"
                  >
                    <img src="/images/plus_icon.svg" width={25} height={25} />
                    Create New Podcast
                  </Link>
                ) : (
                  ""
                )}
              </div>
              {/* swiper */}
              {creatorData.podcasts.length ? (
                <Swiper
                  ref={swiperRef}
                  centeredSlides={true}
                  slidesPerView={2}
                  spaceBetween={20}
                  breakpoints={{
                    440: {
                      slidesPerView: 2,
                      spaceBetween: 40,
                    },
                    900: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                  navigation={true}
                  modules={[Navigation]}
                  onSwiper={(swiperInstance) =>
                    (swiperRef.current = swiperInstance)
                  }
                  onSlideChange={handleSlideChange}
                  onInit={handleActiveSlideOnLoad}
                  className="profile-swiper w-full h-fit py-6"
                >
                  {creatorData.podcasts.map((podcast, index) => (
                    <SwiperSlide
                      data-podcast-id={podcast.id}
                      data-creator={podcast.creator}
                      data-slide-index={index}
                      key={podcast.id}
                      onClick={() => handleSlideClick(index)}
                      className="cursor-pointer w-full h-32 xxs:h-52 rounded-3xl overflow-hidden"
                    >
                      <img
                        src={podcast.imageUrl}
                        className="w-full h-full object-cover object-center"
                      ></img>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="my-16">
                  <div className="flex items-center justify-center gap-x-4 w-full m-auto">
                    <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                    <span className="text-sm text-nowrap xxs:text-xl text-zinc-700 dark:text-zinc-500">
                      No Podcasts Yet
                    </span>
                    <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                  </div>
                </div>
              )}
              {podcastData ? (
                <div className=" text-sky-900 dark:text-blue-300 flex flex-col gap-y-2 mt-6">
                  <h1 className="font-bold text-2xl">{podcastData.title}</h1>
                  <p className="text-lg">{podcastData.description}</p>
                  <Link
                    to="#episodes"
                    className="w-fit text-lg underline underline-offset-2 hover:text-sky-600 hover:dark:text-blue-200"
                  >
                    {podcastData.episodes.length
                      ? `${podcastData.episodes.length} episode${podcastData.episodes.length > 1 ? "s" : ""
                      }`
                      : "No episodes yet"}
                  </Link>
                  <div className="flex flex-wrap justify-center xs:justify-end items-center gap-4 xs:gap-x-8 mt-6 xs:mt-4">
                    {/* listening */}
                    <div className="text-nowrap flex items-center gap-x-2">
                      <svg
                        className="fill-[#0A1640] dark:fill-blue-500"
                        width="26"
                        height="22"
                        viewBox="0 0 26 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.02988 10.5926C9.34824 10.5926 10.6126 10.0346 11.5448 9.04134C12.477 8.04809 13.0008 6.70096 13.0008 5.2963C13.0008 3.89163 12.477 2.5445 11.5448 1.55125C10.6126 0.558001 9.34824 0 8.02988 0C6.71152 0 5.44716 0.558001 4.51494 1.55125C3.58272 2.5445 3.059 3.89163 3.059 5.2963C3.059 6.70096 3.58272 8.04809 4.51494 9.04134C5.44716 10.0346 6.71152 10.5926 8.02988 10.5926ZM16.7282 18.977C17.5388 19.3307 18.5697 19.5556 19.882 19.5556C26 19.5556 26 14.6667 26 14.6667C26 14.0186 25.7585 13.3971 25.3286 12.9388C24.8986 12.4804 24.3155 12.2227 23.7073 12.2222H16.6287C17.2298 12.9979 17.5908 13.9904 17.5908 15.0741V15.6542C17.5877 15.7914 17.579 15.9285 17.5648 16.0649C17.4616 17.0831 17.1767 18.0712 16.7282 18.977ZM23.7073 6.51852C23.7073 7.59903 23.3044 8.63529 22.5873 9.39932C21.8702 10.1634 20.8976 10.5926 19.8835 10.5926C18.8694 10.5926 17.8968 10.1634 17.1797 9.39932C16.4626 8.63529 16.0598 7.59903 16.0598 6.51852C16.0598 5.43801 16.4626 4.40175 17.1797 3.63771C17.8968 2.87368 18.8694 2.44444 19.8835 2.44444C20.8976 2.44444 21.8702 2.87368 22.5873 3.63771C23.3044 4.40175 23.7073 5.43801 23.7073 6.51852ZM0 15.4815C0 14.6171 0.322287 13.7881 0.895961 13.1768C1.46964 12.5656 2.24771 12.2222 3.059 12.2222H13.0008C13.8121 12.2222 14.5901 12.5656 15.1638 13.1768C15.7375 13.7881 16.0598 14.6171 16.0598 15.4815C16.0598 15.4815 16.0598 22 8.02988 22C0 22 0 15.4815 0 15.4815Z" />
                      </svg>

                      <h3>{podcastData.listening} Listening</h3>
                    </div>
                    {/* likes */}
                    <div className="text-nowrap flex items-center gap-x-2">
                      <svg
                        onClick={(e) =>
                          e.currentTarget.classList.contains("fill-red-600")
                            ? (e.currentTarget.classList =
                              "fill-[#0A1640] dark:fill-blue-500 cursor-pointer hover:fill-slate-700 dark:hover:fill-blue-400")
                            : (e.currentTarget.classList =
                              "fill-red-600 cursor-pointer")
                        }
                        className="fill-[#0A1640] dark:fill-blue-500 cursor-pointer hover:fill-slate-700 dark:hover:fill-blue-400"
                        width="25"
                        height="21"
                        viewBox="0 0 25 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.033 0C15.6511 0 13.6159 1.63219 12.4977 2.75747C11.3795 1.63219 9.34886 0 6.96818 0C2.86477 0 0 2.74982 0 6.68609C0 11.0233 3.55795 13.8267 7 16.5382C8.625 17.8197 10.3068 19.1438 11.5966 20.6122C11.8136 20.858 12.1318 21 12.4659 21H12.5318C12.867 21 13.1841 20.8569 13.4 20.6122C14.692 19.1438 16.3727 17.8186 17.9989 16.5382C21.4398 13.8278 25 11.0244 25 6.68609C25 2.74982 22.1352 0 18.033 0Z" />
                      </svg>

                      <h3>{podcastData.likes} likes</h3>
                    </div>
                    {/* share */}
                    <div
                      className="w-fit h-fit cursor-pointer"
                      onClick={(e) =>
                        e.currentTarget
                          .querySelector(".share-modal")
                          .showModal()
                      }
                    >
                      <svg
                        className="fill-[#104F6A] hover:fill-sky-950 dark:fill-blue-300 dark:hover:fill-blue-500 w-7 lg:w-6"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.6667 4.16808C16.6667 3.06263 17.1057 2.00247 17.8871 1.2208C18.6685 0.439135 19.7283 0 20.8333 0C21.9384 0 22.9982 0.439135 23.7796 1.2208C24.561 2.00247 25 3.06263 25 4.16808C24.9995 4.86997 24.8218 5.56038 24.4834 6.17525C24.145 6.79013 23.6569 7.30956 23.0642 7.68537C22.4716 8.06117 21.7937 8.28119 21.0934 8.32501C20.3932 8.36883 19.6931 8.23503 19.0583 7.93602L15.2167 12.5392L18.6133 17.3042C19.2437 16.9072 19.9688 16.6865 20.7134 16.665C21.4579 16.6436 22.1946 16.8222 22.8467 17.1822C23.4989 17.5423 24.0426 18.0706 24.4213 18.7122C24.8 19.3538 24.9998 20.0853 25 20.8304C25.0002 21.4838 24.8469 22.1281 24.5524 22.7113C24.2579 23.2945 23.8305 23.8002 23.3046 24.1877C22.7787 24.5753 22.1691 24.8337 21.525 24.9422C20.8809 25.0506 20.2204 25.0061 19.5966 24.8122C18.9729 24.6182 18.4035 24.2803 17.9343 23.8257C17.4652 23.3712 17.1094 22.8126 16.8958 22.1951C16.6822 21.5777 16.6167 20.9186 16.7045 20.2712C16.7924 19.6238 17.0312 19.006 17.4017 18.4679L13.7433 13.3395H8.24833C8.03739 14.3482 7.46049 15.2431 6.62893 15.8514C5.79737 16.4598 4.77006 16.7385 3.74517 16.6339C2.72028 16.5293 1.77043 16.0487 1.07884 15.2849C0.387251 14.5211 0.00292512 13.5281 0 12.4976C0.00102746 11.4646 0.385426 10.4689 1.07867 9.70337C1.77191 8.93785 2.72462 8.4571 3.75207 8.35432C4.77952 8.25154 5.80852 8.53405 6.63957 9.14709C7.47062 9.76013 8.04452 10.66 8.25 11.6723H13.77L17.72 6.93735C17.0401 6.17545 16.665 5.18941 16.6667 4.16808Z" />
                      </svg>
                      <Share
                        shareUrl={`${window.location.origin}/profile/${creatorData.username}/${podcastData.id}`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* content */}
          <Accordion podcastData={podcastData} user={user} />
        </div>
        {/* recommendation */}
        <div className="w-full xl:w-80 flex flex-col gap-y-4">
          <ProfileRecommendation />
          <Link
            to="/create-livestream"
            className="w-full flex items-center justify-center gap-x-4 bg-blue-500 hover:bg-blue-600 rounded-3xl text-white p-4 text-lg text-nowrap"
          >
            <img src="/images/livestream_icon.svg" width={50} height={50} />
            <span>Start Livestream</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

const Accordion = ({ podcastData, user }) => {
  const [activeTab, setActiveTab] = useState("episodes")

  return (
    <div className="w-full h-fit border-2 border-blue-500 rounded-xl px-4 xxs:px-8 mb-24 flex flex-col text-lg text-sky-900 dark:text-blue-300">
      {/* tabs */}
      <div className="flex flex-col sm:flex-row gap-x-8 gap-y-2 py-2">
        <span
          onClick={() => setActiveTab("subscriptions")}
          className={
            activeTab === "subscriptions"
              ? "font-bold cursor-pointer"
              : "cursor-pointer"
          }
        >
          Subscriptions
        </span>
        {podcastData ? (
          <span
            onClick={() => setActiveTab("episodes")}
            className={
              activeTab === "episodes"
                ? "font-bold cursor-pointer"
                : "cursor-pointer"
            }
          >
            Episodes
          </span>
        ) : (
          ""
        )}
        {podcastData?.creator === user?.username ? (
          <span
            onClick={() => setActiveTab("earnings")}
            className={
              activeTab === "earnings"
                ? "font-bold cursor-pointer"
                : "cursor-pointer"
            }
          >
            Earnings
          </span>
        ) : (
          ""
        )}
        {podcastData?.creator === user?.username ? (
          <span
            onClick={() => setActiveTab("favorite")}
            className={
              activeTab === "favorite"
                ? "font-bold cursor-pointer"
                : "cursor-pointer"
            }
          >
            Favorite
          </span>
        ) : (
          ""
        )}
      </div>
      {/* content */}
      {activeTab === "subscriptions" ? (
        <div></div>
      ) : activeTab === "episodes" ? (
        <div className="w-full" id="episodes">
          {/* new episode */}
          {podcastData?.creator === user?.username ? (
            <Link
              to={`/profile/${podcastData.creator}/${podcastData.id}/upload-episode`}
              className="w-fit text-center flex gap-x-4 my-4 items-center text-blue-500 dark:text-sky-500 hover:scale-110"
            >
              <img src="/images/plus_icon.svg" width={25} height={25} />
              Upload New Episode
            </Link>
          ) : (
            ""
          )}
          {/* episodes */}
          <div className="flex flex-col items-center justify-between w-full min-h-[400px] pt-4 pb-12">
            {podcastData?.episodes?.length ? (
              <>
                <div className="flex flex-col items-center w-full h-full gap-y-12">
                  {podcastData.episodes.map((episode) => (
                    <SingleEpisode
                      user={user}
                      episode={episode}
                      creator={podcastData.creator}
                      podcastId={podcastData.id}
                      key={episode.id}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-x-4 mt-28 w-full">
                  <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                  <span className="text-xs text-nowrap text-zinc-700 dark:text-zinc-500">
                    No More Episodes
                  </span>
                  <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center gap-x-4 w-full m-auto">
                <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
                <span className="text-sm text-nowrap xxs:text-xl text-zinc-700 dark:text-zinc-500">
                  No Episodes Yet
                </span>
                <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
              </div>
            )}
          </div>
        </div>
      ) : activeTab === "favorite" ? (
        <div className="flex flex-col items-center justify-between w-full min-h-[400px] pt-4 pb-12">
          {user?.favoriteEpisodes?.length ? (
            <div className="flex flex-col items-center w-full h-full gap-y-12">
              {user.favoriteEpisodes.map((episode) => (
                <SingleEpisode
                  user={user}
                  episode={episode}
                  creator={podcastData.creator}
                  podcastId={podcastData.id}
                  key={episode.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-x-4 w-full m-auto">
              <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
              <span className="text-sm text-center xxs:text-xl text-zinc-700 dark:text-zinc-500">
                Here you find your favorite episodes
              </span>
              <hr className="h-1 border-0 bg-zinc-500 w-2/12" />
            </div>
          )}
        </div>
      ) : activeTab === "earnings" ? (
        <div className="py-10">
          {/* tokens */}
          <div className="mb-20">
            <h2 className="text-3xl">Tokens:</h2>
            <div>here goes tokens</div>
          </div>
          {/* nft */}
          <div>
            <h2 className="text-3xl">NFT:</h2>
            <div>here goes nft</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export const ProfileRecommendation = () => {
  const [showRecom, setShowRecom] = useState(false)
  const featured = [
    {
      id: 1,
      imageUrl: "/images/photo.jpg",
      title: "podcast1",
      listenings: 20,
      likes: 20,
    },
    {
      id: 2,
      imageUrl: "/images/photo.jpg",
      title: "podcast2",
      listenings: 20,
      likes: 20,
    },
    {
      id: 3,
      imageUrl: "/images/photo.jpg",
      title: "podcast3",
      listenings: 20,
      likes: 20,
    },
    {
      id: 4,
      imageUrl: "/images/photo.jpg",
      title: "podcast4",
      listenings: 20,
      likes: 20,
    },
    {
      id: 5,
      imageUrl: "/images/photo.jpg",
      title: "podcast5",
      listenings: 20,
      likes: 20,
    },
    {
      id: 6,
      imageUrl: "/images/photo.jpg",
      title: "podcast6",
      listenings: 20,
      likes: 20,
    },
  ]
  return (
    <div className="h-fit w-full rounded-3xl bg-neutral-200 dark:bg-neutral-700 p-4 xxs:p-8">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setShowRecom((prev) => !prev)}
      >
        <h2 className="text-lg text-sky-900 dark:text-blue-300 underline underline-offset-4">
          Featured Podcasts
        </h2>
        <div className="border-[12px] border-slate-900 border-l-0 border-y-transparent w-0 h-0 inline-block ms-auto"></div>
        <div className="bg-slate-900 w-8 h-6 rounded-tr-lg rounded-br-lg p-1 inline-flex justify-center items-center">
          <FontAwesomeIcon
            icon={showRecom ? faMinus : faPlus}
            className="w-full h-full text-white"
          />
        </div>
      </div>
      {showRecom ? (
        <div className="flex max-h-[370px] overflow-y-auto overflow-x-hidden flex-col gap-y-4 w-full my-4 p-4 sm:px-12 md:px-32 lg:px-48 sm:py-4 xl:p-4">
          {featured.map((podcast) => (
            <Link
              to={`/podcast/${podcast.id}`}
              className="hover:scale-110"
              key={podcast.id}
            >
              <SingleRecommendedPodcast podcast={podcast} />
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

const SingleRecommendedPodcast = ({ podcast }) => {
  return (
    <div className="w-full bg-zinc-300 dark:bg-neutral-800 h-20 rounded-2xl overflow-hidden flex">
      <img
        src={podcast.imageUrl}
        className="w-1/3 h-full object-cover object-center"
      />
      <div className="flex flex-col w-2/3 text-xs text-blue-500 dark:text-blue-300 p-1 px-2">
        <h2 className="truncate text-lg">Title</h2>
        {/* listening */}
        <div className="flex items-center gap-x-1">
          <svg
            className="fill-[#0A1640] dark:fill-blue-500 w-4"
            width="26"
            height="22"
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.02988 10.5926C9.34824 10.5926 10.6126 10.0346 11.5448 9.04134C12.477 8.04809 13.0008 6.70096 13.0008 5.2963C13.0008 3.89163 12.477 2.5445 11.5448 1.55125C10.6126 0.558001 9.34824 0 8.02988 0C6.71152 0 5.44716 0.558001 4.51494 1.55125C3.58272 2.5445 3.059 3.89163 3.059 5.2963C3.059 6.70096 3.58272 8.04809 4.51494 9.04134C5.44716 10.0346 6.71152 10.5926 8.02988 10.5926ZM16.7282 18.977C17.5388 19.3307 18.5697 19.5556 19.882 19.5556C26 19.5556 26 14.6667 26 14.6667C26 14.0186 25.7585 13.3971 25.3286 12.9388C24.8986 12.4804 24.3155 12.2227 23.7073 12.2222H16.6287C17.2298 12.9979 17.5908 13.9904 17.5908 15.0741V15.6542C17.5877 15.7914 17.579 15.9285 17.5648 16.0649C17.4616 17.0831 17.1767 18.0712 16.7282 18.977ZM23.7073 6.51852C23.7073 7.59903 23.3044 8.63529 22.5873 9.39932C21.8702 10.1634 20.8976 10.5926 19.8835 10.5926C18.8694 10.5926 17.8968 10.1634 17.1797 9.39932C16.4626 8.63529 16.0598 7.59903 16.0598 6.51852C16.0598 5.43801 16.4626 4.40175 17.1797 3.63771C17.8968 2.87368 18.8694 2.44444 19.8835 2.44444C20.8976 2.44444 21.8702 2.87368 22.5873 3.63771C23.3044 4.40175 23.7073 5.43801 23.7073 6.51852ZM0 15.4815C0 14.6171 0.322287 13.7881 0.895961 13.1768C1.46964 12.5656 2.24771 12.2222 3.059 12.2222H13.0008C13.8121 12.2222 14.5901 12.5656 15.1638 13.1768C15.7375 13.7881 16.0598 14.6171 16.0598 15.4815C16.0598 15.4815 16.0598 22 8.02988 22C0 22 0 15.4815 0 15.4815Z" />
          </svg>

          <h3 className="truncate">{podcast.listenings} Listening</h3>
        </div>
        {/* likes */}
        <div className="flex items-center gap-x-1">
          <svg
            className="fill-[#0A1640] dark:fill-blue-500 w-4"
            width="25"
            height="21"
            viewBox="0 0 25 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.033 0C15.6511 0 13.6159 1.63219 12.4977 2.75747C11.3795 1.63219 9.34886 0 6.96818 0C2.86477 0 0 2.74982 0 6.68609C0 11.0233 3.55795 13.8267 7 16.5382C8.625 17.8197 10.3068 19.1438 11.5966 20.6122C11.8136 20.858 12.1318 21 12.4659 21H12.5318C12.867 21 13.1841 20.8569 13.4 20.6122C14.692 19.1438 16.3727 17.8186 17.9989 16.5382C21.4398 13.8278 25 11.0244 25 6.68609C25 2.74982 22.1352 0 18.033 0Z" />
          </svg>

          <h3 className="truncate">{podcast.likes} likes</h3>
        </div>
      </div>
    </div>
  )
}

import { useLocation } from "react-router-dom"
const SingleEpisode = ({ user, episode, creator, podcastId }) => {
  const location = useLocation()
  useEffect(() => {
    //handle navigation to active epi
    if (location.hash) {
      const targetElement = document.getElementById(location.hash.substring(1))

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
        targetElement.querySelector('.play').focus()
      }
    }
  }, [location.hash])
  return (
    <div id={`${episode.id}`} className="flex flex-col items-center md:flex-row w-full text-sm xs:text-base gap-4 lg:gap-x-8">
      {/* epi container */}
      <div className="w-full bg-blue-500 rounded-2xl min-h-[100px] p-3 xs:px-6 xs:py-4 text-white font-montserrat font-semibold">
        <div className="w-full flex justify-between gap-x-2 md:gap-x-4 items-start">
          <svg
            className="fill-white w-[30px] -mt-1"
            width="57"
            height="40"
            viewBox="0 0 57 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M31.4474 3.14474C31.4474 1.40795 30.0394 0 28.3026 0C26.5658 0 25.1579 1.40795 25.1579 3.14474L25.1579 36.6886C25.1579 38.4254 26.5658 39.8333 28.3026 39.8333C30.0394 39.8333 31.4474 38.4254 31.4474 36.6886L31.4474 3.14474Z" />
            <path d="M18.8684 7.33772C18.8684 5.60093 17.4605 4.19298 15.7237 4.19298C13.9869 4.19298 12.5789 5.60093 12.5789 7.33772L12.5789 32.4956C12.5789 34.2324 13.9869 35.6404 15.7237 35.6404C17.4605 35.6404 18.8684 34.2324 18.8684 32.4956V7.33772Z" />
            <path d="M44.0263 7.33772C44.0263 5.60093 42.6184 4.19298 40.8816 4.19298C39.1448 4.19298 37.7368 5.60093 37.7368 7.33772V32.4956C37.7368 34.2324 39.1448 35.6404 40.8816 35.6404C42.6184 35.6404 44.0263 34.2324 44.0263 32.4956V7.33772Z" />
            <path d="M6.28947 15.7237C6.28947 13.9869 4.88153 12.5789 3.14474 12.5789C1.40795 12.5789 0 13.9869 0 15.7237V24.1096C0 25.8464 1.40795 27.2544 3.14474 27.2544C4.88153 27.2544 6.28947 25.8464 6.28947 24.1096V15.7237Z" />
            <path d="M56.6053 15.7237C56.6053 13.9869 55.1973 12.5789 53.4605 12.5789C51.7237 12.5789 50.3158 13.9869 50.3158 15.7237V24.1096C50.3158 25.8464 51.7237 27.2544 53.4605 27.2544C55.1973 27.2544 56.6053 25.8464 56.6053 24.1096V15.7237Z" />
          </svg>
          <h2 className="text-center">{episode.title}</h2>

          <div className="flex flex-col xs:flex-row gap-x-2 gap-y-2 xs:gap-x-6 px-2 xs:px-4 items-center border-l-2 border-r-2 border-zinc-400 h-fit">
            {/* participants */}
            <div className="flex">
              {episode.participants.map((participant) => (
                <div
                  key={participant.username}
                  className="rounded w-5 h-5 xxs:w-7 xxs:h-7 border border-white overflow-hidden"
                >
                  <img
                    src={participant.profilePicture}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
            {/* host */}
            <div className="flex flex-col xxs:flex-row gap-x-4 gap-y-2 items-center">
              <span className="text-sm">{episode.host}</span>
              <span className="text-[8px] px-2 w-fit h-fit rounded bg-black drop-shadow-[1px_1px_7px_rgba(0,0,0,0.9)]">
                Host
              </span>
            </div>
          </div>
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button">
              <img
                src="/images/menu_kebab.svg"
                width={4}
                height={15}
                className="pt-1 min-w-1 cursor-pointer"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-10 menu p-2 shadow bg-white dark:bg-neutral-800 text-black dark:text-white stroke-black dark:stroke-white rounded-box w-52"
            >
              <div
                onClick={(e) => {
                  // fetch req of type put to add to/remove from favorite
                  const check = user.favoriteEpisodes.find(
                    (epi) => epi.id === episode.id
                  )
                  if (check) {
                    //remove
                    user.favoriteEpisodes = user.favoriteEpisodes.filter(
                      (epi) => epi.id !== episode.id
                    )
                    e.currentTarget.querySelector("svg").classList =
                      "w-8 h-8 fill-transparent stroke-[30px] stroke-inherit"
                    e.currentTarget.querySelector('span').textContent = 'Add to favorite'
                    return
                  }
                  //add
                  user.favoriteEpisodes.push(episode)
                  e.currentTarget.querySelector("svg").classList =
                    "w-8 h-8 fill-yellow-400"
                  e.currentTarget.querySelector("span").textContent = "Remove from favorite"

                }}
                className="flex p-2 items-center gap-x-4 hover:bg-base-300 dark:hover:bg-neutral-700 rounded-xl cursor-pointer"
              >
                <svg
                  className={`${user.favoriteEpisodes.find((epi) =>
                    epi.id === episode.id)
                    ? "w-8 h-8 fill-yellow-400"
                    : "w-8 h-8 fill-transparent stroke-[30px] stroke-inherit"
                    }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
                <span>{user.favoriteEpisodes.find(epi => epi.id === episode.id) ? 'Remove from' : 'Add to'} favorite</span>
              </div>
            </ul>
          </div>
        </div>
        <AudioPlayer
          episode={episode}
          creator={creator}
          podcastId={podcastId}
        />
      </div>
      {/* options */}
      <div className="flex justify-center gap-x-4 lg:gap-x-8 items-center text-blue-500 dark:text-blue-300 text-nowrap">
        {/* poll */}
        <div className="flex flex-col items-center gap-y-3 hover:scale-110 cursor-pointer">
          <svg
            className="fill-[#104F6A] dark:fill-blue-300 w-5 lg:w-6"
            width="24"
            height="27"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.8 0C23.1183 0 23.4235 0.145879 23.6485 0.405544C23.8736 0.66521 24 1.01739 24 1.38462V20.7692C24 21.1365 23.8736 21.4886 23.6485 21.7483C23.4235 22.008 23.1183 22.1538 22.8 22.1538H5.346L0 27V1.38462C0 1.01739 0.126428 0.66521 0.351472 0.405544C0.576515 0.145879 0.88174 0 1.2 0H22.8ZM13.2 5.53846H10.8V16.6154H13.2V5.53846ZM18 8.30769H15.6V16.6154H18V8.30769ZM8.4 11.0769H6V16.6154H8.4V11.0769Z" />
          </svg>

          <span>Join Poll</span>
        </div>
        {/* share */}
        <div onClick={(e) => e.currentTarget.querySelector('.share-modal').showModal()} className="flex flex-col items-center gap-y-3 hover:scale-110 cursor-pointer">
          <svg
            className="fill-[#104F6A] dark:fill-blue-300 w-5 lg:w-6"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.6667 4.16808C16.6667 3.06263 17.1057 2.00247 17.8871 1.2208C18.6685 0.439135 19.7283 0 20.8333 0C21.9384 0 22.9982 0.439135 23.7796 1.2208C24.561 2.00247 25 3.06263 25 4.16808C24.9995 4.86997 24.8218 5.56038 24.4834 6.17525C24.145 6.79013 23.6569 7.30956 23.0642 7.68537C22.4716 8.06117 21.7937 8.28119 21.0934 8.32501C20.3932 8.36883 19.6931 8.23503 19.0583 7.93602L15.2167 12.5392L18.6133 17.3042C19.2437 16.9072 19.9688 16.6865 20.7134 16.665C21.4579 16.6436 22.1946 16.8222 22.8467 17.1822C23.4989 17.5423 24.0426 18.0706 24.4213 18.7122C24.8 19.3538 24.9998 20.0853 25 20.8304C25.0002 21.4838 24.8469 22.1281 24.5524 22.7113C24.2579 23.2945 23.8305 23.8002 23.3046 24.1877C22.7787 24.5753 22.1691 24.8337 21.525 24.9422C20.8809 25.0506 20.2204 25.0061 19.5966 24.8122C18.9729 24.6182 18.4035 24.2803 17.9343 23.8257C17.4652 23.3712 17.1094 22.8126 16.8958 22.1951C16.6822 21.5777 16.6167 20.9186 16.7045 20.2712C16.7924 19.6238 17.0312 19.006 17.4017 18.4679L13.7433 13.3395H8.24833C8.03739 14.3482 7.46049 15.2431 6.62893 15.8514C5.79737 16.4598 4.77006 16.7385 3.74517 16.6339C2.72028 16.5293 1.77043 16.0487 1.07884 15.2849C0.387251 14.5211 0.00292512 13.5281 0 12.4976C0.00102746 11.4646 0.385426 10.4689 1.07867 9.70337C1.77191 8.93785 2.72462 8.4571 3.75207 8.35432C4.77952 8.25154 5.80852 8.53405 6.63957 9.14709C7.47062 9.76013 8.04452 10.66 8.25 11.6723H13.77L17.72 6.93735C17.0401 6.17545 16.665 5.18941 16.6667 4.16808Z" />
          </svg>
          <span>Share</span>
          <Share shareUrl={`${window.location.origin}/profile/${creator}/${podcastId}/${episode.id}#${episode.id}`} />
        </div>
        {/* pin */}
        <div className="flex flex-col items-center gap-y-3 hover:scale-110 cursor-pointer">
          <svg
            className="fill-[#104F6A] dark:fill-blue-300 w-5 lg:w-6"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.989 0.819491C17.5131 0.343294 16.8813 0.0548136 16.2098 0.00704903C15.5382 -0.0407155 14.8719 0.155444 14.3334 0.559489L10.2612 3.6138C8.5696 4.88275 6.58539 5.70485 4.49196 6.00414L1.44866 6.43747C0.428171 6.58425 -0.319724 7.68296 0.172349 8.76071C0.635065 9.77136 2.10849 12.4357 6.26734 16.7564L0.426773 22.5967C0.293256 22.7256 0.186758 22.8799 0.113494 23.0504C0.0402295 23.221 0.00166574 23.4044 5.27814e-05 23.59C-0.00156018 23.7756 0.03381 23.9597 0.104099 24.1315C0.174389 24.3033 0.27819 24.4593 0.409445 24.5906C0.540701 24.7218 0.696783 24.8256 0.868584 24.8959C1.04039 24.9662 1.22446 25.0016 1.41008 24.9999C1.5957 24.9983 1.77913 24.9598 1.94969 24.8865C2.12024 24.8133 2.2745 24.7068 2.40345 24.5732L8.24402 18.733C12.565 22.8916 15.2295 24.365 16.2402 24.8277C17.3166 25.3197 18.4168 24.5719 18.5622 23.5514L18.9969 20.5083C19.2962 18.415 20.1184 16.4309 21.3874 14.7393L24.4405 10.6674C24.8445 10.1289 25.0407 9.46268 24.9929 8.79115C24.9452 8.11962 24.6567 7.48788 24.1805 7.01199L17.989 0.819491Z" />
          </svg>
          <span>Pin</span>
        </div>
      </div>
    </div>
  )
}
export default SingleEpisode
