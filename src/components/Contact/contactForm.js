import React, { useState, useEffect, useRef } from "react"
import FadeIn from 'react-fade-in'
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser'
import VisibleOnScreen from "../../hooks/visibleOnScreen";
import { ReactComponent as Spinner } from '../../assets/images/spinner.svg'

export default function ContactForm() {

    const animationRef = useRef()
    const recaptchaRef = useRef()
    const isVisible = VisibleOnScreen(animationRef)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [messageError, setMessageError] = useState('')
    const [status, setStatus] = useState('')
    const [captcha, setCaptcha] = useState(false)
    const [pressed, setPressed] = useState(false)
    const [render, setRender] = useState(false)

    const handleSendEmail = () => {
        if (!pressed) {
            setNameError('')
            setEmailError('')
            setMessageError('')
            setPressed(true)

            if (name === '') {
                setNameError('Please enter your name.')
            } else if (email === '') {
                setEmailError('Please enter an email address.')
            } else if (message === '') {
                setMessageError('Please enter a message.')
            } else if (captcha) {
                const params = {
                    name,
                    email,
                    message,
                    'g-recaptcha-response': process.env.REACT_APP_EMAILJS_CAPTCHA_PRIVATE_KEY
                }

                emailjs.send('service_vr4w92j', 'template_tlxbpqj', params, process.env.REACT_APP_EMAILJS_USER_ID)
                    .then(({ status }) => {
                        if (status === 200) {
                            setName('')
                            setEmail('')
                            setMessage('')
                            setPressed(false)
                            recaptchaRef.current.reset()
                            setStatus('Success!')
                            setTimeout(() => setStatus(''), 2000)
                        } else {
                            setPressed(false)
                            setStatus('Sorry, please try again')
                            setTimeout(() => setStatus(''), 2000)
                        }
                    }, (err) => {
                        console.log(err)
                    })
            }
        }
    }

    useEffect(() => {
        if (isVisible)
            setRender(true)
    }, [isVisible])

    return (
        <div className="contact-form">
            <div className="contact-form-content">
                <div ref={animationRef} className="contact-form-text">
                    <FadeIn visible={render} delay={350} transitionDuration={1200}>
                        <h1>We love feedback!</h1>
                        <p>
                            Is there something you think we could do better? Please
                            feel free to contact us and we'll get back to you shortly!
                        </p>
                    </FadeIn>
                </div>

                <div className="contact-form-boxes">
                    <p className="contact-form-box-title">Your Name <span>* {nameError}</span></p>
                    <input
                        className='contact-form-input'
                        placeholder='Full Name'
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <p className="contact-form-box-title">Your Email <span>* {emailError}</span></p>
                    <input
                        className='contact-form-input'
                        placeholder='Email Address'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <p className="contact-form-box-title">Message <span>* {messageError}</span></p>
                    <textarea
                        className='contact-form-input message'
                        placeholder='Type a message...'
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                    />

                    <ReCAPTCHA
                        className='contact-form-captcha'
                        ref={recaptchaRef}
                        sitekey={process.env.REACT_APP_EMAILJS_CAPTCHA_SITE_KEY}
                        onChange={() => setCaptcha(true)}
                    />

                    <button className={`contact-form-submit ${pressed}`} onClick={handleSendEmail}>
                        {pressed ? <Spinner /> : status ? <p>{status}</p> : <p>Submit</p>}
                    </button>
                </div>
            </div>
        </div>
    )
}