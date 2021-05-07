import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { newSearchHappened } from "../redux/actions"
import useAPICall from "./Hooks/useapicall"
import ItemTile from './itemtile'

export default function Catalog() {

    const isInitialMount = useRef(true)

    const dispatch = useDispatch()

    const filter = useSelector(state => state.filter)
    const browseData = useSelector(state => state.browseData)
    
	const itemTiles = browseData.map((item) => <ItemTile data={item}></ItemTile>)
        
    const setTypingTimer = sleep_time => {
        const timer = setTimeout(() => {
            dispatch(newSearchHappened())
        }, sleep_time)
        return () => clearTimeout(timer)
    }

    // Wait half a second after a user enters a search/filter
    useEffect(() => {
        if (isInitialMount.current)
            isInitialMount.current = false
        else return setTypingTimer(500)
    }, [filter])

    useAPICall('browse')

    return (
        <div className='catalog'>
            {browseData.length !== 0 && itemTiles}
        </div>
    )
}
