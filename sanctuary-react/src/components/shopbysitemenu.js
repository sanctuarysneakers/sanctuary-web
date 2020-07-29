import React from 'react'
import {Link} from 'react-router-dom'

export default function ShopBySiteMenu(props) {

    let visibility = props.menuVisible ? "show" : "hide"

    return (
        <div className={`shopBySiteMenu ${visibility}`}>
            <Link to={{
                pathname:'/shop',
                state: { site: "flight club"}
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