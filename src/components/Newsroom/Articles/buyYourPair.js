import React from 'react'
import { Helmet } from 'react-helmet'
import NextArticles from '../nextArticles'
import Footer from '../../Other/footer'
import ProfilePic from '../../../assets/images/fiona_oflynn.jpg'

import am1 from '../../../assets/images/blog_articles/buy_your_pair/am1.jpg'
import aj4 from '../../../assets/images/blog_articles/buy_your_pair/aj4.jpg'
import nb from '../../../assets/images/blog_articles/buy_your_pair/nb.jpg'
import reebok from '../../../assets/images/blog_articles/buy_your_pair/reebok.jpg'
import yeezy from '../../../assets/images/blog_articles/buy_your_pair/yeezy.jpg'
export default function BuyYourPair () {
  return (
    <div className='newsroom-article'>
      <Helmet>
        <title>Sanctuary: Newsroom</title>
      </Helmet>
      <div className='newsroom-article-content'>
        <div className='newsroom-article-header'>
          <h1>
            How to Buy Your Perfect Pair: A Beginner&apos;s Guide
          </h1>

          <div className='newsroom-article-profile'>
            <img src={ProfilePic} alt='author' />

            <div className='newsroom-article-date'>
              <h2> Fiona O&apos;Flynn </h2>
              <p> February 10th, 2022 </p>
            </div>
          </div>
        </div>

        <div className='newsroom-article-text'>
          <p>
            Buying your first pair of sneakers is no easy undertaking. For novices and experts alike, the
            sneaker world can be a confusing place. We&apos;re here to help you navigate it with a step-by-step guide
            to your perfect pair.
          </p>

          <h4>1. Choose your brand</h4>
          <p>
            Choosing your brand is not always a clear-cut choice. There&apos;s a lot more to a logo than you might
            think—especially in the sneaker community. Here are some tried and true brands we think you&apos;ll like.
          </p>

          <p>
            <strong>Nike</strong> <br />
            Named after the Greek goddess of victory, Nike lives up to its title as the world&apos;s leading apparel brand.
            Their domination of the sneaker market is well-earned; Nike&apos;s consistent production of high-quality,
            hype-worthy shoes has solidified their spot as number one. The continued success of their classics like
            the Air Maxes and Air Force 1s serves as a testament to the staying power of the Swoosh. Simply put, it&apos;s
            hard to go wrong with a pair of Nikes.
          </p>

          <p><em>Our Nike Pick: <a href="https://sovrn.co/13cosu1">Air Max 90/1 &apos;University Red&apos; </a></em></p>
        </div>

        <div className='newsroom-article-image'>
          <img src={am1} alt='Air Max One' width='100px'/>
          <p> Image via GOAT </p>
        </div>

        <div className='newsroom-article-text'>
          <p>
            <strong>Air Jordan</strong> <br />
            From the beginning, Air Jordans have been a statement piece. After being debuted by Michael
            Jordan in 1984, the shoes were banned from the NBA because their red and black colorway violated
            uniform dress code—it&apos;s even rumoured that Jordan was fined $5,000 for every game played in the
            controversial sneakers. Nevertheless, Air Jordan built an empire from the infamous shoes, becoming
            one of the most influential brands in sneaker history.
          </p>

          <p><em>Our Air Jordan pick: <a href="https://sovrn.co/i2qhldf">Air Jordan 4 Retro OG &apos;Fire Red&apos; 2020</a></em></p>
        </div>

        <div className='newsroom-article-image'>
          <img src={aj4} alt='Air Jordan 4' width='100px'/>
          <p> Image via GOAT </p>
        </div>

        <div className='newsroom-article-text'>
          <p>
            <strong>Adidas</strong> <br />
            Next in line is the trademark three-stripe brand. Adidas has been focssed on quality and
            performance from the get-go. Recently, they&apos;ve taken the shoe game by storm with their Yeezy collab,
            production of <a href="https://sanctuarysneakers.com/newsroom-how-adidas-and-carbon-3d-are-revolutionizing-sneaker-production">
              3-D printed sneakers</a>, as well as their advent of the world&apos;s first fully recyclable sneakers.
            Complementary to their modern innovations, Adidas also offers a collection of well-loved classics.
            The now iconic Sambas, Gazelles, and Stan Smiths are considered staples to many sneakerheads.
          </p>

          <p><em>Our Adidas pick: <a href="https://sovrn.co/15c19vh">Yeezy Boost 700 &apos;Salt&apos;</a></em></p>
        </div>
        <div className='newsroom-article-image'>
          <img src={yeezy} alt='Yeezy Boost' width='100px'/>
          <p> Image via Flight Club </p>
        </div>

        <div className='newsroom-article-text'>
          <p>
            <strong>New Balance</strong> <br />
            If you value both comfort and style, New Balance might be the brand for you. A true lifestyle brand,
            New Balance was originally founded as an arch support manufacturer. Since then, they&apos;ve made a name for
            themselves in both athleticwear and street style. In recent years, New Balance has produced some highly
            acclaimed collabs with the likes of Joe Freshgoods, Aimé Leon Dore, and Bodega. We recommend checking out
            their dad-approved 99X series.
          </p>

          <p>Our New Balance pick:<a href="https://sovrn.co/18yaifw">New Balance 550 X Aimé Leon Dore &apos;Natural Green&apos;</a></p>
        </div>
        <div className='newsroom-article-image'>
          <img src={nb} alt='New Balance' width='100px'/>
          <p> Image via StockX </p>
        </div>

        <div className='newsroom-article-text'>
          <p>
            <strong>Reebok</strong> <br />
            After gaining popularity during the fitness craze of the &apos;80s, Reebok established themselves as an iconic
            everyday shoe brand. Now a subsidiary of Adidas, Reebok sits at a unique crossroads between leisure and
            performance wear. They&apos;re best known for their Classics line, which has perfected the tennis shoe while
            maintaining their signature retro look.
          </p>

          <p>Our Reebok pick: <a href="https://sovrn.co/1hp8vis">JJJJound X Reebok Club C 85 &apos;White Gum&apos;</a></p>
        </div>

        <div className='newsroom-article-image'>
          <img src={reebok} alt='Reebok' width='100px'/>
          <p> Image via Flight Club </p>
        </div>

        <div className='newsroom-article-text'>
          <h4>2. Choose your style</h4>

          <p>
            First and foremost: buy what you like, and buy what you&apos;ll wear. Although style largely
            comes down to personal preference, we recommend choosing a versatile sneaker—especially if you&apos;re
            just starting out your collection.</p>

          <p>
            Two important factors in sneaker style are the silhouette and the colorway: the silhouette
            refers to the shape and design of the shoe, and the colorway refers to the combination of
            colors on the shoe. A classic silhouette—like the Air Force 1 or Stan Smith—paired with an
            understated colorway makes for an excellent versatile shoe.
          </p>

          <h4>3. Buy your pair at the best price.</h4>

          <p>
            Sneakers can be expensive. Luckily, you don&apos;t need to break the bank to find a pair you&apos;ll love.
            At Sanctuary, we aggregate prices from all the best sneaker resale sites onto one platform.
            We&apos;ve done the heavy lifting for you; just name your shoe, and we&apos;ll show you the best deals.
          </p>

          <p>
            Now that you&apos;ve got the basics, you&apos;re all set. Be sure to check out our
            <a href="https://www.instagram.com/sanctuarysneakers/?hl=en"> Instagram</a>,
            <a href="https://www.tiktok.com/@sanctuarysneakers?"> TikTok</a> and
            <a href="https://www.facebook.com/sanctuarysneakers"> Facebook</a> pages for
            the latest drops and sneaker news!
          </p>
        </div>
      </div>

      <NextArticles />

      <Footer color={'blue'} />
    </div>
  )
}
