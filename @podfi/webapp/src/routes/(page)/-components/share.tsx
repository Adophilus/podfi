import {
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  XIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share"

export const Share = ({shareUrl, title=''}) => {
  return (
      <dialog
        className="share-modal modal modal-bottom sm:modal-middle font-futuraMd"
      >
        <div className="modal-box bg-white text-black dark:bg-neutral-800 dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl">Share to</h3>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
          </div>
          <div className="py-12 border-y-2 border-black dark:border-neutral-700 border-opacity-15 flex flex-wrap gap-8">
            <FacebookShareButton url={shareUrl} className="hover:opacity-75">
              <FacebookIcon size={45} round />
            </FacebookShareButton>

            <FacebookMessengerShareButton
              url={shareUrl}
              className="hover:opacity-75"
            >
              <FacebookMessengerIcon size={45} round />
            </FacebookMessengerShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={title}
              className="hover:opacity-75"
            >
              <XIcon size={45} round />
            </TwitterShareButton>

            <TelegramShareButton
              url={shareUrl}
              title={title}
              className="hover:opacity-75"
            >
              <TelegramIcon size={45} round />
            </TelegramShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className="hover:opacity-75"
            >
              <WhatsappIcon size={45} round />
            </WhatsappShareButton>

            <ViberShareButton
              url={shareUrl}
              title={title}
              className="hover:opacity-75"
            >
              <ViberIcon size={45} round />
            </ViberShareButton>

            <LinkedinShareButton url={shareUrl} className="hover:opacity-75">
              <LinkedinIcon size={45} round />
            </LinkedinShareButton>

            <PinterestShareButton
              url={shareUrl}
              media={shareUrl}
              className="hover:opacity-75"
            >
              <PinterestIcon size={45} round />
            </PinterestShareButton>

            <RedditShareButton
              url={shareUrl}
              title={title}
              windowWidth={660}
              windowHeight={460}
              className="hover:opacity-75"
            >
              <RedditIcon size={45} round />
            </RedditShareButton>

            <TumblrShareButton
              url={shareUrl}
              title={title}
              className="hover:opacity-75"
            >
              <TumblrIcon size={45} round />
            </TumblrShareButton>

            <EmailShareButton
              url={shareUrl}
              subject={title}
              className="hover:opacity-75"
            >
              <EmailIcon size={45} round />
            </EmailShareButton>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="bg-neutral-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-neutral-600">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
  )
}
