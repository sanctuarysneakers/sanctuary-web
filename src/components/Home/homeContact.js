import React, { useRef, useState, useEffect } from 'react'
import FadeIn from 'react-fade-in'
import VisibleOnScreen from '../Hooks/visibleOnScreen'

export default function HomeContact() {

    const [render, setRender] = useState(false)

    const ref = useRef()
    const isVisible = VisibleOnScreen(ref)

    useEffect(() => {
        if (isVisible) {
            setRender(true)
        }
    }, [isVisible])

    return (
        <div className='home-contact'>
            <div className='home-contact-content'>

                <div ref={ref} className='home-contact-text'>
                    <FadeIn visible={render} delay={200} transitionDuration={500}>
                        <h1> We love feedback! </h1>

                        <p> Is there something you think we could do better? </p>

                        <p className='home-contact-b-text'> Please feel free to contact us and we'll get back to you shortly! </p>

                        <a className='home-contact-us' href = "mailto: contact@sanctuarysneakers.com">
                            Contact us
                        </a>
                    </FadeIn>
                </div>

            </div>
        </div>
    )








    // return (
    //     <div className='home-contact'>
    //         <div className='home-contact-headline'>
    //             <div className='home-contact-text'>
    //                 <h2>
    //                     We love feedback!
    //                 </h2>
    //                 <p>
    //                     Is there something you think we could do better?
    //                     Please feel free to contact us and we’ll get back to you shortly!
    //                 </p>
    //             </div>

    //             <div className='home-contact-buttons'>
    //                 <div className='home-contact-us'>
    //                     <p>
    //                         Contact us
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}