import React from 'react'
import { useDispatch } from 'react-redux'
import { use100vh } from 'react-div-100vh'
import { useMediaQuery } from 'react-responsive'
import { Helmet } from 'react-helmet'
import { recordSplashHeight } from '../../redux/actions'
import BlogArticle from '../blogarticle.js'
export default function Home() {

    const dispatch = useDispatch()

    // Properly adjust height for navbar and mobile bar
    const isDesktop = useMediaQuery({
        query: '(min-width: 930px)'
    })
    const height = use100vh()
    const splashHeight = isDesktop ? height - 385 : height - 61
    dispatch(recordSplashHeight(splashHeight))

    return (
        <div>
            <Helmet>
                <title>Sanctuary: Sneaker Price Comparison and Market Data</title>
                <meta
                    name="description"
                    content="Sanctuary Sneakers collects all available sneaker market data in one place so you can 
                             compare and find the best prices. Sanctuary lets you see real-time prices, new inventory, 
                             and more information for both new and used sneakers from several trusted online stores so 
                             you don't have to! Stay up-to-date with price drop alerts, and release reminders."
                />
            </Helmet>
            <main
                className='filter-catalog'
            >
            </main>

            <section id="blogHeader">
                    <BlogArticle />
            </section>

        </div>
           
    )
}