import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPortfolio, removeFromPortfolio } from '../../api/api' 

import PortfolioCard from './portfolioCard'
import { Helmet } from 'react-helmet';


export default function Portfolio() {

	const portfolioData = useSelector(state => state.portfolio)
	const [portfolio, setPortfolio] = useState(portfolioData) 
	const user = useSelector(state => state.user)

	const location = useSelector(state => state.location)
    const currency = useSelector(state => state.currency)

	const onRemove = (data) => {
		try {
			removeFromPortfolio(data) 
		} catch(error) {
			alert(error)
		}
		
		const newPortfolio = portfolio.filter((item) => item.record_id !== data.record_id);
    	setPortfolio(newPortfolio);	
    }

	useEffect(() => {
		async function getPortfolioData() {
			let data = await getPortfolio(user.uid, location, currency)
			setPortfolio(data)
		}
		
		getPortfolioData() 
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