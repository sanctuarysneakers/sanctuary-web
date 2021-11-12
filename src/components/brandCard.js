import React from "react";

export default function BrandCard({ brand }) {

    const handleClick = () => {
        document.location.href = `./browse/${brand}`
    }

    return (
        <div className='brand-card' onClick={handleClick}>
            <div className='brand-card-content'>
                <p>{brand}</p>
            </div>
        </div>
    )
}