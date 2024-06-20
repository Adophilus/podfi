import { createFileRoute } from '@tanstack/react-router'
import { Link, useParams } from "react-router-dom"
import { users, podcasts } from "@/demoData"
import { Share } from "../../-components/share"
import { Donate } from "./-components/donate"
import { auth } from '@/lib/auth'

export const Route = createFileRoute('/(page)/_page/podcasts/$id')({
  component: PodcastPage
})

function PodcastPage() {
  const { user } = auth.hooks.useAuthUnsafe()
  const { podcastId } = useParams()
  const podcast = podcasts.find((podcast) => podcast.id == podcastId)

  if (!podcast)
    return (
      <p className=" dark:text-white pt-96 text-center min-h-screen text-3xl">
        NO SUCH PODCAST
      </p>
    )

  return (
    <div className="px-4 xs:px-10 lg:px-20 xl:px-32 pt-36 font-futuraMd text-black dark:text-white w-full">
      {/* title */}
      <div className="lg:-ml-10 flex items-center gap-x-4">
        <img src="/images/ongoing_events_vector.svg" width={40} height={40} />
        <h1 className="text-2xl xs:text-5xl drop-shadow-[1px_0_5px_rgba(61,294,255,0.8)]">
          {podcast.title}
        </h1>
      </div>
      {/* image */}
      <div className="my-12 w-full h-[300px] xs:h-[500px] rounded-3xl border-4 border-blue-500 relative bg-white dark:bg-neutral-800 z-0">
        {/* bg borders */}
        <div className="w-full h-[302px] xs:h-[502px] bg-blue-500 rounded-3xl absolute top-1 left-3 -z-10 rounded-bl-[180px]"></div>
        {/* image container */}
        <div className="w-full h-full rounded-2xl border-4 border-blue-500 overflow-hidden">
          <img
            src={podcast.imageUrl}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      {/* cta */}
      <div className="w-full text-blue-500 dark:text-blue-300 flex flex-col xl:flex-row items-center justify-between gap-x-8 gap-y-6">
        <h4 className="w-fit text-sky-900 dark:text-blue-300 text-3xl">
          Join the Live chat to stand a chance to win free tokens!!!
        </h4>
        <div className="w-fit flex gap-4 flex-wrap xl:flex-nowrap xs:gap-x-8 justify-center items-center">
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

            <h3>{podcast.listening} Listening</h3>
          </div>
          {/* likes */}
          <div className="text-nowrap flex items-center gap-x-2">
            <svg
              className="fill-[#0A1640] dark:fill-blue-500"
              width="25"
              height="21"
              viewBox="0 0 25 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.033 0C15.6511 0 13.6159 1.63219 12.4977 2.75747C11.3795 1.63219 9.34886 0 6.96818 0C2.86477 0 0 2.74982 0 6.68609C0 11.0233 3.55795 13.8267 7 16.5382C8.625 17.8197 10.3068 19.1438 11.5966 20.6122C11.8136 20.858 12.1318 21 12.4659 21H12.5318C12.867 21 13.1841 20.8569 13.4 20.6122C14.692 19.1438 16.3727 17.8186 17.9989 16.5382C21.4398 13.8278 25 11.0244 25 6.68609C25 2.74982 22.1352 0 18.033 0Z" />
            </svg>

            <h3>{podcast.likes} likes</h3>
          </div>
          {/* share */}
          <div
            className="w-fit h-fit cursor-pointer"
            onClick={(e) =>
              e.currentTarget.querySelector(".share-modal")?.showModal()
            }
          >
            <svg
              className="fill-[#104F6A] hover:fill-sky-950 dark:fill-blue-300 dark:hover:fill-blue-500 w-5 lg:w-6"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.6667 4.16808C16.6667 3.06263 17.1057 2.00247 17.8871 1.2208C18.6685 0.439135 19.7283 0 20.8333 0C21.9384 0 22.9982 0.439135 23.7796 1.2208C24.561 2.00247 25 3.06263 25 4.16808C24.9995 4.86997 24.8218 5.56038 24.4834 6.17525C24.145 6.79013 23.6569 7.30956 23.0642 7.68537C22.4716 8.06117 21.7937 8.28119 21.0934 8.32501C20.3932 8.36883 19.6931 8.23503 19.0583 7.93602L15.2167 12.5392L18.6133 17.3042C19.2437 16.9072 19.9688 16.6865 20.7134 16.665C21.4579 16.6436 22.1946 16.8222 22.8467 17.1822C23.4989 17.5423 24.0426 18.0706 24.4213 18.7122C24.8 19.3538 24.9998 20.0853 25 20.8304C25.0002 21.4838 24.8469 22.1281 24.5524 22.7113C24.2579 23.2945 23.8305 23.8002 23.3046 24.1877C22.7787 24.5753 22.1691 24.8337 21.525 24.9422C20.8809 25.0506 20.2204 25.0061 19.5966 24.8122C18.9729 24.6182 18.4035 24.2803 17.9343 23.8257C17.4652 23.3712 17.1094 22.8126 16.8958 22.1951C16.6822 21.5777 16.6167 20.9186 16.7045 20.2712C16.7924 19.6238 17.0312 19.006 17.4017 18.4679L13.7433 13.3395H8.24833C8.03739 14.3482 7.46049 15.2431 6.62893 15.8514C5.79737 16.4598 4.77006 16.7385 3.74517 16.6339C2.72028 16.5293 1.77043 16.0487 1.07884 15.2849C0.387251 14.5211 0.00292512 13.5281 0 12.4976C0.00102746 11.4646 0.385426 10.4689 1.07867 9.70337C1.77191 8.93785 2.72462 8.4571 3.75207 8.35432C4.77952 8.25154 5.80852 8.53405 6.63957 9.14709C7.47062 9.76013 8.04452 10.66 8.25 11.6723H13.77L17.72 6.93735C17.0401 6.17545 16.665 5.18941 16.6667 4.16808Z" />
            </svg>
            <Share shareUrl={`${window.location.href}`} />
          </div>
          {/* join livestream */}
          {podcast.livestream ? (
            <Link
              to={`/profile/${podcast.creator}`}
              className="w-max text-nowrap bg-blue-500 rounded-lg text-white p-2 xxs:p-4 hover:bg-blue-600"
            >
              Join Livestream
            </Link>
          ) : (
            ""
          )}
          {/* show episodes */}
          <Link
            to={`/profile/${podcast.creator}/${podcast.id}#episodes`}
            className="w-max text-nowrap bg-blue-500 rounded-lg text-white p-2 xxs:p-4 hover:bg-blue-600"
          >
            Show Episodes
          </Link>
          {/* donate */}
          <div
            onClick={(e) =>
              e.currentTarget.querySelector(".donate-modal").showModal()
            }
            className="w-max cursor-pointer text-nowrap bg-blue-500 rounded-lg text-white p-2 xxs:p-4 hover:bg-blue-600"
          >
            <img
              src="/images/coins_icon.svg"
              width={20}
              className="inline mr-2"
            />
            Donate
            <Donate user={user} podcastCreator={podcast.creator} />
          </div>
        </div>
      </div>
      <hr className="my-4 h-px w-full bg-black dark:bg-blue-100 border-0 " />
      <h1 className="mb-8 text-3xl text-sky-900 dark:text-blue-300">
        Live Chat
        <svg
          className="fill-[#0A1640] dark:fill-blue-100 inline ml-4"
          width="25"
          height="20"
          viewBox="0 0 25 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.89751 0.199428C10.8113 -0.0839544 14.7425 -0.0652991 18.6532 0.255215L21.0104 0.447679C21.8752 0.518738 22.69 0.867067 23.3239 1.43669C23.9578 2.00632 24.374 2.76417 24.5056 3.58847L24.6537 4.5215C25.1583 7.68442 25.1112 10.906 24.5143 14.0541C24.3716 14.8067 23.9585 15.4874 23.3472 15.9775C22.7358 16.4676 21.9648 16.736 21.1686 16.736H8.13999C7.83953 16.736 7.54487 16.8071 7.2807 16.9438L1.6039 19.8754C1.43802 19.9611 1.25184 20.0039 1.06358 19.9997C0.875309 19.9956 0.691384 19.9445 0.529774 19.8517C0.368164 19.7588 0.234396 19.6272 0.14154 19.4698C0.0486835 19.3123 -8.46314e-05 19.1345 1.1025e-07 18.9535V7.07514C0.00037367 5.3414 0.682393 3.6718 1.90947 2.40069C3.13655 1.12959 4.8181 0.350818 6.61737 0.220348L6.89751 0.199428ZM6.8946 7.09885C6.4134 7.09885 5.95191 7.28252 5.61165 7.60946C5.27139 7.9364 5.08024 8.37982 5.08024 8.84219C5.08024 9.30455 5.27139 9.74797 5.61165 10.0749C5.95191 10.4018 6.4134 10.5855 6.8946 10.5855C7.37581 10.5855 7.8373 10.4018 8.17756 10.0749C8.51782 9.74797 8.70897 9.30455 8.70897 8.84219C8.70897 8.37982 8.51782 7.9364 8.17756 7.60946C7.8373 7.28252 7.37581 7.09885 6.8946 7.09885ZM12.7006 7.09885C12.2194 7.09885 11.7579 7.28252 11.4176 7.60946C11.0774 7.9364 10.8862 8.37982 10.8862 8.84219C10.8862 9.30455 11.0774 9.74797 11.4176 10.0749C11.7579 10.4018 12.2194 10.5855 12.7006 10.5855C13.1818 10.5855 13.6433 10.4018 13.9835 10.0749C14.3238 9.74797 14.515 9.30455 14.515 8.84219C14.515 8.37982 14.3238 7.9364 13.9835 7.60946C13.6433 7.28252 13.1818 7.09885 12.7006 7.09885ZM16.6922 8.84219C16.6922 8.37982 16.8834 7.9364 17.2236 7.60946C17.5639 7.28252 18.0254 7.09885 18.5066 7.09885C18.9878 7.09885 19.4493 7.28252 19.7895 7.60946C20.1298 7.9364 20.3209 8.37982 20.3209 8.84219C20.3209 9.30455 20.1298 9.74797 19.7895 10.0749C19.4493 10.4018 18.9878 10.5855 18.5066 10.5855C18.0254 10.5855 17.5639 10.4018 17.2236 10.0749C16.8834 9.74797 16.6922 9.30455 16.6922 8.84219Z"
          />
        </svg>
      </h1>
      {/* comments container */}
      <div className="flex flex-co gap-y-16">
        {/* comment */}

        {/* should receive from form */}
        <PageComment
          username={user.username}
          profilePicture={user.profilePicture}
          content="I noticed the following, the keeper never celebrated even after saving
          the first 3 penalties, probably because he knew the job was not yet
          done or he respected the opponent."
        />
      </div>
      {/* comment form */}
      <form
        action=""
        className="mt-28 mb-16 relative text-sm xxs:text-lg leading-6 text-[#0A1640] w-full xxs:w-11/12 mx-auto"
      >
        <textarea
          name="live-comment"
          id="live-comment"
          placeholder="Write a chat on the live"
          rows={1}
          className="w-full min-h-12 h-max p-2 pr-16 xxs:p-4 xxs:pb-5 xxs:pr-28 bg-blue-100 border-2 border-blue-300 rounded-xl outline-cyan-500 resize-none overflow-hidden"
          onInput={(e) => {
            e.currentTarget.style.height = ""
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px"
          }}
        />
        <button
          type="submit"
          className="absolute bottom-4 right-2  xxs:right-4 text-white bg-blue-500 hover:bg-blue-600 rounded-xl px-2 py-1 xxs:px-4 xxs:py-2"
        >
          Send
        </button>
      </form>
    </div>
  )
}

