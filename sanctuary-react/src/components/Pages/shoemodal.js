import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useOutsideAlerter from '../Hooks/useoutsidealerter'
import { hideShoeModal } from '../../redux/actions'
import { RiCloseLine } from 'react-icons/ri'
import { Helmet } from 'react-helmet'

import useAPICall from "../Hooks/useapicall"


export default function ShoeModal() {

    const dispatch = useDispatch()
    const shoe = useSelector(state => state.shoe)
    const comparisonData = useSelector(state => state.shoeComparisonData)

    // This makes it so that the modal closes if user clicks outside the modal
    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    useAPICall('comparison')

    return (
        <div className="modal-shoe">

            <Helmet>
                <title>Sanctuary Sneakers | {shoe.model}</title>
                <meta
                    name="description"
                    content="Find Your Perfect Pair! Get the best price on Jordans from your favourite websites"
                />
            </Helmet>

            <div className="dashboard" ref={wrapperRef}>

                <div className="web-version">

                    <div className='closeButton'
                        onClick={() => dispatch(hideShoeModal())}>
                        <RiCloseLine />
                    </div>

                    <div className="web-content">
                        <div className="left">
                            <div className='shoe-model-container'>
                                <div className="shoe-model">
                                    <h2>{shoe.model}</h2>
                                </div>
                            </div>

                            <div className='size-and-condition'>
                                <div className='shoe-size-container'>
                                    <div className="shoe-size">
                                        <h3>Size</h3>
                                        <span>{shoe.size}</span>
                                    </div>
                                </div>

                                <div className='shoe-condition-container'>
                                    <div className="shoe-condition">
                                        <h3>Condition</h3>
                                        <span>{shoe.shoe_condition}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="middle">
                            <div className={shoe.source === 'grailed' ? "grailed-image" : "shoe-image"}>
                                <img
                                    src={shoe.image}
                                    alt={shoe.model}
                                />
                            </div>
                        </div>

                        <div className="right">
                            <div className="shoe-price-container">
                                <div className="shoe-price">
                                    <h3>Price</h3>
                                    <span>${shoe.price}</span>
                                </div>
                            </div>

                            <div className="shoe-source-container">
                                <div className="shoe-source">
                                    {shoe.source &&
                                        <img
                                            src={require(`../../assets/images/logos/${shoe.source}.png`)}
                                            alt={shoe.source}
                                        />
                                    }
                                </div>
                            </div>
                            <a className="buy-now" target="_blank" href={`https://${shoe.url}`}>Buy Now</a>
                        </div>

                        <div>
                            {
                                comparisonData.map(sneaker => {
                                    return (
                                        <a target="_blank" href={`https://${sneaker.url}`}>
                                            {sneaker.source &&
                                                <img
                                                    src={require(`../../assets/images/logos/${sneaker.source}.png`)}
                                                    alt={sneaker.source}
                                                />}
                                            {sneaker.model}
                                            ${sneaker.price}
                                        </a>
                                    )
                                })}
                        </div>
                    </div>
                </div>


                {/* MOBILE VERSION  */}


                <div className="mobile-version">

                    <div className='m-top'>
                        <div className="m-shoe-model">
                            <h2>{shoe.model}</h2>
                        </div>
                    </div>

                    <div className="m-middle">
                        <div className="m-middle-left">

                            <div className="m-shoe-image-container">
                                <div className="m-shoe-image">
                                    <img
                                        src={shoe.image}
                                        alt={shoe.model}
                                    />
                                </div>
                            </div>


                            <div className="m-shoe-source">
                                {shoe.source &&
                                    <img
                                        src={require(`../../assets/images/logos/${shoe.source}.png`)}
                                        alt={shoe.source}
                                    />
                                }
                            </div>
                        </div>

                        <div className="m-middle-right">

                            <div className='m-shoe-price-container'>
                                <div className="m-shoe-price">
                                    <h3>Price</h3>
                                    <span>${shoe.price}</span>
                                </div>
                            </div>

                            <div className="m-shoe-size-container">
                                <div className="m-shoe-size">
                                    <h3>Size</h3>
                                    <span>{shoe.size}</span>
                                </div>
                            </div>

                            <div className="m-shoe-condition-container">
                                <div className="m-shoe-condition">
                                    <h3>Condition</h3>
                                    <span>{shoe.shoe_condition}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a className="buy-now" target="_blank " href={`https://${shoe.url}`}>Buy Now</a>

                    <div>
                        {comparisonData.map(sneaker => {
                            return (
                                <a target="_blank" href={`https://${sneaker.url}`}>
                                    {sneaker.source &&
                                        <img
                                            src={require(`../../assets/images/logos/${sneaker.source}.png`)}
                                            alt={sneaker.source}
                                        />}
                                    {sneaker.model}
                                    ${sneaker.price}
                                </a>
                            )
                        })}
                    </div>

                    <div className='closeButton'
                        onClick={() => dispatch(hideShoeModal())}>
                        <RiCloseLine />
                    </div>
                </div>
            </div>
        </div>
    )
}