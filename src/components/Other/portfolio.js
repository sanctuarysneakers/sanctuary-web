import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useAPICall from '../Hooks/useApiCall'
import PortfolioCard from '../portfolioCard'
import { Helmet } from 'react-helmet';


export default function Portfolio() {

	const user = useSelector(state => state.user)
	const portfolioData = useSelector(state => state.portfolioData)

	let [data, setData] = useState([])

	async function getData() {
		const url = `https://hdwj2rvqkb.us-west-2.awsapprunner.com/accounts/portfolio/get?user_id=${user.uid}`
		const response = await fetch(url)
		const data = await response.json()
		setData(data)
	}

	useEffect(() => {
		getData()
	}, [])
	console.log("portfolio data: ", portfolioData)
	useAPICall('getportfolio', { uid: user.uid, data: data })
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
				{portfolioData.length !== 0 && portfolioData.map((item) => (
					<PortfolioCard key={portfolioData.record_id} data={item} />
				))}
			</div>

		</div>
	)
}