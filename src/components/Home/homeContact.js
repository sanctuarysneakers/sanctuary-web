import React, { useRef, useState, useEffect } from 'react'
import FadeIn from 'react-fade-in'
import VisibleOnScreen from '../Hooks/visibleOnScreen'

export default function HomeContact() {

    const [render, setRender] = useState(false)

    const ref = useRef()
    const isVisible = VisibleOnScreen(ref)

    useEffect(() => {
        if (isVisible)
            setRender(true)
    }, [isVisible])

    return (
        <div className='home-contact'>
            <div className='home-contact-content'>

                <div ref={ref} className='home-contact-text'>
                    <FadeIn visible={render} delay={300} transitionDuration={1100}>
                        <h1> We love feedback! </h1>
                        <p>
                            Is there something you think we could do better? Please 
                            feel free to contact us and we'll get back to you shortly!
                        </p>
                        <div className='home-contact-button'>
                            <a href = "mailto: contact@sanctuarysneakers.com">
                                Contact us
                            </a>
                        </div>
                    </FadeIn>
                </div>

            </div>
        </div>
    )
}