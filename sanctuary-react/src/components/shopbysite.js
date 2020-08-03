import React, { useState } from 'react'
import ShopBySiteMenu from './shopbysitemenu'

import {RiArrowDownSLine} from 'react-icons/ri'

export default function ShopBySite() {
    const [menuVisible, toggleMenuVisibility] = useState(false)

    function toggleMenu() {
        toggleMenuVisibility((prev) => !prev)
    }

    return (
        <div className="shopBySite">
            <button onClick={toggleMenu}>
                Shop by Site
                <RiArrowDownSLine className="caret-icon"/>
            </button>
            {menuVisible && <ShopBySiteMenu/>}
        </div>
    )
}