import React, { useState, useEffect, useRef } from 'react'
import FadeIn from 'react-fade-in'
import VisibleOnScreen from '../../hooks/visibleOnScreen'
import picture2 from '../../assets/images/aboutDrawing2.png'

export default function HowItWorksSplash () {
  const ref = useRef()
  const isVisible = VisibleOnScreen(ref)

  const [render, setRender] = useState(false)

  useEffect(() => {
    if (isVisible) { setRender(true) }
  }, [isVisible])

  return (
    <div className="how-it-works-splash">
      <div className="how-it-works-splash-content">
        <div ref={ref} className="how-it-works-splash-header">
          <FadeIn visible={render} delay={200} transitionDuration={1500}>
            <h1>Everything sneakers.</h1>
            <h1>All in one place.</h1>
          </FadeIn>
        </div>

        <div className="how-it-works-splash-image">
          <img src={picture2} alt='Jordan 4s' />
        </div>
      </div>
    </div>
  )
}
