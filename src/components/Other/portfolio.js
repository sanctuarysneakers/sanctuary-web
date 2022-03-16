import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Portfolio() {

	const user = useSelector(state => state.user)

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

	console.log(data)

	return (
		<div>{data.map((d) => {
			return (
				<div>
					<h4>Item SKU: {d.sku}</h4>
					<p>{d.add_date}</p>
					<p>Size: {d.size}</p>
					<p>Price: ${d.price}</p>
					<br/>
				</div>
			)
		})}</div>
	)
}