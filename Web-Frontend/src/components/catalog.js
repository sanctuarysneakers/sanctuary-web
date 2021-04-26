import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import useAPICall from "./Hooks/useapicall"
import { newSearchHappened } from "../redux/actions"

export default function Catalog() {

    const isInitialMount = useRef(true);

    const dispatch = useDispatch()

    const browseData = useSelector(state => state.browseData)
	const itemsList = browseData.map((item) => <li key={item.sku_id}>{item.model}</li>);

    const filter = useSelector(state => state.filter)
        
    const setTypingTimer = sleep_time => {
        const timer = setTimeout(() => {
            dispatch(newSearchHappened())
        }, sleep_time)
        return () => clearTimeout(timer)
    }

    // Wait half a second for the user to finish typing
    useEffect(() => {
        if (isInitialMount.current)
            isInitialMount.current = false;
        else
            return setTypingTimer(500)
    }, [filter])

    useAPICall('browse')

    const noResults = () => {
        return (
            <div className='no-results'><h1>...</h1></div>
        )
    }

    return (
        <div className='catalog'>
            {browseData.length !== 0 && itemsList }
            {browseData.length === 0 && noResults()}
        </div>
    )
}
