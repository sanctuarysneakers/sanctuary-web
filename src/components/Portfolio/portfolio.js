import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePortfolioData, setPortfolioLoading } from '../../redux/actions'
import { getPortfolio } from '../../api/portfolioData'
import PortfolioCard from './portfolioCard'
import Footer from '../Other/footer'
import GraphDown from '../../assets/images/downwards-dark-desktop.svg'
import GraphUp from '../../assets/images/upwards-dark-desktop.svg'
import GraphStraight from '../../assets/images/straight-dark-desktop.svg'
import LoadingAssets from './loadingAssets'
import LoadingPortfolio from './loadingPortfolio'
import Splash from '../../assets/images/aboutDrawing2.png'

export default function Portfolio () {
  const dispatch = useDispatch()

  const [totalBalance, setTotalBalance] = useState(0)
  const [priceChange, setPriceChange] = useState(0)
  const [percentChange, setPercentChange] = useState(0)
  const [color, setColor] = useState('black')
  const [graph, setGraph] = useState(GraphStraight)

  const user = useSelector(state => state.user)
  const currency = useSelector(state => state.currency)
  const location = useSelector(state => state.location)
  const portfolio = useSelector(state => state.portfolio.portfolioData)
  const loadingPortfolio = useSelector(state => state.portfolio.loadingPortfolio)

  useEffect(() => {
    if (user) {
      async function fetchPortfolio () {
        const data = await getPortfolio(user.localId, currency, location)
        dispatch(updatePortfolioData(data))
        dispatch(setPortfolioLoading(false))
      }
      fetchPortfolio()
    }
  }, [currency])

  useEffect(() => {
    if (user) {
      let price = 0
      let priceChange = 0
      let initialPrice = 0

      for (let i = 0; i < portfolio.length; i++) {
        price += portfolio[i].currentPrice
        initialPrice += portfolio[i].price
        priceChange += (portfolio[i].currentPrice - portfolio[i].price)
      }

      setTotalBalance(price)
      setPriceChange(priceChange)
      const newPercentChange = (priceChange / initialPrice * 100).toFixed(2)
      if (!isNaN(newPercentChange)) {
        setPercentChange((priceChange / initialPrice * 100).toFixed(2))
      } else {
        setPercentChange(0)
      }

      priceChange === 0 ? setColor('#8A8A8D') : (priceChange > 0 ? setColor('#34A853') : setColor('#EC3E26'))
      priceChange === 0 ? setGraph(GraphStraight) : (priceChange > 0 ? setGraph(GraphUp) : setGraph(GraphDown))
    }
  }, [portfolio])

  return (
    <div className='portfolio'>
      <Helmet>
        <title>Sanctuary: Portfolio</title>
      </Helmet>

      {user && <div className='portfolio-dashboard'>
        <div className='portfolio-analytics'>
          <div className='portfolio-stats'>
            <p> Total Balance </p>
            {!loadingPortfolio && <h1> ${totalBalance}.00 </h1>}
            {!loadingPortfolio && <h4 style={{ color }}>
              ${(priceChange)}.00 ({percentChange}%)
            </h4>}
            {loadingPortfolio && <LoadingPortfolio />}
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
            {!loadingPortfolio && portfolio && portfolio.length !== 0 && portfolio.map((item) => (
              <PortfolioCard key={item.record_id} item={item} />
            ))}

            {loadingPortfolio && <div>
              <LoadingAssets />
              <LoadingAssets />
              <LoadingAssets />
            </div>}
          </div>
        </div>
      </div>}

      {!user && <div className='portfolio-welcome'>
        <div className='portfolio-welcome-content'>
          <h1>
            Build your sneaker portfolio.
          </h1>

          <img src={Splash} alt='Splash icon'/>

          <Link onClick={() => { document.location.href = '/sign-in-email' }} to='/sign-in-email'>
            Get Started Today
          </Link>
        </div>
      </div>}

      <Footer color={'blue'} />
    </div>
  )
}