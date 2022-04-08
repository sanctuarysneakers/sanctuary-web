import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePortfolioData } from '../../redux/actions'
import { getPortfolio } from '../../api/api' 

import PortfolioCard from './portfolioCard'
import { Helmet } from 'react-helmet';


export default function Portfolio() {

    const dispatch = useDispatch()

	const portfolio = useSelector(state => state.portfolio)
	const user = useSelector(state => state.user)

	const location = useSelector(state => state.location)
    const currency = useSelector(state => state.currency)

	useEffect(() => {
		async function getPortfolioData() {
			let data = await getPortfolio(user.uid, location, currency)
			dispatch(updatePortfolioData(data))
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
					<PortfolioCard key={item.record_id} data={item} />
				))}
			</div>

		</div>
	)
}