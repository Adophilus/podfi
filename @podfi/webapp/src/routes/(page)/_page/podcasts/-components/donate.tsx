import { auth } from "@/lib/auth"
import { useState } from "react"

export const Donate = ({ podcastCreator }) => {
  const [donationAmount, setDonationAmount] = useState("")
  const { user } = auth.hooks.useAuthUnsafe()

  return (
    <dialog className="donate-modal modal modal-bottom sm:modal-middle font-futuraMd">
      <div className="modal-box bg-white text-black dark:bg-neutral-800 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Donate</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>
        <div className="cursor-default py-12 border-y-2 border-black dark:border-neutral-700 border-opacity-15">
          <h2 className="text-xl mb-6 text-left">Your Tokens: {user.tokens}</h2>
          <p htmlFor="donation-amount" className="text-wrap text-base text-left">
            How much would you like to donate to {podcastCreator}:
          </p>
          <input
            required
            value={donationAmount}
            onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
            autoFocus
            id="donation-amount"
            type="number"
            min={0.1}
            max={user.tokens}
            step={0.1}
            className="mt-4 w-full block border-2 border-blue-500 bg-transparent rounded-xl outline-cyan-500 px-3 py-1"
          />
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="text-sm bg-neutral-500 text-white xxs:text-lg px-4 py-2 rounded-lg hover:bg-neutral-600">
              Cancel
            </button>
          </form>
          <form method="">
            {/* if there is a button in form, it will close the modal */}
            <input
              type="number"
              hidden
              readOnly
              name="donation-amount"
              value={donationAmount}
            />
            <input
              type="text"
              hidden
              readOnly
              name="sender"
              value={user.username}
            />
            <input
              type="text"
              hidden
              readOnly
              name="receiver"
              value={podcastCreator}
            />
            <button
              type="submit"
              disabled={donationAmount ? false : true}
              className={`${donationAmount && donationAmount <= user.tokens
                ? "cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
                : "cursor-not-allowed bg-neutral-500 text-gray-300"
                } text-sm xxs:text-lg px-4 py-2 rounded-lg`}
            >
              Confirm Donation
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
export default Donate
