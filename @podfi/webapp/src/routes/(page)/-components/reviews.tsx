// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
// import required modules
import { Autoplay, Pagination } from "swiper/modules"

const reviews = [
  {
    id: 1,
    author: "ADRIAN DRINGE",
    major: "Co founder Wefd",
    content:
      "I found PodFi to provide me the services I need to make my podcast successful at a reasonable price. The ability to monetize my podcast was a major factor in deciding to host with PodFi.",
  },
  {
    id: 2,
    author: "Sarah Johnson",
    major: "Creative Entrepreneur",
    content:
      "Choosing PodFi has been a game-changer for my podcasting journey. As a creative entrepreneur, the platform not only offers the services I need but also adds tremendous value to my content. The ability to monetize my podcast was a crucial factor in my decision to host with PodFi. The features and support provided have truly elevated my podcasting experience.",
  },
  {
    id: 3,
    author: "Emma Carter",
    major: "Marketing Specialist",
    content:
      "Embracing PodFi was a transformative experience for my marketing-focused podcast. The platform not only met but exceeded my expectations. The reasonable pricing coupled with the effective tools for podcast monetization played a pivotal role in my decision. PodFi's support and features have empowered me to enhance my content and engage with my audience more effectively.",
  },
]

export const Reviews = () => {
  return (
    <section className="font-futuraBk font-normal text-center bg-feedbackBg bg-top pt-48 px-4 -mx-10 xl:-mx-20">
      <h1 className="mb-6 text-blue-500 font-roboto font-bold text-5xl xs:text-6xl lg:text-7xl">
        Feedback
      </h1>
      <p className="text-blue-500 font-roboto font-bold text-3xl xs:text-4xl lg:text-5xl">
        See what Our users have to say
      </p>
      {/* carousel */}
      <Swiper
        style={{
          "--swiper-pagination-color": "#fff",
          "--swiper-pagination-bullet-inactive-color": "#000",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-pagination-bullet-size": "20px",
          "--swiper-pagination-top": "0",
          "--swiper-pagination-bottom": "auto",
        }}
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className=" text-lg xs:text-xl lg:text-2xl w-full h-fit mt-20 mb-40"
      >
        {reviews.map(review=>(
        <SwiperSlide className="pt-20" key={review.id}>
          <p className="max-w-[710px] mx-auto">
            “{review.content}”
          </p>
          <span className="block mt-5 mb-3 uppercase">{review.author}</span>
          <span className="block">{review.major}</span>
        </SwiperSlide>
        ))}
      </Swiper>
      <hr className="h-1 bg-blue-500 w-8/12 mx-auto border-0 mb-4" />
      <hr className="h-0.5 bg-indigo-800 w-full border-0" />
    </section>
  )
}
