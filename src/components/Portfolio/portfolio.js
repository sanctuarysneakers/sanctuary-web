import React from 'react'
import { useSelector } from 'react-redux'
import useAPICall from '../../hooks/useApiCall'
import PortfolioCard from './portfolioCard'
import { Helmet } from 'react-helmet';


export default function Portfolio() {

	const portfolioData = useSelector(state => state.portfolio)

	useAPICall('getportfolio', {})

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
				{portfolioData && portfolioData.length !== 0 && portfolioData.map((item) => (
					<PortfolioCard key={portfolioData.record_id} data={item} />
				))}
			</div>

		</div>
	)
}