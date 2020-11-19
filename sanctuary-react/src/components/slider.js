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

  const ref = swiperRef ? swiperRef : null

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
                source={sneaker.source}
                image={sneaker.image}
                shoe_condition={sneaker.shoe_condition}
                sku_id={sneaker.sku_id}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}