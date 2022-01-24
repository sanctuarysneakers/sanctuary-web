import React, { useState, useEffect, useRef } from "react";
import FadeIn from 'react-fade-in'
import VisibleOnScreen from "../Hooks/visibleOnScreen"
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha';

export default function HowItWorksContact() {

    const ref = useRef()
    const isVisible = VisibleOnScreen(ref)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [showCaptcha, setShowCaptcha] = useState(false)
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (isVisible)
            setRender(true)
    }, [isVisible])

    return (
        <div className="how-it-works-contact">
            <div className="how-it-works-contact-content">
                <div ref={ref} className="how-it-works-contact-text">
                    <FadeIn visible={render} delay={350} transitionDuration={1200}>
                        <h1>We love feedback!</h1>
                        <p>
                            Is there something you think we could do better? Please
                            feel free to contact us and we'll get back to you shortly!
                        </p>
                    </FadeIn>
                </div>

                <div className="how-it-works-contact-form">
                    <p className="how-it-works-contact-form-title">Your Name <span>*</span></p>
                    <input
                        className='how-it-works-contact-input'
                        placeholder='Full Name'
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <p className="how-it-works-contact-form-title">Your Email <span>*</span></p>
                    <input
                        className='how-it-works-contact-input'
                        placeholder='Email Address'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <p className="how-it-works-contact-form-title">Message <span>*</span></p>
                    <textarea
                        className='how-it-works-contact-input message'
                        placeholder='Type a message...'
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    />

                    <button className="how-it-works-contact-submit">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}