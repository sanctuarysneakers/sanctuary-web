import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPortfolio } from '../../api/api' 

import PortfolioCard from './portfolioCard'
import { Helmet } from 'react-helmet';


export default function Portfolio() {

	const portfolioData = useSelector(state => state.portfolio)
	const [portfolio, setPortfolio] = useState(portfolioData) 
	const user = useSelector(state => state.user)

	const location = useSelector(state => state.location)
    const currency = useSelector(state => state.currency)


	const onRemove = (data) => {
		fetch("https://hdwj2rvqkb.us-west-2.awsapprunner.com/accounts/portfolio/delete", {
				method: "DELETE",
				headers: { "Content-type": "application/json" },
				body: data
			})

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