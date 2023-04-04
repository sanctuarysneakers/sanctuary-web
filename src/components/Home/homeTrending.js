import React, { useRef, useState, useEffect } from 'react'
import useAPICall from '../../hooks/useApiCall'
import VisibleOnScreen from '../../hooks/visibleOnScreen'
import FadeIn from 'react-fade-in'
import { TextLoop } from 'react-text-loop-next'
import BrandCard from './brandCard'
import FeaturedCollections from './featuredCollections'

export default function HomeTrending () {
  useAPICall('featuredcollections', null)

  const ref = useRef()
  const isVisible = VisibleOnScreen(ref)
  const [render, setRender] = useState(false)
  const [firstFlip, setFirstFlip] = useState(false)

  const brands = ['Nike', 'Air Jordan', 'Adidas', 'Yeezy', 'New Balance', 'Converse']
  const brandCards = brands.map((item, index) =>
    <BrandCard key={item} brand={item} index={index} length={brands.length} />
  )

  useEffect(() => {
    if (isVisible && !firstFlip) {
      setRender(true)
      setFirstFlip(true)
    }
  }, [isVisible, firstFlip])

  return (
    <div className='home-trending'>
      <div className='home-trending-content'>

        <div ref={ref} className='home-trending-text'>
          <FadeIn visible={render} delay={350} transitionDuration={1200}>
            <div className='home-trending-header'>
              <h1> Shop the hottest collections from </h1>

              <div className='flipping-brands'>
                <TextLoop interval={firstFlip ? 1500 : 0} fade={false}>
                  <h1 className='nike'> Nike. </h1>
                  <h1 className='air-jordan'> Air Jordan. </h1>
                  <h1 className='adidas'> Adidas. </h1>
                  <h1 className='yeezy'> Yeezy. </h1>
                  <h1 className='new-balance'> New Balance. </h1>
                  <h1 className='converse'> Converse. </h1>
                </TextLoop>{' '}
              </div>
            </div>

            <div className='home-trending-buttons'>
              {brandCards}
            </div>
          </FadeIn>
        </div>

        <div className="home-trending-sneakers">
          <FeaturedCollections/>
        </div>
      </div>
    </div>
  )
}