const PageComment = ({ username, profilePicture, content }) => {
  return (
    <div className="flex gap-x-3 xxs:gap-x-6 text-base xxs:text-lg leading-6 text-[#0A1640] dark:text-blue-500">
      {/* image */}
      <div className="w-12 h-12 min-w-12 min-h-12 rounded-full overflow-hidden">
        <img
          src={profilePicture}
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* username/content/like-dislike */}
      <div className="flex flex-col gap-y-2">
        {/* username */}
        <h1>{username}</h1>
        {/* comment content */}
        <p className="text-blue-500 dark:text-blue-100">
          {content}
        </p>
        {/* like/dislike */}
        <div className="flex gap-x-6">
          <div className="flex gap-x-1 hover:text-sky-500 dark:hover:text-blue-300 fill-[#0A1640] dark:fill-blue-500 hover:fill-sky-500 dark:hover:fill-blue-300">
            <svg
              className="fill-inherit cursor-pointer"
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.1501 14.2655L14.8551 10.1855C14.8965 9.94636 14.8851 9.70108 14.8218 9.4668C14.7584 9.23252 14.6447 9.0149 14.4885 8.82917C14.3323 8.64344 14.1374 8.49408 13.9174 8.39153C13.6975 8.28899 13.4578 8.23573 13.2151 8.2355H8.03409C7.91317 8.23552 7.7937 8.20922 7.68398 8.15843C7.57425 8.10764 7.4769 8.03356 7.39868 7.94136C7.32046 7.84915 7.26325 7.74103 7.23103 7.62449C7.19881 7.50795 7.19234 7.38579 7.21208 7.2665L7.87508 3.2215C7.98268 2.56473 7.95202 1.89274 7.78508 1.2485C7.71365 0.982298 7.57609 0.738477 7.38517 0.539693C7.19425 0.340909 6.95618 0.193614 6.69308 0.111497L6.54809 0.0644963C6.22025 -0.0408138 5.86452 -0.0164782 5.55408 0.132496C5.21408 0.296496 4.96609 0.595497 4.87409 0.950496L4.39808 2.7845C4.24655 3.36812 4.02634 3.93172 3.74209 4.4635C3.32709 5.2405 2.68508 5.8635 2.01708 6.4385L0.578085 7.6785C0.378454 7.85101 0.222538 8.06836 0.123113 8.31275C0.0236879 8.55715 -0.0164169 8.82162 0.00608477 9.0845L0.818085 18.4775C0.853874 18.8929 1.04413 19.2798 1.35127 19.5618C1.65842 19.8437 2.06014 20.0003 2.47708 20.0005H7.12508C10.6071 20.0005 13.5781 17.5745 14.1501 14.2655Z" />
            </svg>

            <span>11</span>
          </div>
          <div className="flex gap-x-1 hover:text-sky-500 dark:hover:text-blue-300 fill-[#0A1640] dark:fill-blue-500 hover:fill-sky-500 dark:hover:fill-blue-300">
            <svg
              className="fill-inherit cursor-pointer"
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.1502 5.735L14.8552 9.815C14.8965 10.0541 14.8852 10.2994 14.8218 10.5337C14.7585 10.768 14.6448 10.9856 14.4886 11.1713C14.3324 11.3571 14.1375 11.5064 13.9175 11.609C13.6976 11.7115 13.4578 11.7648 13.2152 11.765H8.03417C7.91325 11.765 7.79378 11.7913 7.68406 11.8421C7.57433 11.8929 7.47698 11.9669 7.39876 12.0591C7.32054 12.1513 7.26333 12.2595 7.23111 12.376C7.19889 12.4926 7.19242 12.6147 7.21216 12.734L7.87516 16.779C7.98299 17.4361 7.95233 18.1085 7.78516 18.753C7.64616 19.286 7.23516 19.715 6.69316 19.889L6.54817 19.936C6.22017 20.041 5.86316 20.016 5.55416 19.868C5.38819 19.7893 5.24136 19.6753 5.12393 19.534C5.00649 19.3927 4.92126 19.2276 4.87417 19.05L4.39816 17.216C4.24664 16.6324 4.02643 16.0688 3.74217 15.537C3.32717 14.76 2.68516 14.137 2.01716 13.562L0.578165 12.322C0.378407 12.1496 0.222402 11.9323 0.122966 11.6878C0.0235296 11.4434 -0.0165002 11.1789 0.00616483 10.916L0.818165 1.523C0.853954 1.10759 1.04421 0.720699 1.35135 0.43873C1.6585 0.156762 2.06022 0.000213109 2.47716 0H7.12516C10.6072 0 13.5782 2.426 14.1502 5.735Z" />
            </svg>

            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  )
}
