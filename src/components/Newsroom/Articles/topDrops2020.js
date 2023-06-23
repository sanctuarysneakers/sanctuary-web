import React from 'react'
import { Helmet } from 'react-helmet'
import NextArticles from '../nextArticles'
import Footer from '../../Other/footer'
import ProfilePic from '../../../assets/images/ColeVanHinte.jpg'
import HeaderPic from '../../../assets/images/top-sneakers.jpg'
import pictureOne from '../../../assets/images/drop2020-1.jpg'
import pictureTwo from '../../../assets/images/drop2020-2.webp'
import pictureThree from '../../../assets/images/drop2020-3.webp'

export default function TopDrops2020 () {
  return (
    <div className='newsroom-article'>
      <Helmet>
        <title>Sanctuary: Newsroom</title>
      </Helmet>
      <div className='newsroom-article-content'>
        <div className='newsroom-article-header'>
          <h1>
            Our top drops of 2020
          </h1>

          <div className='newsroom-article-profile'>
            <img src={ProfilePic} alt='author' />

            <div className='newsroom-article-date'>
              <h2> Cole Van Hinte </h2>
              <p> March 23, 2021 </p>
            </div>
          </div>
        </div>

        <div className='newsroom-article-image'>
          <img src={HeaderPic} alt='header' />
        </div>

        <div className='newsroom-article-text'>
          <p> From major global events to the rise of a worldwide pandemic, it is safe to say that 2020 will not be
            forgotten anytime soon. Although it was a very busy year, 2020 gave the sneaker community many exciting
            releases, ranging from newly engineered designs to highly anticipated collaborations. As a year
            to remember, here are some of Sanctuary’s favourite sneaker drops of 2020:
          </p>

          <h4>Ben &amp; Jerry’s x Nike SB Dunk Low ‘Chunky Dunky’</h4>
          <p>
            Although 2020 saw the release of many anticipated Dunk Low collaborations,
            Ben &amp; Jerry’s ‘Chunky Dunky’ has to take the crown. Releasing in May of 2020, the ‘Chunky Dunky’
            took a unique twist on the sneaker world’s pop culture aesthetic. The colorful mashup presents an
            array of outfit-matching opportunities, mashing a universally-known ice cream brand with one of Nike’s
            most iconic silhouettes. Although some may say it’s bold, we think it’s brilliant.
          </p>
        </div>

        <div className='newsroom-article-image'>
          <img src={pictureOne} alt='article content' />
          <p> Image via Nike </p>
        </div>

        <div className='newsroom-article-text'>
          <h4>Off-White x Air Jordan 4 &apos;Sail&apos;</h4>
          <p>
            Perhaps unsurprising to some, Virgil Abloh delivered one of the most anticipated drops of 2020:
            the Off-White X Air Jordan 4. Releasing exclusively in Women’s sizing, the simplistic yet sharp design
            of the ‘Sail’ colorway caused a worldwide uproar in the sneaker community, and upon its July 25th release
            day, it became clear that this model lived up to the hype. Reselling for thousands of dollars, I think
            everyone can agree that the Off-White Jordan 4 will be remembered as one of the best drops of 2020.
          </p>
        </div>

        <div className='newsroom-article-image'>
          <img src={pictureTwo} alt='article content' />
          <p> Image via Highsnobiety </p>
        </div>

        <div className='newsroom-article-text'>
          <h4>Joe Freshgoods x New Balance 992</h4>
          <p>
            Dropping amidst the NBA’s All-Star weekend, Joe Freshgoods’ take on the New Balance 992 brought an
            energetic perspective to a classic silhouette. This coveted collaboration started a new era for the
            New Balance 992, paving way for many more releases in various colorways. The sneaker’s red and pink
            designs were perfect for its Valentine’s day release, ensuring that in years to come, New Balance will
            not be underestimated.
          </p>
        </div>

        <div className='newsroom-article-image'>
          <img src={pictureThree} alt='article content' />
          <p> Image via Stadium Goods </p>
        </div>
      </div>

      <NextArticles />

      <Footer color={'blue'} />
    </div>
  )
}
