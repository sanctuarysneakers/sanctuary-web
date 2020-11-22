import React from 'react'
import { SwiperSlide } from 'swiper/react'
import Swiper from 'react-id-swiper'
import SwiperCore, { Navigation } from 'swiper'
import Sneaker from "./sneaker"

SwiperCore.use([Navigation])

export default function Slider({ data, swiperRef }) {

  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 23,
    shouldSwiperUpdate: true,
    slidesPerView: 'auto'
  }

  return (
    <div className='slider'>
      <Swiper {...params} ref={swiperRef}>
        {data.map(sneaker => {
          return (
            <SwiperSlide key={sneaker.id}>
              <Sneaker
                size={sneaker.size}
                price={sneaker.price}
                url={sneaker.url}
                model={sneaker.model}
                source={sneaker.source.toLowerCase()}
                image={sneaker.image}
                image_thumbnail={sneaker.image_thumbnail}
                shoe_condition={sneaker.shoe_condition}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}