import React from 'react'
import loader from "../../assets/images/loader.gif"

export default function Loader() {
    return (
        <div className='loading-page'> 
            <img src={loader} alt='loading...' />
        </div>
    )
}
