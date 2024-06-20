import { Link } from "@tanstack/react-router"

export const Hero = () => {
  return (
    <section className="w-full flex-col">
      {/* image */}
      <div className="w-fit flex relative justify-end ms-auto -mr-10 xl:-mr-20">
        <img
          src="/images/money_bag.svg"
          width={100}
          height={100}
          className="absolute top-1/3 right-2/3 w-[75px] xs:w-[100px]"
        />
        <img src="/images/mic.png" width={550} height={800} />
      </div>
      {/* content */}
      <div className="-mt-20 xs:-mt-64 sm:-mt-96 lg:-mt-[650px] xl:-mt-[670px]">
        <img
          src="/images/wave.png"
          width={500}
          height={250}
          className="xs:w-[300px] lg:w-[500px]"
        />
        <div className="flex flex-col gap-y-6 mt-12 lg:mt-44 xl:mt-12 relative z-10">
          <h1 className="font-bold text-3xl xs:text-4xl md:text-5xl lg:text-7xl  tracking-tighter">
            Your Podcast Hosting
            <span className="block mt-2">and Monetizing Platform</span>
          </h1>
          <p className="text-lg xs:text-xl md:text-2xl">
            PodFi is an easy and powerful way to create, promote and monetize
            your podcast. <br />
            Everything you need for a successful podcast.
          </p>
          <Link
            to="/podcasts"
            className="text-lg xs:text-xl md:text-2xl lg:text-3xl text-white bg-cyan-800 hover:bg-cyan-900 px-8 lg:px-12 py-6 rounded-xl w-fit"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}
