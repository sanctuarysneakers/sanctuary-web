import React, { useState, useEffect, useRef } from 'react'
import FadeIn from 'react-fade-in'
import VisibleOnScreen from '../../hooks/visibleOnScreen'

export default function HowItWorksInfo () {
  const ref = useRef()
  const isVisible = VisibleOnScreen(ref)

  const [render, setRender] = useState(false)

  useEffect(() => {
    if (isVisible) { setRender(true) }
  }, [isVisible])

  return (
        <div className="how-it-works-info">
            <div className="how-it-works-info-content">
                <div ref={ref} className="how-it-works-info-text">
                    <FadeIn visible={render} delay={350} transitionDuration={1200}>
                        <h1>How it works.</h1>
                        <p>
                            Sanctuary aims to provide the best possible deals on any
                            streetwear or sneakers you could want. Our mission is to
                            evolve the paradigm of fashion by leveraging big data,
                            analytics, and artificial intelligence to provide one
                            centralized online location for finding your perfect piece.
                        </p>
                    </FadeIn>
                </div>
            </div>
        </div>
  )
}
