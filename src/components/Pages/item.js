import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'
import SizeFilter from '../sizeFilter'
import useAPICall from '../Hooks/useApiCall'
import ItemPrice from '../itemPrice'
import ItemListing from '../itemListing'
import ItemLoader from '../itemLoader'
import Footer from '../footer'
import StockXGrey from '../../assets/images/stockx.png'
import GOATGrey from '../../assets/images/goat-grey.svg'
import GrailedGrey from '../../assets/images/grailed-grey.svg'
import flightClubGrey from '../../assets/images/flightClub-grey.svg'
import DepopGrey from '../../assets/images/depop-grey.svg'
import KLEKTGrey from '../../assets/images/klekt-grey.svg'
import eBayGrey from '../../assets/images/ebay-grey.svg'

export default function Item() {

    const currency = useSelector(state => state.currency)
    const currencySymbolMap = {
        'USD': '$',
        'CAD': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥'
    }
    const currencySymbol = currencySymbolMap[currency]

    const websiteLogoMap = {
        'stockx': StockXGrey,
        'goat': GOATGrey,
        'grailed': GrailedGrey,
        'flightclub': flightClubGrey,
        'depop': DepopGrey,
        'klekt': KLEKTGrey,
        'ebay': eBayGrey
    }

    const isDesktop = useMediaQuery({ query: '(min-width: 870px)' })
    const { sku } = useParams()
    const size = useSelector(state => state.size)
    useAPICall('getitem', { sku: sku, size: size })

    const itemInfo = useSelector(state => state.itemInfo)
    const itemPrices = useSelector(state => state.itemPrices)
    const itemListings = useSelector(state => state.itemListings)

    const [pricesLoader, setPricesLoader] = useState(true)
    const [listingsLoader, setListingsLoader] = useState(true)
    const [priceComponents, setPriceComponents] = useState(false)
    const [listingComponents, setListingComponents] = useState(false)
    const [noPrices, setNoPrices] = useState(false)
    const [noListings, setNoListings] = useState(false)

    useEffect(() => {
        if (!itemPrices) {
            setPricesLoader(false)
            setNoPrices(true)
        }
        else if (itemPrices.length) {
            setPricesLoader(false)
            setPriceComponents(itemPrices.map((item, index) =>
                <ItemPrice key={item.source} data={item} index={index} length={itemPrices.length} />
            ))
        }

        if (!itemListings) {
            setListingsLoader(false)
            setNoListings(true)
        }
        else if (itemListings.length) {
            setListingsLoader(false)
            setListingComponents(itemListings.map((item, index) =>
                <ItemListing key={item.id} data={item} index={index} length={itemListings.length} />
            ))
        }
    }, [itemPrices, itemListings])

    return (
        <div className='item'>
            <div className='item-sneaker'>
                <div className='item-sneaker-content'>
                    <div className='item-sneaker-image'>
                        <img src={itemInfo.image} alt='sneaker' />
                    </div>

                    <div className='item-sneaker-info'>
                        <div className='item-sneaker-text'>

                            {!pricesLoader && <div className={`item-sneaker-site ${itemPrices[0].source}`}>
                                <img src={websiteLogoMap[itemPrices[0].source]}
                                    alt='website logo'
                                />
                            </div>}

                            <div className='item-sneaker-model'>
                                <h1> {itemInfo.modelName} </h1>
                            </div>

                            {pricesLoader && <ItemLoader version={'info'} />}

                            {!pricesLoader && <div className='item-sneaker-price-details'>

                                <a target='_blank' href={`https://${itemPrices[0].url}`} rel="noopener noreferrer">
                                    <div className='item-sneaker-price'>
                                        <h2> Buy New {currencySymbol}{itemPrices[0].price} </h2>
                                    </div>
                                </a>

                                <SizeFilter />
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            <div className='item-price-listings'>
                <div className='item-price-listings-content'>
                    <div className='item-lowest-prices'>
                        <h6> Lowest Prices </h6>

                        <div className='item-lowest-prices-rows'>
                            {pricesLoader && <ItemLoader version={'prices'} />}
                            {noPrices && console.log('no prices')}

                            {!pricesLoader && <div className='item-lowest-prices-rows-content'>
                                {priceComponents}
                            </div>}
                        </div>
                    </div>

                    <div className='item-more-listings'>
                        <h6> More Listings </h6>

                        <div className='item-more-listings-rows'>
                            {listingsLoader && <ItemLoader version={'listings'} />}

                            {noListings && <div className='item-no-results'>
                                <p> No results found </p>
                            </div>}

                            {!listingsLoader && <div className='item-more-listings-rows-content'>
                                {listingComponents}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            <Footer colour={'blue'} />
        </div>
    )
}