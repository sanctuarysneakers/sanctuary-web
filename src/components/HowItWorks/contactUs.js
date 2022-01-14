import React, { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import FadeIn from 'react-fade-in'
import VisibleOnScreen from '../Hooks/visibleOnScreen'

export default function ContactUs() {

    const [render, setRender] = useState(false)

    const form = useRef();
    const ref = useRef();
    const isVisible = VisibleOnScreen(ref)

    useEffect(() => {
        if (isVisible)
            emailjs.init(process.env.REACT_APP_EMAILJS_API_KEY)
            setRender(true)
    }, [isVisible])


    // contact@sanctuarysneakers.com
    const sendEmail = (e) => {
        e.preventDefault();

        console.log(form.current);

        emailjs.sendForm('service_vr4w92j', 'template_tlxbpqj', form.current, process.env.REACT_APP_EMAILJS_USER_ID)
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
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

                        <form ref={form} onSubmit={sendEmail}>
                            <label>Name</label>
                            <input type="text" name="from_name" />
                            <label>Email</label>
                            <input type="email" name="from_email" />
                            <label>Message</label>
                            <textarea name="message" />
                            <input type="submit" value="Send" />
                        </form>
                    </FadeIn>
                </div>

            </div>
        </div>
    )
}