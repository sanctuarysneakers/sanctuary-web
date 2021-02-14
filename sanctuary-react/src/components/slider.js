import React, { useEffect, useRef } from 'react'
import { SwiperSlide } from 'swiper/react'
import Swiper from 'react-id-swiper'
import SwiperCore, { Navigation } from 'swiper'
import Sneaker from "./sneaker"
import { useSelector } from 'react-redux'

SwiperCore.use([Navigation])

export default function Slider({ data }) {

  const newSearchHappened = useSelector(state => state.newSearchHappened)

  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 23,
    shouldSwiperUpdate: true,
    slidesPerView: 'auto'
  }

  const ref = useRef(null);

  useEffect(() => {
    ref.current.swiper.slideTo(0)
  },[newSearchHappened])

  return (
    <div className='slider'>
      <Swiper {...params} ref={ref}>
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
                image_thumbnail={sneaker.image_thumbnail}
                shoe_condition={sneaker.shoe_condition}
                sku_id={sneaker.sku_id}
                currency={sneaker.currency}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}