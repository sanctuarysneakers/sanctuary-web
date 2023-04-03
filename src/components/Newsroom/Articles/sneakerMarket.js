import React from 'react'
import { Helmet } from 'react-helmet'
import NextArticles from '../nextArticles'
import Footer from '../../Other/footer'
import ProfilePic from '../../../assets/images/ColeVanHinte.jpg'
import HeaderPic from '../../../assets/images/demystifying-sneakers.jpg'
import pictureOne from '../../../assets/images/articledemystifying1.jpg'
import pictureTwo from '../../../assets/images/articledemystifying2.jpg'

export default function SneakerMarket () {
  return (
    <div className='newsroom-article'>
      <Helmet>
        <title>Sanctuary: Newsroom</title>
      </Helmet>
      <div className='newsroom-article-content'>
        <div className='newsroom-article-header'>
          <h1>
            Demystifying the sneaker market
          </h1>

          <div className='newsroom-article-profile'>
            <img src={ProfilePic} alt='author' />

            <div className='newsroom-article-date'>
              <h2> Cole Van Hinte </h2>
              <p> January 6, 2022 </p>
            </div>
          </div>
        </div>

        <div className='newsroom-article-image'>
          <img src={HeaderPic} alt='header' />
        </div>

        <div className='newsroom-article-text'>
          <p>
            Why is this brown pair of clogs selling for $1,200? Why do some Jordan 1’s cost upwards of $800, but I can find a similar pair at
            Footlocker for $120? If I order a pair of shoes from Stockx, GOAT or Flightclub, is it going to be a new pair?  The sneaker market is
            a confusing place, but this article will clear up any confusions you may have, and set you on your way to finding your perfect pair.
          </p>
        </div>

        <div className='newsroom-article-image'>
          <img src={pictureOne} alt='article content' />
          <p> Image via Wall Street Journal </p>
        </div>

        <div className='newsroom-article-text'>
          <h4>Secondary Sneaker Market</h4>
          <p>
            When you buy from StockX or GOAT (or any similar site), you’re buying sneakers through a middleman.
            Sellers, including retailers and independent merchants, send their shoes to StockX or GOAT before they are sent to you.
          </p>

          <h4>What’s the point of these sites?</h4>
          <p>
            The role of the sites that we display are two-fold. First, they are the market-makers, who connect buyers to sellers and ensure transparent
            transactions. Secondly, they take care of the quality-assurance - they verify that the shoes you’re buying are legit (no scuffs, no fakes,
            no bad smells).
          </p>

          <h4>What price do I pay?</h4>
          <p>
            Sanctuary displays the price that you will pay for each shoe, before taxes, duties and shipping. Some websites will show you a bid price and
            an ask price. Put simply, the Bid price is what buyers are willing to pay, and the Ask is what sellers are willing to sell for. If you want
            to buy, you can either wait until a seller agrees to sell at your Bid, or you can buy the shoes immediately at the Ask price. We know this
            may be a lot to get your head around, but that’s why Sanctuary is here to help!
          </p>
        </div>

        <div className='newsroom-article-image'>
          <img src={pictureTwo} alt='article content' />
          <p> Image via GQ  </p>
        </div>

        <div className='newsroom-article-text'>
          <h4>Why are some sneakers so expensive?</h4>
          <p>To put it simply, supply and demand. Companies release sneakers in extremely limited quantities, and depending on the model, colorway,
            and brand of a shoe, sneakerheads can be willing to pay a <em>lot</em> of money for their shoes. Since the initial release is bought up almost
            instantly, many sellers will resell their pairs at a much higher price, leading to high markups and a need for companies like Sanctuary
            Sneakers.
          </p>

          <h4>How do I know I’m paying a good price? Hint: Sanctuary Sneakers</h4>
          <p>Individual reselling websites won’t tell you whether or not you’re looking at the best price available on the internet.
            As you may imagine, the same shoe is often listed at different prices on different websites. For those of you with a finance background,
            yes, this is in fact an <u>arbitrage opportunity</u>, meaning, you could buy shoes at a low price on one site, then resell them on another site
            at a higher price. Sanctuary is your shoe-browsing companion. We’ve scraped the web for the best prices available, and we show them to
            you all at once!
          </p>

          <h4>Where do I start?</h4>
          <p>If you’re unsure where to start, take a look at the carousels on our home page! We display the hottest shoes at any given time.
            If you’re looking for a specific shoe, try searching for it directly on our home page, then pick the website with the lowest price!
          </p>

          <p> Happy browsing! If you have any other questions about the purchasing process, reach out to us! We’re here to help. </p>
        </div>
      </div>

      <NextArticles />

      <Footer colour={'blue'} />
    </div>
  )
}
