import { Reviews } from "../-components/reviews"
import { Hero } from "../-components/hero"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute('/(page)/_page/')({
  component: IndexPage
})

function IndexPage() {
  return (
    <div className="px-10 xl:px-20 font-futuraMd text-black dark:text-white">
      <Hero />
      {/* tech used */}
      <div className="flex flex-col sm:flex-row gap-x-4 gap-y-6 flex-wrap lg:flex-nowrap justify-center items-center w-fit bg-cyan-100 rounded-xl mx-auto my-32 py-4">
        <img
          loading="lazy"
          src="/images/thirdweb.svg"
          width={250}
          height={150}
        />
        <div>
          <img
            loading="lazy"
            src="/images/graph.svg"
            width={100}
            height={100}
            className="-ml-4 max-w-full"
          />
        </div>
        <img
          loading="lazy"
          src="/images/solidity.svg"
          width={170}
          height={100}
        />
      </div>
      {/* 3 squares */}
      <div id="how-it-works" className="flex flex-col lg:flex-row items-center justify-between gap-4  max-w-screen-xl mx-auto">
        {/* square */}
        <div className="border-blue-500 border rounded-3xl w-fit h-fit bg-blue-500">
          <div className="border-blue-500 border rounded-3xl w-fit h-fit p-12 rounded-tr-[200px] bg-white flex justify-center items-center">
            <img
              loading="lazy"
              src="/images/frame1.svg"
              width={200}
              height={200}
              className="w-[150px] md:w-[200px]"
            />
          </div>
        </div>
        {/* square */}
        <div className="border-blue-500 border rounded-3xl w-fit h-fit bg-blue-500">
          <div className="border-blue-500 border rounded-3xl w-fit h-fit p-12 rounded-tr-[200px] bg-white flex justify-center items-center">
            <img
              loading="lazy"
              src="/images/frame2.svg"
              width={200}
              height={200}
              className="w-[150px] md:w-[200px]"
            />
          </div>
        </div>
        {/* square */}
        <div className="border-blue-500 border rounded-3xl w-fit h-fit bg-blue-500">
          <div className="border-blue-500 border rounded-3xl w-fit h-fit p-12 rounded-tr-[200px] bg-white flex justify-center items-center">
            <img
              loading="lazy"
              src="/images/frame3.svg"
              width={200}
              height={200}
              className="w-[150px] md:w-[200px]"
            />
          </div>
        </div>
      </div>
      {/* centered circle */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 max-w-screen-xl mx-auto my-32">
        <div className="w-fit h-fit">
          <img
            loading="lazy"
            src="/images/text1.png"
            width={350}
            height={300}
            className="w-[250px] md:w-[350px]"
          />
        </div>
        <div className="w-fit h-fit bg-white rounded-full">
          <img
            loading="lazy"
            src="/images/centered_circle.svg"
            width={350}
            height={350}
            className="w-[250px] md:w-[350px]"
          />
        </div>
        <div className="w-fit h-fit">
          <img
            loading="lazy"
            src="/images/text2.png"
            width={350}
            height={300}
            className="w-[250px] md:w-[350px]"
          />
        </div>
      </div>
      <hr className="h-1 bg-blue-500 w-8/12 mx-auto border-0" />
      <section id="features" className="text-center flex flex-col lg:flex-row gap-y-28 gap-x-12 justify-between items-center lg:items-start max-w-screen-xl mx-auto py-32">
        <div className="flex flex-col items-center justify-center max-w-[370px]">
          <img src="/images/coins.svg" width={100} height={100} loading="lazy" />
          <h2 className="text-3xl xs:text-4xl max-w-[210px] mt-9 mb-5">
            Monetization Made Easy
          </h2>
          <p className="text-xl xs:text-2xl font-futuraBk">
            Seamlessly integrate advertisements into your podcast with our
            user-friendly platform, allowing you to focus on what you do best:
            creating great content.
          </p>
        </div>
        {/* feature */}
        <div className="flex flex-col items-center justify-center max-w-[370px]">
          <img src="/images/money_and_clock.svg" width={100} height={100} loading="lazy" />
          <h2 className="text-3xl xs:text-4xl  mt-9 mb-5">
            Transparent & Timely Payments
          </h2>
          <p className="text-xl xs:text-2xl font-futuraBk">
            Enjoy peace of mind with our secure and straightforward payment
            system. Track your earnings and get paid on time, every time.
          </p>
        </div>
        {/* feature */}
        <div className="flex flex-col items-center justify-center max-w-[370px]">
          <img src="/images/proportions.svg" width={100} height={100} loading="lazy" />
          <h2 className="text-3xl xs:text-4xl max-w-[250px] mt-9 mb-5">
            No Exclusivity Required
          </h2>
          <p className="text-xl xs:text-2xl font-futuraBk">
            Keep control over your content and partnerships. With the PodFi Ads
            Marketplace, you’re free to monetize your podcast through other
            channels as well.
          </p>
        </div>
      </section>
      <hr className="h-1 bg-blue-500 w-8/12 mx-auto border-0" />
      <section id="about" className="font-futuraBk text-center max-w-screen-xl mx-auto my-32">
        <h1 className="font-bold text-4xl xs:text-5xl font-roboto">
          Get Started
        </h1>
        <p className="text-xl xs:text-2xl mb-14 mt-4">
          3 easy steps to start earning money from your podcast
        </p>
        {/* steps */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-y-28 gap-x-12 text-xl xs:text-2xl">
          {/* step */}
          <div className="flex flex-col max-w-[350px] items-center gap-y-5">
            {/* image */}
            <div className="relative h-24 w-24">
              <img
                src="/images/ellipse_larger.svg"
                width={96}
                height={96}
                className="w-full"
              />
              <img
                src="/images/ellipse_smaller.svg"
                width={70}
                height={70}
                className="absolute top-3 left-3"
              />
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-sky-900 absolute top-6 left-8">
                1
              </span>
            </div>
            {/* text */}
            <p>
              Launch your podcast from PodFi and enjoy its powerful features.
              Not on PodFI yet? Find out how to simply{" "}
              <Link to="#" className="text-blue-500 hover:text-cyan-500">
                switch your podcast to PodFi
              </Link>
            </p>
          </div>
          {/* step */}
          <div className="flex flex-col max-w-[350px] items-center gap-y-5">
            {/* image */}
            <div className="relative h-24 w-24">
              <img
                src="/images/ellipse_larger.svg"
                width={96}
                height={96}
                className="w-full"
              />
              <img
                src="/images/ellipse_smaller.svg"
                width={70}
                height={70}
                className="absolute top-3 left-3"
              />
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-sky-900 absolute top-6 left-8">
                2
              </span>
            </div>
            {/* text */}
            <p>
              Opt into programmatic ads, host-read ads, or both. Manage your
              preferred ad categories.
            </p>
          </div>
          {/* step */}
          <div className="flex flex-col max-w-[350px] items-center gap-y-5">
            {/* image */}
            <div className="relative h-24 w-24">
              <img
                src="/images/ellipse_larger.svg"
                width={96}
                height={96}
                className="w-full"
              />
              <img
                src="/images/ellipse_smaller.svg"
                width={70}
                height={70}
                className="absolute top-3 left-3"
              />
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-sky-900 absolute top-6 left-8">
                3
              </span>
            </div>
            {/* text */}
            <p>
              By default, PodFi will assign the best time slots for your podcast
              episodes, but you can also opt to customize them yourself.
            </p>
          </div>
        </div>
      </section>
      {/* reviews */}
      <Reviews />
    </div>
  )
}

