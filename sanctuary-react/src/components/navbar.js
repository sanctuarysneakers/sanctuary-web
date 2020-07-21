import React from 'react'
import {RiSearchLine, RiMenuLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'

const navLinks = [
    {
        title: "Shop All",
        path: "/shop"
    },
    {
        title: "Shop by Site",
        path: "/shop"
    },
    {
        title: "About Us",
        path: "/aboutus"
    }
]

export default function NavBar() {
    return (
        <div className='navbar'>
            <Link to={"/"}><span>Sanctuary</span></Link>
            <ul>
                {
                navLinks.map((link, index) => (
                <li key={index}>
                    <Link to={link.path}>
                        {link.title}
                    </Link>
                </li>))
                }
                <RiSearchLine/>
                <RiMenuLine/>
            </ul>
        </div>
    )
}