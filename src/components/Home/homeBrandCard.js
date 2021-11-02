import React from 'react'
import { useSelector } from 'react-redux'

export default function homeBrandCard({ data }) {

    const clickHandler = () => {
        window.location.href = "https://sanctuarysneakers.com/browse/" + data.name
    }

    return (
        <div className="home-brand-card" onClick={clickHandler}>
            <h4 className="home-brand-name"> {data.name} </h4>
        </div>
    )
}
