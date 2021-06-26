import React from 'react'
import { useSelector } from 'react-redux'
import useAPICall from './Hooks/useapicall'
import ItemCard from './itemCard'

export default function Catalog({ search_query }) {

    const browseData = useSelector(state => state.browseData)
	const itemCards = browseData.map((item) => <ItemCard key={item.id} data={item}></ItemCard>)

    useAPICall('browse', {query: search_query})

    return (
        <div className='catalog'>
            {browseData.length !== 0 && itemCards}
        </div>
    )
}
