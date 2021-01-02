import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import useAPICall from "./Hooks/useapicall"
import Slider from "./slider"

import stockxLogo from "../assets/images/logos/stockx.png"
import goatLogo from "../assets/images/logos/goat.png"
import grailedLogo from "../assets/images/logos/grailed.png"
import flightclubLogo from "../assets/images/logos/flightclub.png"
import { newSearchHappened } from "../redux/actions"


export default function Catalog() {

    const isInitialMount = useRef(true);

    const dispatch = useDispatch()

    const stockxData = useSelector(state => state.stockxData)
    const goatData = useSelector(state => state.goatData)
    const grailedData = useSelector(state => state.grailedData)
    const flightClubData = useSelector(state => state.flightClubData)

    const filter = useSelector(state => state.filter)
        
    const setTypingTimer = sleep_time => {
        const timer = setTimeout(() => {
            dispatch(newSearchHappened())
        }, sleep_time)
        return () => clearTimeout(timer)
    }

    // Wait until user doesn't update search for half a second to update catalog
    // The effects do not happen on the first mount
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            return setTypingTimer(500)
        }
    }, [filter])

    useAPICall('catalog')

    const noResults = site => {
        return (
            <div className='no-results'>
                <h1>Sorry, we couldn't find any results on {site}.</h1>
            </div>
        )
    }

    return (
        <div className='catalog'>
            {/*
            <img
                className='stockxLogo'
                src={stockxLogo}
                alt={"StockX"}
            />
            {stockxData.length !== 0 && <Slider data={stockxData} />}
            {stockxData.length === 0 && noResults("StockX")} */}

            <img
                className='goatLogo'
                src={goatLogo}
                alt={"GOAT"}
            />
            {goatData.length !== 0 && <Slider data={goatData} />}
            {goatData.length === 0 && noResults("GOAT")}

            <img
                className='grailedLogo'
                src={grailedLogo}
                alt={"Grailed"}
            />
            {grailedData.length !== 0 && <Slider data={grailedData} />}
            {grailedData.length === 0 && noResults("Grailed")}

            <img
                className='flightclubLogo'
                src={flightclubLogo}
                alt={"Flight Club"}
            />
            {flightClubData.length !== 0 && <Slider data={flightClubData} />}
            {flightClubData.length === 0 && noResults("Flight Club")}
        </div>
    )
}
