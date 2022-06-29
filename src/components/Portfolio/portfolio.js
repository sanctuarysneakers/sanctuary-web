import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { updatePortfolioData } from '../../redux/actions'
import { getPortfolio, removeFromPortfolio } from '../../api/portfolio'
import PortfolioCard from './portfolioCard'
import Footer from '../Other/footer'

export default function Portfolio() {

	const dispatch = useDispatch()

	const [total, setTotal] = useState(0)
	const [priceChange, setPriceChange] = useState(0)
	const [percentChange, setPercentChange] = useState(0)
	const [colour, setColour] = useState('black')

	const portfolio = useSelector(state => state.portfolio)
	const user = useSelector(state => state.user)
	const currency = useSelector(state => state.currency)
	const location = useSelector(state => state.location)

	const removeItemHandler = (recordID) => {
		removeFromPortfolio(recordID)  // removes from database
		const newPortfolio = portfolio.filter(item => 
			item.record_id !== recordID)
    	dispatch(updatePortfolioData(newPortfolio))
    }

	const handleDashboard = () => {
		let price = 0
		let priceChange = 0
		let initialPrice = 0

		for (let i = 0; i < portfolio.length; i++) {
			price += portfolio[i].currentPrice
			initialPrice += portfolio[i].price
			priceChange += (portfolio[i].currentPrice - portfolio[i].price)
		}

		setTotal(price)
		setPriceChange(priceChange)
		setPercentChange((priceChange / initialPrice * 100).toFixed(2))

		if (priceChange < 0) {
			setColour('#EC3E26')
		} else {
			setColour('#34A853')
		}
	}

	useEffect(() => {
		async function fetchPortfolio() {
			let data = await getPortfolio(user.uid, currency, location)
			dispatch(updatePortfolioData(data))
		}
		fetchPortfolio()
	}, [currency])

	useEffect(() => {
		handleDashboard()
		console.log(portfolio)
	}, [portfolio])

	return (
		<div className='portfolio'>
			<Helmet>
				<title>Sanctuary: Portfolio</title>
			</Helmet>

			<div className='portfolio-dashboard'>
				<div className='portfolio-analytics'>
					<p>
						Total Balance
					</p>

					<h1>
						${total}.00
					</h1>

					<h4 style={{ color: colour }}>
						${Math.abs(priceChange)} ({Math.abs(percentChange)}%)
					</h4>

					<div className='portfolio-buttons'>
						<button className='portfolio-add'>
							add
						</button>

						<button className='portfolio-edit'>
							Edit
						</button>
					</div>
				</div>
			</div>

			<div className='portfolio-assets'>
				<h3> My Portfolio </h3>

				<div className='portfolio-catalog'>
					{portfolio && portfolio.length !== 0 && portfolio.map((item) => (
						<PortfolioCard key={item.record_id} item={item} remove={removeItemHandler} />
					))}
				</div>
			</div>

			<Footer colour={'blue'} />
		</div>
	)
}








// import React, { useEffect } from 'react'
// import { Helmet } from 'react-helmet'
// import { useDispatch, useSelector } from 'react-redux'
// import { updatePortfolioData } from '../../redux/actions'
// import { getPortfolio, removeFromPortfolio } from '../../api/portfolio'
// import PortfolioCard from './portfolioCard'

// export default function Portfolio() {

// 	const dispatch = useDispatch()

// 	const portfolio = useSelector(state => state.portfolio)
// 	const user = useSelector(state => state.user)
//     const currency = useSelector(state => state.currency)
// 	const location = useSelector(state => state.location)

// 	const removeItemHandler = (recordID) => {
// 		removeFromPortfolio(recordID)  // removes from database
// 		const newPortfolio = portfolio.filter(item => 
// 			item.record_id !== recordID)
//     	dispatch(updatePortfolioData(newPortfolio))
//     }

// 	useEffect(() => {
// 		async function fetchPortfolio() {
// 			let data = await getPortfolio(user.uid, currency, location)
// 			dispatch(updatePortfolioData(data))
// 		}
// 		fetchPortfolio()
//     }, [currency])

// 	return (
// 		<div className='portfolio'>
// 			<Helmet>
//                 <title>Sanctuary: Portfolio</title>
//             </Helmet>

// 			<div className='portfolio-dashboard'>

// 			</div>

// 			<div className='portfolio-title'>
// 				<div className='portfolio-title-content'>
// 					<div className='portfolio-title-content-text'>
//                         <h2> Portfolio </h2>
//                     </div>
// 				</div>
// 			</div>

// 			<div className='portfolio-catalog'>
// 				{portfolio && portfolio.length !== 0 && portfolio.map((item) => (
// 					<PortfolioCard key={item.record_id} item={item} remove={removeItemHandler} />
// 				))}
// 			</div>
// 		</div>
// 	)
// }