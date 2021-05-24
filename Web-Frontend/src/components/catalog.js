import React from "react"
import { useSelector } from 'react-redux'
import useAPICall from "./Hooks/useapicall"
import ItemTile from './itemtile'

export default function Catalog({search_query}) {

    const browseData = useSelector(state => state.browseData)
	const itemTiles = browseData.map((item) => <ItemTile key={item.id} data={item}></ItemTile>)

    useAPICall('browse', {query: search_query})

    return (
        <div className='catalog'>
            {browseData.length !== 0 && itemTiles}
        </div>
    )
}
