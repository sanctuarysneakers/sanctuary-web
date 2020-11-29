import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useOutsideAlerter from '../Hooks/useoutsidealerter'
import { hideShoeModal, showShoeModal } from '../../redux/actions'
import { RiCloseLine } from 'react-icons/ri'
import { Helmet } from 'react-helmet'
import { FaChevronRight } from 'react-icons/fa'

import useAPICall from "../Hooks/useapicall"


export default function ShoeModal() {

    const dispatch = useDispatch()
    const shoe = useSelector(state => state.shoe)
    const comparisonData = useSelector(state => state.shoeComparisonData)

    const showComparisonDiv = comparisonData.length > 0 ? true : false

    // This makes it so that the modal closes if user clicks outside the modal
    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    useAPICall('comparison')

    console.log(shoe)

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
                            <div className={shoe.source === 'grailed' ? "grailed-image" : "shoe-image"}>
                                <img
                                    src={shoe.image}
                                    alt={shoe.model}
                                />
                            </div>
                        </div>

                        <div className="right">
                            <div className="right-content">

                                <div className="shoe-model">
                                    <h2>{shoe.model}</h2>
                                </div>

                                <div className="info-boxes">
                                    <div className="price-condition-container">
                                        <div className="price-condition">
                                            <h3>$</h3>
                                            <span className="price-font">{shoe.price.toLocaleString()}</span>
                                            <span className="condition-font">{shoe.shoe_condition}</span>
                                        </div>
                                    </div>

                                    <div className='shoe-size-container'>
                                        <div className="shoe-size">
                                            <h3>Size</h3>
                                            <span>{shoe.size}</span>
                                        </div>
                                    </div>

                                    <div className="source-and-buy">
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
                                </div>
                            </div>
                        </div> 
                    </div>

                    {showComparisonDiv && 
                    <div className="web-comparison-content">
                        <div className="compare-divider"></div>
                        {
                            comparisonData.map(sneaker => {
                                return (
                                    <a className ="compare-data" target="_blank" href={`https://${sneaker.url}`}>

                                        <div className="compare-left">
                                            <div className="compare-source">
                                                {sneaker.source &&
                                                    <img
                                                        src={require(`../../assets/images/logos/${sneaker.source}.png`)}
                                                        alt={sneaker.source}
                                                    />
                                                }
                                            </div>

                                            <div className="compare-price">
                                                ${sneaker.price.toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="compare-icon">
                                            <FaChevronRight />
                                        </div>

                                    </a>
                                )
                            })}
                    </div>}
                </div>


                {/* MOBILE VERSION  */}


                <div className="mobile-version">

                    <div className='closeButton'
                        onClick={() => dispatch(hideShoeModal())}>
                        <RiCloseLine />
                    </div>

                    <div className="mobile-content">

                        <div className="top">
                            <div className={shoe.source === 'grailed' ? "mobile-grailed-image" : "mobile-shoe-image"}>
                                <img
                                    src={shoe.image}
                                    alt={shoe.model}
                                />
                            </div>
                        </div>

                        <div className="bottom">
                            <div className="bottom-content">

                                <div className="mobile-shoe-model">
                                    <h2>{shoe.model}</h2>
                                </div>

                                <div className="mobile-info-boxes">

                                    <div className="mobile-price-condition-container">
                                        <div className="mobile-price-condition">
                                            <h3>$</h3>
                                            <span className="price-font">{shoe.price.toLocaleString()}</span>
                                            <span className="condition-font">{shoe.shoe_condition}</span>
                                        </div>
                                    </div>

                                    <div className='shoe-size-container'>
                                        <div className="shoe-size">
                                            <h3>Size</h3>
                                            <span>{shoe.size}</span>
                                        </div>
                                    </div>

                                    <div className="source-and-buy">
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {showComparisonDiv &&
                    <div className="mobile-comparison-content">
                        {comparisonData.map(sneaker => {
                            return (
                                <a className="mobile-compare-data" target="_blank" href={`https://${sneaker.url}`}>

                                    <div className="mobile-compare-left">
                                        <div className="mobile-compare-source">
                                            {sneaker.source &&
                                                <img
                                                    src={require(`../../assets/images/logos/${sneaker.source}.png`)}
                                                    alt={sneaker.source}
                                                />}
                                        </div>

                                        <div className="mobile-compare-price">
                                            ${sneaker.price.toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="mobile-compare-icon">
                                        <FaChevronRight />
                                    </div>

                                </a>
                            )
                        })}
                    </div>}

                </div>

            </div>
        </div>
    )
}