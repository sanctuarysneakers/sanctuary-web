import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Drop1 from '../assets/images/newsroom-drop-1.webp'
import FeaturedDrop from '../assets/images/featured-drop.svg'
import FeaturedDropDesktop from '../assets/images/FeaturedDropDesktop.png'

export default function UpcomingDrops() {

    const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' })

    return (
        <div className='newsroom-upcoming-drops'>

            <div className='upcoming-drops'>
                <p> Upcoming Drops </p>
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


// import React, { useState } from 'react'
// import "../assets/styling/_blogarticles.scss"
// export default function UpcomingDrops() {

//     return (
//         <React.Fragment>
//             <div class = "horizontalLine"></div>
//             <h1 className = "upcomingHeader"> Upcoming Drops</h1>
//             <div class="drop">

//                 <div class="raffleDesc">
//                     <h2 class="raffleHeader"> DROP: Adidas Ultra Boost DNA</h2> 
//                     <p class="raffleText">Though Nike has all but revealed their festive plans for Chinese New Year, adidas seems to 
//                     be savoring the surprise, slowly offering up glimpses of commemorative releases. As seen by way of their recently 
//                     unveiled “Made In China” pack, the brand has opted for a celebration less overt, an approach that is extending even
//                      unto this duo of Ultra Boost DNAs. Find more 
//                      information <a href="https://sneakernews.com/2020/12/28/adidas-ultra-boost-dna-cny-gz8989-gz7603-release-date/">here</a>. </p>
//                 </div>
//                 <img class="raffleImage"
//                     src="https://image.goat.com/crop/750/attachments/product_template_pictures/images/031/435/746/original/FW4899.png.png"
//                 ></img>
//             </div>
//             <div class="drop">
//                 <div class="raffleDesc">
//                     <h2 class="raffleHeader"> DROP: Nike Air Max Zephyr "Spring Festival"</h2> 
//                     <p class="raffleText"> To go along with the Blazer Mid, Nike is inviting the Air Max Zephyr to celebrate 
//                     the upcoming Spring Festival. But, in comparison, the high profile runner is far more subdued, 
//                     only dressed up with patterns rather than a transforming tearaway upper.
//                     Find more information <a href="https://sneakernews.com/2021/01/02/nike-air-max-zephyr-spring-festival-DD8486-096/">here</a>. </p>
//                 </div>
//                 <img class="raffleImage"
//                     src="https://sneakerbardetroit.com/wp-content/uploads/2021/01/Nike-Air-Max-Zephyr-Spring-Festival-DD8486-096-Release-Date-4-1068x720.jpg"
//                 ></img>
//             </div>
//         </React.Fragment>
//     )
// }