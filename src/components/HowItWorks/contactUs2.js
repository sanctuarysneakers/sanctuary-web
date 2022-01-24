import React, { useRef, useState, useEffect, useReducer } from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha';
import FadeIn from 'react-fade-in'
import VisibleOnScreen from '../Hooks/visibleOnScreen'

export default function ContactUs2() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [render, setRender] = useState(false)

    const ref = useRef();
    const isVisible = VisibleOnScreen(ref)

    useEffect(() => {
        if (isVisible)
            emailjs.init(process.env.REACT_APP_EMAILJS_API_KEY)
            setRender(true)
    }, [isVisible])

    const submitFormAndShowCaptcha = (e) => {
        e.preventDefault();
        setShowCaptcha(true);
    };

    const sendEmail = () => {    
        const params = {
          name, 
          email,
          message,
          'g-recaptcha-response': process.env.REACT_APP_EMAILJS_CAPTCHA_PRIVATE_KEY
        };

        emailjs.send('service_vr4w92j', 'template_tlxbpqj', params, process.env.REACT_APP_EMAILJS_USER_ID)
          .then(({ status }) => {
            if (status === 200) {
                console.log("email successful"); 
            } else {
                console.log("email unsuccessful"); 
            }
          }, (err) => {
            console.log(err);
          });
    };

    return (
        <div className='contact-us'>
            <div className='contact-us-content'>
                <div ref={ref} className='contact-us-text'>
                    <FadeIn visible={render} delay={300} transitionDuration={1100}>
                        <h1> We love feedback! </h1>
                        <p>
                            Is there something you think we could do better? Please 
                            feel free to contact us and we'll get back to you shortly!
                        </p>

                        {!showCaptcha ? (
                            <form onSubmit={submitFormAndShowCaptcha}>
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                    required
                                />
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                                <label>Message</label>
                                <textarea 
                                    rows="5"
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                                <input type="submit"/>
                            </form>
                        ): (
                            <ReCAPTCHA
                                sitekey={process.env.REACT_APP_EMAILJS_CAPTCHA_SITE_KEY}
                                onChange={sendEmail}
                            />
                        )}
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
