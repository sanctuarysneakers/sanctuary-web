import React from 'react'
import {RiSearchLine, RiMenuLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import ShopBySite from './shopbysite'


export default function NavBar() {

    return (
        <div className='navbar'>
            <Link to={"/"}>
                <span className="sanctuaryLogo">
                    Sanctuary
                </span>
            </Link>
            <div className='navLinks'>
                <Link to="/shop">Shop All</Link>
                <ShopBySite/>
                <Link to="/about">About Us</Link>
                <RiSearchLine/>
                <RiMenuLine/>
            </div>
        </div>
    )
}