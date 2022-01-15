import React, { useRef, useState, useEffect, useReducer } from 'react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha';
import FadeIn from 'react-fade-in'
import VisibleOnScreen from '../Hooks/visibleOnScreen'


function reducer(state, action) {
    switch (action.type) {
        case 'name':
        return { ...state, name: action.value };
        case 'email':
        return { ...state, email: action.value };
        case 'message':
        return { ...state, message: action.value };
        default:
        throw new Error();
    }
}

export default function ContactUs() {
    const initialState = {
        name: '',
        email: '',
        message: '',
    };
    const [formState, dispatch] = useReducer(reducer, initialState);
    const [showCaptcha, setShowCaptcha] = useState(false);

    const { name, email, message } = formState;

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
          ...formState,
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
                                    onChange={(e) => dispatch({ type: 'name', value: e.target.value })} 
                                    required
                                />
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => dispatch({ type: 'email', value: e.target.value })}
                                    required 
                                />
                                <label>Message</label>
                                <textarea 
                                    rows="5"
                                    type="text"
                                    value={message}
                                    onChange={(e) => dispatch({ type: 'message', value: e.target.value })}
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