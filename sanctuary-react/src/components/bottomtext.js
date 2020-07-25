import React from 'react'
import {FiInstagram, FiTwitter, FiFacebook} from 'react-icons/fi'
import { Link } from 'react-router-dom'

const footerLinks = [
    {
        title: "Contact Us",
        path: "/contact"
    },
    {
        title: "Terms of Use",
        path: "/terms"
    },
    {
        title: "Privacy Policy",
        path: "/privacy"
    }
]

export default function BottomText() { 
    return (
        <div className='bottomText'>
            <ul>
                {
                footerLinks.map((link, index) => (
                <li key={index}>
                    <Link to={link.path}>
                        {link.title}
                    </Link>
                </li>))
                }
            </ul>
            <div className="bottomTextIcons">
                <FiInstagram/>
                <FiTwitter/>
                <FiFacebook/>
                <h3>2020 © SANCTUARY | All Rights Reserved</h3>
            </div>
        </div>
    )
}