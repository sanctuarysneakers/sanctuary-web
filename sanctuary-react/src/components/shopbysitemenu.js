import React from 'react'
import {Link} from 'react-router-dom'

export default function ShopBySiteMenu() {

    return (
        // TODO: make the site names render the site logo images instead
        // TODO: clicking on a site page when in the shop all menu should load properly
        <div className="shopBySiteMenu">
            <Link to={{
                pathname:'/shop',
                state: { site: "flightclub"}
                }}>
                Flight Club
            </Link>

            <Link to={{
                pathname:'/shop',
                state: { site: "goat"}
                }}>
                GOAT
            </Link>

            <Link to={{
                pathname:'/shop',
                state: { site: "grailed"}
                }}>
                Grailed
            </Link>

            <Link to={{
                pathname:'/shop',
                state: { site: "stockx"}
                }}>
                StockX
            </Link>
        </div>
    )
}