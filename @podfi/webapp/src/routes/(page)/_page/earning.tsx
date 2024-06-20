import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(page)/_page/earning')({
  component: Earnings
})

function Earnings() {
  return (
    <div className="text-sky-900 dark:text-blue-300 font-futuraMd min-h-screen relative overflow-hidden px-4 xs:px-10 xl:px-20 z-0">
      {/* bg */}
      <div className="w-fit h-fit absolute -top-96 -right-[450px] -z-10">
        <img src="/images/profile_bg.svg" width={1000} height={1000} />
      </div>
      {/* username and picture */}
      <div className="text-2xl mt-36 ml-4 xs:ml-12 mb-16 flex gap-x-2 xs:gap-x-6 items-center">
        {/* picture */}
        <div className="w-20 min-w-20 h-20 border-2 border-blue-500 rounded-2xl overflow-hidden">
          <img
            src="/images/photo.jpg"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <h1>Username goes here</h1>
      </div>
      {/* earnings */}
      <h1 className="text-3xl ml-4 xs:ml-12 mb-6">Earnings</h1>
      <div className="mb-20 px-8 py-12 w-full min-h-[500px] border-2 border-cyan-500 rounded-xl bg-white dark:bg-neutral-800 flex flex-col gap-y-12">
        {/* tokens */}
        <div>
          <h2 className="text-3xl">Tokens</h2>
          <div className="w-full min-h-[200px] bg-gray-300"></div>
        </div>
        {/* nft */}
        <div>
          <h2 className="text-3xl">NFT</h2>
          <div className="w-full min-h-[200px] bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}
