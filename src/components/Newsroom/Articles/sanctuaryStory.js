import React from 'react'
import { Helmet } from 'react-helmet'
import NextArticles from '../nextArticles'
import Footer from '../../Other/footer'
import ProfilePic from '../../../assets/images/ColeVanHinte.jpg'
import HeaderPic from '../../../assets/images/sanctuary-3D.gif'
import pictureOne from '../../../assets/images/Article1-1.jpg'
import pictureTwo from '../../../assets/images/Article1-2.jpg'

export default function SanctuaryStory () {
  return (
        <div className='newsroom-article'>
            <Helmet>
                <title>Sanctuary: Newsroom</title>
            </Helmet>
            <div className='newsroom-article-content'>
                <div className='newsroom-article-header'>
                    <h1>
                        Sanctuary: Our Story
                    </h1>

                    <div className='newsroom-article-profile'>
                        <img src={ProfilePic} alt='author' />

                        <div className='newsroom-article-date'>
                            <h2> Cole Van Hinte </h2>
                            <p> April 20, 2021 </p>
                        </div>
                    </div>
                </div>

                <div className='newsroom-article-image'>
                    <img src={HeaderPic} alt='header' />
                </div>

                <div className='newsroom-article-text'>
                    <p>
                        From the rise of the internet to the advancement of the smartphone, the convenience of online
                        shopping has revolutionized the way that goods are bought and sold. Despite the benefits of this
                        transformation, certain online markets remain riddled with price inconsistencies.
                    </p>
                </div>

                <div className='newsroom-article-text'>
                    <p>
                        So what are “price inconsistencies”? Let’s break it down. Maybe you want to buy a certain model of furniture
                        for your home, let’s say a shelf. You start browsing various websites, and after some time you find a shelf
                        and you decide to purchase it. Seems simple enough, no? What many people do not realize is that the same
                        model of shelf can most likely be found on another website for a cheaper price. This raises the question:
                        when shopping online, how do you find the best deal for an item when prices vary substantially across
                        providers?
                    </p>
                    <p>
                        This scenario is extremely relevant to the world of fashion, specifically the resale market. In 2020 the
                        global sneaker resale market stood at approximately $6 billion. Why is this the case? How does it work?
                        In its simplest form, industry giants such as Nike, Air Jordan, and Adidas release very limited quantities
                        of sought-after sneakers. Applying basic economics, this high-demand and low-supply model leads to an abundant
                        after-market, where fashion lovers buy and sell shoes for a wide range of prices.
                    </p>
                </div>

                <div className='newsroom-article-image'>
                    <img src={pictureOne} alt='article content' />
                    <p> Image via Blue Bite </p>
                </div>

                <div className='newsroom-article-text'>
                    <p>
                        The spread on sneaker prices leads us to the “shelf” problem stated above. With no price regulation on the
                        resale market, sneaker prices fluctuate substantially across websites. For example, a pair of Air Jordan
                        Fire Red 4s may be selling for $286 on StockX while the same model sells for $264 on FlightClub (these were
                        actual prices on January 31st, 2021). Alongside this problem emerged the concept of Sanctuary, and this is
                        our story:
                    </p>
                    <p>
                        Sanctuary aims to revolutionize the way sneakers and streetwear are bought and sold in the online marketplace.
                        Founded in April of 2020 by a group of Canadian University students, Sanctuary began as a simple concept that
                        attempted to answer the following question: how can individuals find the best prices on sneakers? It seems
                        like a simple question, but when factoring in the array of problems listed above, it becomes a complex
                        issue.
                    </p>
                </div>

                <div className='newsroom-article-image'>
                    <img src={pictureTwo} alt='article content' />
                    <p> Image via Los Angeles Times </p>
                </div>

                <div className='newsroom-article-text'>
                <p>
                        To answer our question, we knew that we were going to need a passionate team that shared the vision of
                        not only revolutionizing the fashion market but also striving towards helping individuals find the best
                        deals on sneakers. We gathered our resources and put together a team consisting of two business students
                        with a personal love for fashion, as well as four computer science students with eagerness to make our
                        mission a reality.
                    </p>
                    <p>
                        As a team, we launched our first version in September of 2020. This version allowed users to compare prices between
                        the main sneaker resale websites: <a href="https://stockx.com/">StockX</a>, <a href="https://www.goat.com">GOAT</a>,
                        <a href="https://www.flightclub.com/"> FlightClub</a>, and <a href="https://www.grailed.com/">Grailed</a>. Since our initial launch, we have continuously
                        improved our services through user feedback, research, and market analysis. We have added features such as the ‘compare
                        feature’, which allows the user to compare all the different prices for any specific model of sneaker simply by clicking on
                        it. We’ve also recently added user accounts, and have hardly scratched the surface of our full functionality.
                    </p>
                    <p>
                        As for the future, there are many exciting things to come. Sanctuary aims to push the limits of what’s
                        possible - and by leveraging data, analytics, and artificial intelligence, our goal is to transform the
                        fashion industry by creating a centralized platform that goes far beyond sneaker price comparison - rather,
                        a community centred around innovation and the user experience.

                    </p>
                    <p>
                        Although we face a long road ahead, the future is bright. Each day provides a new chapter in Sanctuary’s
                        young-lived life, and through our core values of passion, innovation, creativity, and integrity, we aim to
                        approach every scenario through the lens of opportunity.
                    </p>
                    <p>
                        Welcome to Sanctuary, and we hope you enjoy the ride!
                    </p>
                </div>
            </div>

            <NextArticles />

            <Footer colour={'blue'} />
        </div>
  )
}
