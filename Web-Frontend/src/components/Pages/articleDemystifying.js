import React from 'react'
import author from '../../assets/images/ColeVanHinte.jpg'
import pictureOne from '../../assets/images/articledemystifying1.jpg'
import pictureTwo from '../../assets/images/articledemystifying2.jpg'

export default function ArticleDemystifying() {
    return (
        <div className='article'>
        <div className='article-wrapper'>

            <div className='article-header'>
                <div className='article-header-gradient'>
                    <div className='article-header-content'>
                        <h1>
                            Demystifying the Sneaker Market
                        </h1>
                        <div className='article-author'>
                            <img src={author} />
                            <div className='author-date'>
                                <h5>
                                    Cole Van Hinte
                                </h5>
                                <h6>
                                    March 29th, 2021
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='article-content'>
                <p> You may be asking yourself, why are some shoes selling for $800? 
                    Why are there so many different Jordan 1s at so many price points? When I buy from a reseller, is the shoe new? 
                    The sneaker market is a confusing place, and Sanctuary Sneakers is here to help.</p>

                
                <div className='article-image'>
                    <img src={pictureTwo} alt='Sneaker market diagram' />
                    <h4 className='image-source'>
                            Image via Wall Street Journal
                    </h4>
                </div>
                
                <b>Secondary Sneaker Market</b>
                <p> When you buy from StockX or GOAT, you’re buying sneakers through a middleman. 
                    Sellers, including retailers and independent merchants, send their shoes to StockX or GOAT before they are sent to you.</p>

                <b>What’s the point of these sites?</b>
                <p>The role of the sites that we display are two-fold. First, they are the market-makers, who connect buyers to sellers and 
                    ensure transparent transactions. Secondly, they take care of the quality-assurance - they verify that the shoes you’re buying 
                    are legit (no scuffs, no fakes, no bad smells).</p>

                <b>What price do I pay?</b>  
                <p>Sanctuary displays the price that you will pay for each shoe, before taxes, duties and shipping. Some websites will show you a 
                    bid price and an ask price. Put simply, the Bid price is what buyers are willing to pay, and the Ask is what sellers are 
                    willing to sell for. If you want to buy, you can either wait until a seller agrees to sell at your Bid, or you can buy the 
                    shoes immediately at the Ask price. We know this may be a lot to get your head around, but that’s why Sanctuary is here to help!
                </p>  

                <div className='article-image'>
                    <img src={pictureOne} alt='Wall of sneakers' />
                    <h4 className='image-source'>
                            Image via GQ
                    </h4>
                </div>

                <b>How do I know I’m paying a good price? Hint: Sanctuary Sneakers</b>
                <p>Individual reselling websites won’t tell you whether or not you’re looking at the best price available on the internet. 
                    As you may imagine, the same shoe is often listed at different prices on different websites. For those of you with a 
                    finance background, yes, this is in fact an <u>arbitrage opportunity</u>, meaning, you could buy shoes at a low price on one site, then 
                    resell them on another site at a higher price. Sanctuary is your shoe-browsing companion. We’ve scraped the web for the best 
                    prices available, and we show them to you all at once!</p>

                <b>Where do I start?</b>
                <p>If you’re unsure where to start, take a look at the carousels on our home page! We display the hottest shoes at any given time. 
                    If you’re looking for a specific shoe, try searching for it directly on our home page, then pick the website with the lowest 
                    price!</p>

                <p> Happy browsing! If you have any other questions about the purchasing process, reach out to us! We’re here to help. </p>
            </div>


        </div>
    </div>
    )
}