import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { brandColors, currencySymbolMap } from '../../assets/constants'
import PortfolioCard from './portfolioCard'
import Footer from '../Other/footer'
import GraphDown from '../../assets/images/downwards-dark-desktop.svg'
import GraphUp from '../../assets/images/upwards-dark-desktop.svg'
import GraphStraight from '../../assets/images/straight-dark-desktop.svg'
import LoadingAssets from './loadingAssets'
import LoadingPortfolio from './loadingPortfolio'
import Splash from '../../assets/images/aboutDrawing2.png'
import useAPICall from '../../hooks/useApiCall'

export default function Portfolio () {
  const user = useSelector(state => state.user)
  const currency = useSelector(state => state.currency)
  const loadingPortfolio = useSelector(state => state.portfolio.loadingPortfolio)
  const portfolio = useSelector(state => state.portfolio.data)
  const stats = useSelector(state => state.portfolio.stats)

  useAPICall('portfolio', null)

  const symbol = currencySymbolMap[currency]
  const color = stats.priceChange === 0 ? 'textGrey' : (stats.priceChange > 0 ? 'upwards' : 'downwards')
  const graph = stats.priceChange === 0 ? GraphStraight : (stats.priceChange > 0 ? GraphUp : GraphDown)
  const percentChange = isNaN(stats.percentChange) ? 0 : stats.percentChange

  const portfolioComponents = portfolio.map((item, index) =>
    <PortfolioCard key={item.record_id} item={item} index={index} />
  )

  return (
    <div className='portfolio'>
      <Helmet>
        <title>Sanctuary: Portfolio</title>
      </Helmet>

      {user && <div className='portfolio-dashboard'>
        <div className='portfolio-analytics'>
          <div className='portfolio-stats'>
            <p> Total Balance </p>

            {loadingPortfolio && <LoadingPortfolio />}

            {!loadingPortfolio && <h1>
              {symbol}{stats.total.toLocaleString('en')}.00
            </h1>}

            {!loadingPortfolio && <h4 style={{ color: brandColors[color] }}>
              {symbol}{stats.priceChange.toLocaleString('en')}.00 ({percentChange}%)
            </h4>}
          </div>

          {!loadingPortfolio && <img src={graph} alt='Portfolio trendline'/>}

          <div className='portfolio-buttons'>
            <Link onClick={() => { document.location.href = '/browse' }} to='/browse'>
              <div className='portfolio-add'>
                Add Sneakers
              </div>
            </Link>
          </div>
        </div>
      </div>}

      {user && <div className='portfolio-assets'>
        <div className='portfolio-assets-content'>
          <h3> My Portfolio </h3>

          <div className='portfolio-catalog'>
            {loadingPortfolio && <div>
              <LoadingAssets />
              <LoadingAssets />
              <LoadingAssets />
            </div>}

            {!loadingPortfolio && portfolioComponents}
          </div>
        </div>
      </div>}

      {!user && <div className='portfolio-welcome'>
        <div className='portfolio-welcome-content'>
          <h1>
            Build your sneaker portfolio.
          </h1>

          <img src={Splash} alt='Splash icon'/>

          <Link onClick={() => { document.location.href = '/sign-in' }} to='/sign-in'>
            Get Started Today
          </Link>
        </div>
      </div>}

      <Footer color={'blue'} />
    </div>
  )
}
