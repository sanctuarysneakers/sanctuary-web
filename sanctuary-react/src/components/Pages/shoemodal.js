import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import useOutsideAlerter from '../useoutsidealerter'


export default function ShoeModal() {
    const shoe = useSelector(state => state.shoe)
    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    let url = shoe.url
    // this regex removes the 'https://' from the url, so that it can be added later
    url = url.replace(/(^\w+:|^)\/\//, '')

    // TODO: have goat condition attribute display as regular text
    return (
    <div className="modal">
        <div className="dashboard" ref={wrapperRef}>

            <div className="left"> 

                <div className="shoe-model">
                    <h2>{shoe.model}</h2>
                </div>

                <div className="shoe-size">
                    <h3>Size</h3>
                    <span>{shoe.size}</span>
                </div>

                <div className="shoe-condition">
                    <h3>Condition</h3>
                    <span>{shoe.shoe_condition}</span>
                </div>

            </div>

            <div className="middle">
                
                    <div className="shoe-image">
                        <img 
                            src={shoe.image}
                            alt={shoe.model}
                        />
                    </div>
            </div>

            <div className="right">

                <div className="shoe-price">
                    <h3>Price</h3>
                    <span>${shoe.price}</span>
                </div>

                <div className="shoe-source">
                    {shoe.source &&
                        <img 
                            src={require(`../../assets/images/logos/${shoe.source.toLowerCase()}.png`)}
                            alt={shoe.source}
                        />
                    }
                </div>

                <div className="shoe-buy">
                    <span>
                        <a target="_blank " href={`https://${url}`}>Buy Now</a>
                    </span>
                </div>

            </div>

        </div>
    </div>
    )
}