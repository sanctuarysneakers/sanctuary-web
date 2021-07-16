import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Drop1 from '../../assets/images/newsroom-drop-1.webp'
import FeaturedDrop from '../../assets/images/featured-drop.svg'
import FeaturedDropDesktop from '../../assets/images/FeaturedDropDesktop.png'

export default function UpcomingRaffles() {

    const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' })

    return (
        <div className='newsroom-upcoming-drops'>

            <div className='upcoming-drops'>
                <p> Upcoming Raffles </p>
            </div>

            <div className='newsroom-featured-drop-wrapper'>
                <div className='newsroom-featured-drop'>
                        {!isDesktop && <img src={FeaturedDrop} alt='Featured Drop' />}
                        {isDesktop && <img src={FeaturedDropDesktop} alt='Featured Drop' />}
                        <div className='newsroom-featured-drop-text'>
                            <p> January 30, 2021 </p>
                            <h1> Nike Dunk Low Retro Kentucky (2020) </h1>
                        </div>
                </div>
            </div>

            <div className='newsroom-drop-container'>
                <div className='drops-area-1'>

                    <div className='newsroom-drop-1'>
                        <div className='drop-content'>
                            <div className='drop-image'>
                                <img src={Drop1} />
                            </div>
                            <div className='drop-text'>
                                <p> February 5, 2021 </p>
                                <h3> Jordan 1 Retro High </h3>
                                <h3> Dark Mocha </h3>
                            </div>
                        </div>
                    </div>

                    <div className='newsroom-drop-2'>
                        <div className='drop-content'>
                            <div className='drop-image'>
                                <img src={Drop1} />
                            </div>
                            <div className='drop-text'>
                                <p> February 5, 2021 </p>
                                <h3> Jordan 1 Retro High </h3>
                                <h3> Dark Mocha </h3>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='drops-area-2'>

                    <div className='newsroom-drop-3'>
                        <div className='drop-content'>
                            <div className='drop-image'>
                                <img src={Drop1} />
                            </div>
                            <div className='drop-text'>
                                <p> February 5, 2021 </p>
                                <h3> Jordan 1 Retro High </h3>
                                <h3> Dark Mocha </h3>
                            </div>
                        </div>
                    </div>

                    <div className='newsroom-drop-4'>
                        <div className='drop-content'>
                            <div className='drop-image'>
                                <img src={Drop1} />
                            </div>
                            <div className='drop-text'>
                                <p> February 5, 2021 </p>
                                <h3> Jordan 1 Retro High </h3>
                                <h3> Dark Mocha </h3>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )

}