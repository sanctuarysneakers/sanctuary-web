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
        'USD':'$', 'CAD':'CA$', 'EUR':'€', 'GBP':'£', 'JPY':'¥', 'AUD':'A$'
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
    const websiteLogo = websiteLogoMap[data.source]

    const websiteTextMap = {
        'stockx' : 'StockX',
        'goat' : 'GOAT',
        'grailed' : 'Grailed',
        'flightclub' : 'Flight Club',
        'depop' : 'Depop',
        'klekt' : 'KLEKT',
        'ebay' : 'eBay'
    }
    const websiteText = websiteTextMap[data.source]

    var url = data.url

    if (websiteText === 'eBay') {
        if (url.slice(-1) === '=') {
            url = url.concat('&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338823385&customid=&toolid=10001&mkevt=1')
        } else {
            url = url.concat('?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338823385&customid=&toolid=10001&mkevt=1')
        }
    }

    return (
        <div className={(index === length - 1) ? 'item-price last' : 'item-price'}>

            <div className='item-price-source'>
                <div className={`item-source-logo ${data.source}`}>
                    <img src={websiteLogo} alt='website logo' />
                </div>

                <div className='item-source-text'>
                    <h2> {websiteText} </h2>

                    <p> New </p>
                </div>
            </div>

            <a target='_blank' href={`https://${url}`} rel="noopener noreferrer">
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
