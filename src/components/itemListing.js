import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as RightArrow} from '../assets/images/RightArrow.svg'

export default function ItemListing({ data, index, length }) {

    const currency = useSelector(state => state.currency)
    const currencySymbolMap = {
        'USD':'$', 'CAD':'CA$', 'EUR':'€', 'GBP':'£', 'JPY':'¥', 'AUD':'A$'
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
    const websiteText = websiteTextMap[data.source]
    var url = data.url

    if (websiteText === 'eBay') {
        if (url.slice(-1) === '=') {
            url = url.concat('&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338823385&customid=&toolid=10001&mkevt=1')
        } else {
            url = url.concat('?mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338823385&customid=&toolid=10001&mkevt=1')
        }
    }
    console.log(url)
    return (
        <div className={(index === length - 1) ? 'item-listing last' : 'item-listing'}>
            <div className='item-listing-source'>

                <div className='item-listing-image'>
                    <img src={data.image} alt='the sneaker' />
                </div>
                
                <div className='item-listing-text'>
                    <h2> {websiteText} </h2>
                    <p> Used </p>
                </div>
                
            </div>

            <a target='_blank' href={`https://${url}`}  rel="noopener noreferrer">
                <div className='item-listing-link'>
                    <div className='item-listing-amount'>
                        <h2>
                            {currencySymbolMap[currency]}{data.price}
                        </h2>
                    </div>

                    <RightArrow />
                </div>
            </a>
        </div>
    )
}