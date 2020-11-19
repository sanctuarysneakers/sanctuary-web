import React from "react"
import { useSelector } from 'react-redux'
import useAPICall from "./Hooks/useapicall"
import Slider from "./slider"

import stockxLogo from "../assets/images/logos/stockx.png"
import goatLogo from "../assets/images/logos/goat.png"
import grailedLogo from "../assets/images/logos/grailed.png"
import flightclubLogo from "../assets/images/logos/flightclub.png"


export default function Catalog() {

    const stockxData = useSelector(state => state.stockxData)
    const goatData = useSelector(state => state.goatData)
    const grailedData = useSelector(state => state.grailedData)
    const flightClubData = useSelector(state => state.flightClubData)

    const stockxSwiperRef = useSelector(state => state.refs.stockxSwiperRef)
    const goatSwiperRef = useSelector(state => state.refs.goatSwiperRef)
    const grailedSwiperRef = useSelector(state => state.refs.grailedSwiperRef)
    const flightClubSwiperRef = useSelector(state => state.refs.flightClubSwiperRef)

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
            <img 
                className='stockxLogo'
                src={stockxLogo}
                alt={"StockX"}
            />
            {stockxData.length !== 0 && <Slider data={stockxData} swiperRef={stockxSwiperRef}/>}
            {stockxData.length === 0 && noResults("StockX")}

            <img 
                className='goatLogo'
                src={goatLogo}
                alt={"GOAT"}
            />
            {goatData.length !== 0 && <Slider data={goatData} swiperRef={goatSwiperRef}/>}
            {goatData.length === 0 && noResults("GOAT")}

            <img 
                className='grailedLogo'
                src={grailedLogo}
                alt={"Grailed"}
            />
            {grailedData.length !== 0 && <Slider data={grailedData} swiperRef={grailedSwiperRef}/>}
            {grailedData.length === 0 && noResults("Grailed")}

            <img 
                className='flightclubLogo'
                src={flightclubLogo}
                alt={"Flight Club"}
            />
            {flightClubData.length !== 0 && <Slider data={flightClubData} swiperRef={flightClubSwiperRef}/>}
            {flightClubData.length === 0 && noResults("Flight Club")}
        </div>
    )
}
