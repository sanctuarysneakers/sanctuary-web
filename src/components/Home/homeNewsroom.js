import React, { useRef, useState, useEffect } from 'react'
import { ArticleData } from '../Newsroom/articleData'
import FadeIn from 'react-fade-in'
import Slider from 'react-slick'
import VisibleOnScreen from '../../hooks/visibleOnScreen'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function HomeNewsroom () {
  const ref = useRef()
  const isVisible = VisibleOnScreen(ref)
  const sliderRef = useRef()

  const [render, setRender] = useState(false)
  const [firstFlip, setFirstFlip] = useState(false)

  const sliderSettings = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    variableWidth: true
  }

  useEffect(() => {
    if (isVisible) { setRender(true) }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible && !firstFlip) {
      sliderRef.current.slickPause()
    } else if (isVisible && !firstFlip) {
      setFirstFlip(true)
      sliderRef.current.slickPlay()
    }
  }, [isVisible, firstFlip])

  const clickHandler = (path) => {
    document.location.href = path
  }

  return (
    <div className='home-newsroom'>
      <div className='home-newsroom-content'>

        <div ref={ref} className='home-newsroom-text'>
          <FadeIn visible={render} delay={350} transitionDuration={1500}>
            <h1> Everything you need to know about sneakers is here. </h1>
            <p>
              Stay up to date with the latest Sanctuary news and original articles.
              It&apos;s the ultimate place for all sneakerheads alike, curated by our team.
            </p>
            <div className='home-newsroom-read'
              onClick={() => clickHandler('/newsroom')}>
              Start reading
            </div>
          </FadeIn>
        </div>

        <div className='home-newsroom-articles'>
          <Slider {...sliderSettings} ref={sliderRef}>
            <div style={{ width: 1020 }}>
              <div className='home-newsroom-article'
                onClick={() => clickHandler('/newsroom-buy-your-pair')}>

                <div className='home-newsroom-img' style={{ backgroundImage: `url(${ArticleData[0].image})` }} />
                <div className='home-newsroom-article-gradient sanctuary'>
                  <div className='home-newsroom-article-content'>
                    <p> {ArticleData[0].date} </p>
                    <h2> {ArticleData[0].title} </h2>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: 1020 }}>
              <div className='home-newsroom-article'
                onClick={() => clickHandler('/newsroom-demystifying-the-sneaker-market')}>

                <div className='home-newsroom-img' style={{ backgroundImage: `url(${ArticleData[1].image})` }} />
                <div className='home-newsroom-article-gradient'>
                  <div className='home-newsroom-article-content'>
                    <p> {ArticleData[1].date} </p>
                    <h2> {ArticleData[1].title} </h2>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: 1020 }}>
              <div className='home-newsroom-article'
                onClick={() => clickHandler('/newsroom-how-adidas-and-carbon-3d-are-revolutionizing-sneaker-production')}>

                <div className='home-newsroom-img' style={{ backgroundImage: `url(${ArticleData[2].image})` }} />
                <div className='home-newsroom-article-gradient'>
                  <div className='home-newsroom-article-content'>
                    <p> {ArticleData[2].date} </p>
                    <h2> {ArticleData[2].title} </h2>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: 1020 }}>
              <div className='home-newsroom-article'
                onClick={() => clickHandler('/newsroom-our-top-drops-of-2020')}>

                <div className='home-newsroom-img' style={{ backgroundImage: `url(${ArticleData[3].image})` }} />
                <div className='home-newsroom-article-gradient'>
                  <div className='home-newsroom-article-content'>
                    <p> {ArticleData[3].date} </p>
                    <h2> {ArticleData[3].title} </h2>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}
