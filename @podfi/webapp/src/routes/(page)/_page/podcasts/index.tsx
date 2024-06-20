import { createFileRoute } from '@tanstack/react-router'
import { PodcastCard } from "./-components/podcast"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
import { podcasts } from '@/demoData'
import { auth } from '@/lib/auth'
import { theme } from '@/lib/theme'

export const Route = createFileRoute('/(page)/_page/podcasts/')({
  component: AdsMarketplace
})

function AdsMarketplace() {
  const { user } = auth.hooks.useAuthUnsafe()
  const { theme: _theme } = theme.hooks.useTheme()
  const dark = _theme === 'dark'

  const livestream = podcasts.filter((podcast) => podcast.livestream)

  return (
    <div className="px-4 xs:px-10 lg:px-20 xl:px-32 font-futuraMd text-black dark:text-white w-full">
      {/* nav bg */}
      <div className="-mr-4 xs:-mr-10 lg:-mr-20 xl:-mr-32 relative h-[200px] overflow-hidden">
        <img
          src="/images/ads_marketplace_bg.svg"
          width={800}
          className="absolute -top-[530px] -right-96 xs:-right-44 min-w-[800px]"
        />
      </div>
      {/* ongoing events */}
      {livestream.length ? (
        <section>
          <div className="flex items-center gap-x-4">
            <img
              src="/images/ongoing_events_vector.svg"
              width={40}
              height={40}
            />
            <h1 className="text-2xl xs:text-5xl drop-shadow-[1px_0_5px_rgba(61,294,255,0.8)]">
              Ongoing Events
            </h1>
          </div>
        </section>
      ) : (
        ""
      )}
      {/* popular podcasts */}
      <section>
        <h1 className="text-2xl xs:text-5xl drop-shadow-[1px_0_5px_rgba(61,294,255,0.8)]">
          Popular Podcasts
        </h1>
        <Swiper
          style={
            dark
              ? {
                "--swiper-pagination-color": "#fff",
                "--swiper-pagination-bullet-inactive-color": "#fff",
                "--swiper-pagination-bullet-inactive-opacity": "0.3",
                "--swiper-pagination-bullet-size": "20px",
                "--swiper-pagination-bullet-border-radius": "5px",
                "--swiper-pagination-bottom": "0",
              }
              : {
                "--swiper-pagination-color": "#0a1640",
                "--swiper-pagination-bullet-inactive-color": "#0a1640",
                "--swiper-pagination-bullet-inactive-opacity": "0.4",
                "--swiper-pagination-bullet-size": "20px",
                "--swiper-pagination-bullet-border-radius": "5px",
                "--swiper-pagination-bottom": "0",
              }
          }
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            832: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="w-full h-fit mt-10 mb-20"
        >
          {podcasts.map((podcast) => (
            <SwiperSlide key={podcast.id} className="mb-16 h-fit w-fit">
              <PodcastCard podcast={podcast} user={user} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* featured podcasts */}
      <section>
        <h1 className="text-2xl xs:text-5xl drop-shadow-[1px_0_5px_rgba(61,294,255,0.8)]">
          Featured Podcasts
        </h1>
        <div className="w-full flex flex-wrap justify-start items-start relative z-0 gap-x-8 gap-y-16 mt-10 mb-40">
          {podcasts
            .filter((podcast) => podcast.featured)
            .map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} user={user} />
            ))}
        </div>
      </section>
    </div>
  )
}
