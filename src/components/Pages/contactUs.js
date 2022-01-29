import React from "react"
import ContactForm from "../contactForm"
import Footer from "../footer"

export default function ContactUs() {

    return (
        <div className="contact-us">
            <div className="contact-us-content">
                <ContactForm />
            </div>

            <Footer colour={'white'} />
        </div>
    )
}