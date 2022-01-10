import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as RightArrow} from '../assets/images/RightArrow.svg'
import StockXIcon from '../assets/images/stockxIcon.png'
import GOAT from '../assets/images/goat.svg'
import GrailedIcon from '../assets/images/grailedIcon.jpg'
import FlightClub from '../assets/images/flightClub.svg'
import DepopIcon from '../assets/images/depopIcon.svg'
import KLEKT from '../assets/images/klekt.svg'
import eBay from '../assets/images/ebay.svg'

export default function ItemPrice({ data, index, length }) {

    const currency = useSelector(state => state.currency)
    const currencySymbolMap = {
        'USD':'$', 'CAD':'C$', 'EUR':'€', 'GBP':'£', 'JPY':'¥', 'AUD':'A$'
    }

    const websiteLogoMap = {
        'stockx' : StockXIcon,
        'goat' : GOAT,
        'grailed' : GrailedIcon,
        'flightclub' : FlightClub,
        'depop' : DepopIcon,
        'klekt' : KLEKT,
        'ebay' : eBay
    }

    const websiteTextMap = {
        'stockx' : 'StockX',
        'goat' : 'GOAT',
        'grailed' : 'Grailed',
        'flightclub' : 'Flight Club',
        'depop' : 'Depop',
        'klekt' : 'KLEKT',
        'ebay' : 'eBay'
    }

    const clickHandler = (url) => {
        window.analytics.track(`item_lowest_prices_click_${data.source}`, {url: data.url, price: data.price});
        window.open(url, '_blank')
    }

    return (
        <div className={(index === length - 1) ? 'item-price last' : 'item-price'}>

            <a onClick={() => clickHandler(data.url)}>
                <div className='item-price-source'>
                    <div className={`item-source-logo ${data.source}`}>
                        <img src={websiteLogoMap[data.source]} alt='website logo' />
                    </div>

                    <div className='item-source-text'>
                        <h2> {websiteTextMap[data.source]} </h2>
                        <p> New </p>
                    </div>
                </div>

                <div className='item-price-link'>
                    <div className='item-amount'>
                        <h2> {currencySymbolMap[currency]}{data.price} </h2>
                    </div>
                    <RightArrow />
                </div>
            </a>

        </div>
    )
}
