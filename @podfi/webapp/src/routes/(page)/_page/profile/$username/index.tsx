import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { AuthGuard } from '@/lib/auth/component'
import { auth } from '@/lib/auth'
import { helpers } from '@/lib/helpers'
import { Share2Icon } from 'lucide-react'

export const Route = createFileRoute('/(page)/_page/profile/$username/')({
  component: () => <AuthGuard><ProfilePage /></AuthGuard>,
  loader: async ({ params }) => {
    try {
      return helpers.getUserByUsername(params.username)
    }
    catch (err) {
      console.log(err)
      throw redirect({
        to: '/'
      })
    }
  }
})

function ProfilePage() {
  const creator = Route.useLoaderData()
  const { user } = auth.hooks.useAuthUnsafe()

  const share = () => {
    if (window.navigator.canShare()) {
      window.navigator.share({
        url: `${window.location.origin}/profile/${creator.username}`,
        title: `Check out ${creator.username} on PodFi`,
      })
    }
  }

  return (
    <div className="font-futuraMd min-h-screen relative overflow-hidden px-4 xs:px-10 xl:px-20 z-0">
      <div className="w-fit h-fit absolute -top-96 -right-[450px] -z-10">
        <img src="/images/profile_bg.svg" width={1000} height={1000} />
      </div>
      <div className="w-full flex flex-col-reverse items-center xl:items-start gap-y-8 gap-x-4 justify-between mt-36 xl:flex-row">
        <div className="flex flex-col w-full xl:w-8/12 gap-y-16">
          <div className="w-full h-fit">
            <div className="flex flex-col px-0 xs:px-4 sm::px-8 py-4 w-full max-w-[600px] text-lg text-sky-900 dark:text-blue-300">
              <div className="flex flex-col xs:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-y-4">
                  <hgroup>
                    <h2 className="text-2xl">{creator.name}</h2>
                    <p className="text-sm">@{creator.username}</p>
                  </hgroup>
                  <p className="py-4 text-sm">{creator.bio}</p>
                  <div className="flex gap-x-12 pl-4">
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl font-bold">{creator.subscribers.toString()}</h2>
                      <span className="text-cyan-600 text-sm">Subscribers</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 w-full xs:w-fit">
                  {creator.username !== user.username && (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 w-full py-2 rounded-xl">
                      Subscribe
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl xs:text-5xl drop-shadow-[1px_0_5px_rgba(61,294,255,0.8)]">Previous Podcasts</h1>
              <PodcastsList />
            </div>
          </div>
        </div>
        {user.addr === creator.addr && (
          <div className="w-full xl:w-80 flex flex-col gap-y-4">
            <Link
              to="/profile/$username/create"
              className="w-full flex items-center justify-center gap-x-4 bg-blue-500 hover:bg-blue-600 rounded-3xl text-white p-4 text-lg text-nowrap"
            >
              <img src="/images/livestream_icon.svg" width={50} height={50} />
              <span>Create new Podcast</span>
            </Link>
            <button
              onClick={share}
              className="w-full flex items-center justify-center gap-x-4 bg-blue-500 hover:bg-blue-600 rounded-3xl text-white p-4 text-lg text-nowrap"
            >
              <Share2Icon
                className="size-10"
              />
              Share
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const PodcastsList = () => {
  const creator = Route.useLoaderData()
  const podcasts = []

  if (podcasts.length === 0)
    return (
      <div className="py-12">
        No podcasts recorded
      </div>
    )

    return null
}
