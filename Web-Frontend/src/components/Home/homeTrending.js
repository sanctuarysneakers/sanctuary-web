import React from 'react'

export default function HomeTrending() {

    return (
        <div className='home-trending'>
            <div className='home-trending-wrapper'>
                <div className='home-trending-headline'>
                    <div className='home-trending-text'>
                        <h2>
                            Shop the hottest collections from
                        </h2>
                        <h2 className='flipping-text'>
                            Nike.
                        </h2>
                    </div>

                    <div className='home-trending-buttons'>
                        <div className='home-trending-browse'>
                            <p>
                                Start browsing
                            </p>
                        </div>
                        <div className='home-trending-how-it-works'>
                            <p>
                                See how it works
                            </p>
                        </div>
                    </div>
                </div>

                <div className='home-trending-products'>
                    <div className='home-trending-product-top'></div>
                    <div className='home-trending-product-middle'>
                        <div className='home-trending-card'></div>
                        <div className='home-trending-card'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}