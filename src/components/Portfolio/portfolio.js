import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { updatePortfolioData } from '../../redux/actions'
import { getPortfolio, removeFromPortfolio } from '../../api/portfolio'
import PortfolioCard from './portfolioCard'

export default function Portfolio() {

	const dispatch = useDispatch()

	const portfolio = useSelector(state => state.portfolio)
	const user = useSelector(state => state.user)
    const currency = useSelector(state => state.currency)

	const onRemove = (data) => {
		removeFromPortfolio(data) 
		const newPortfolio = portfolio.filter((item) => item.record_id !== data.record_id)
    	updatePortfolioData(newPortfolio)
    }

	useEffect(async () => {
		let data = await getPortfolio(user.uid, currency)
		console.log(data)
		updatePortfolioData(data)
    }, [])

	return (
		<div className='portfolio'>
			<Helmet>
                <title>Sanctuary: Portfolio</title>
            </Helmet>

			<div className='portfolio-title'>
				<div className='portfolio-title-content'>
					<div className='portfolio-title-content-text'>
                        <h2> Portfolio </h2>
                    </div>
				</div>
			</div>

			<div className='portfolio-catalog'>
				{portfolio && portfolio.length !== 0 && portfolio.map((item) => (
					<PortfolioCard key={item.record_id} data={item} onRemove={onRemove} />
				))}
			</div>

		</div>
	)
}