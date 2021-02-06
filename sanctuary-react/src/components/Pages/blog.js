import React from 'react'
import { useMediaQuery } from 'react-responsive'
import BlogArticles from '../blogarticles'
import UpcomingDrops from '../upcomingdrops'
import UpcomingEvents from '../upcomingevents'
import SanctuaryLogo from '../../assets/images/Sanctuary-white.png'
import NewsroomHeader from '../../assets/images/newsroom.png'
import NewsroomMobile from '../../assets/images/newsroomMobile.png'

export default function Newsroom() {

    const isDesktop = useMediaQuery({
        query: '(min-width: 930px)'
    })

    return (
        <div className='newsroom'>

            <div className='newsroom-header'>

                {isDesktop && <img src={NewsroomHeader} alt='Newsroom Header' />}
                {!isDesktop && <img src={NewsroomMobile} alt='Newsroom Header Mobile' />}
                <div className='gradient' />

                <div className='newsroom-header-content'>
                    <div className='newsroom-logo'>
                        <img src={SanctuaryLogo} />
                        <h1> Newsroom </h1>
                    </div>
                    <p> Your source for the latest Sanctuary news, sneaker drops, and upcoming raffles. </p>
                </div>

            </div>

            <BlogArticles />

            <UpcomingDrops />

            <UpcomingEvents />

        </div>
    )
}

// import React from 'react'
// import { useDispatch } from 'react-redux'
// import Catalog from '../catalog'
// import FilterBar from '../filterbar'
// import { use100vh } from 'react-div-100vh'
// import { useMediaQuery } from 'react-responsive'
// import { Helmet } from 'react-helmet'
// import SearchBar from '../searchbar'
// import { recordSplashHeight } from '../../redux/actions'
// import BlogArticles from '../blogarticles'
// import UpcomingEvents from '../upcomingevents'
// import UpcomingDrops from '../upcomingdrops'
// export default function Home() {

//     const dispatch = useDispatch()

//     // Properly adjust height for navbar and mobile bar
//     const isDesktop = useMediaQuery({
//         query: '(min-width: 930px)'
//     })
//     const height = use100vh()
//     const splashHeight = isDesktop ? height - 385 : height - 61
//     dispatch(recordSplashHeight(splashHeight))

//     return (
//         <div>
//             <Helmet>
//                 <title>Sanctuary: Sneaker Price Comparison and Market Data</title>
//                 <meta
//                     name="description"
//                     content="Sanctuary Sneakers collects all available sneaker market data in one place so you can 
//                              compare and find the best prices. Sanctuary lets you see real-time prices, new inventory, 
//                              and more information for both new and used sneakers from several trusted online stores so 
//                              you don't have to! Stay up-to-date with price drop alerts, and release reminders."
//                 />
//             </Helmet>

//             <div className="splash" style={{ height: splashHeight }}>
//                 <div className='blog-bg-image' style={{ height: splashHeight }}></div>
//                 <div className='splashWrap'>
//                     <h1>Blog</h1>
//                     <h3>Keep up with our latest progress, new drops, and current raffles.</h3>
//                 </div>
//             </div>

//             <main
//                 className='filter-catalog'
//             >
//                 <section id="articles">
//                     <BlogArticles />
//                 </section>

//                 <section id="upcoming-raffles">
//                     <UpcomingEvents />
//                 </section>

//                 <section id="upcoming-drops">
//                     <UpcomingDrops />
//                 </section>
//             </main>
//         </div>
//     )
// }