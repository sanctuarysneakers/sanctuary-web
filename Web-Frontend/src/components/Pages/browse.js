import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAPICall from "../Hooks/useapicall"

export default function Browse() {

	const dispatch = useDispatch()

	const browseData = useSelector(state => state.browseData)
	const itemsList = browseData.map((item) => <li key={item.sku_id}>{item.model}</li>);

	useAPICall('browse')

	return(
		<div>{itemsList}</div>
	)
}