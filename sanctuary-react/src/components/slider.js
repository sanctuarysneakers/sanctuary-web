import React from 'react'
import { SwiperSlide } from 'swiper/react'
import Swiper from 'react-id-swiper'
import SwiperCore, { Navigation } from 'swiper'
import Sneaker from "./sneaker"

SwiperCore.use([Navigation])

//TODO: keep div space even when no results show up
export default function Slider({ data }) {

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
      <Swiper {...params}>
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
                shoe_condition={sneaker.shoe_condition}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}