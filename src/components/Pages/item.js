import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'
import SizeFilter from '../sizeFilter'
import useAPICall from '../Hooks/useapicall'
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
        'USD' : '$',
        'CAD' : '$',
        'EUR' : '€',
        'GBP' : '£',
        'JPY' : '¥'
    }
    const currencySymbol = currencySymbolMap[currency]

    const websiteLogoMap = {
        'stockx' : StockXGrey,
        'goat' : GOATGrey,
        'grailed' : GrailedGrey,
        'flightclub' : flightClubGrey,
        'depop' : DepopGrey,
        'klekt' : KLEKTGrey,
        'ebay' : eBayGrey
    }

    const isDesktop = useMediaQuery({query: '(min-width: 870px)'})
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
                    {!isDesktop && <div className='item-sneaker-filters mobile'>
                        <SizeFilter />
                    </div>}

                    <div className='item-sneaker-image'>
                        <img src={itemInfo.image} alt='sneaker' />
                    </div>

                    <div className='item-sneaker-info'>
                        {isDesktop && <div className='item-sneaker-filters'>
                            <SizeFilter />
                        </div>}

                        <div className='item-sneaker-text'>
                            <div className='item-sneaker-model'>
                                <h1> {itemInfo.modelName} </h1>
                            </div>

                            {pricesLoader && <ItemLoader version={'info'} />}

                            {!pricesLoader && <div className='item-sneaker-price-details'>

                                <a target='_blank' href={`https://${itemPrices[0].url}`} rel="noopener noreferrer">
                                    <div className='item-sneaker-price'>
                                        <h2> Buy {currencySymbol}{itemPrices[0].price} </h2>
                                    </div>
                                </a>

                                <div className='item-sneaker-details'>
                                    <div className='item-sneaker-data'>
                                        <p> SIZE </p>
                                        <h4> {size} </h4>
                                    </div>

                                    <div className='item-sneaker-data-border' />
                                    <div className='item-sneaker-data middle'>
                                        <p> CONDITION </p>
                                        <h4> New </h4>
                                    </div>
                                    <div className='item-sneaker-data-border' />

                                    <div className='item-sneaker-data'>
                                        <p> WEBSITE </p>
                                        <div className={`item-sneaker-site ${itemPrices[0].source}`}>

                                            <img src={websiteLogoMap[itemPrices[0].source]} 
                                                alt='website logo' 
                                            />
                                        </div>
                                    </div>
                                </div>
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





    // if (loader) {
    //     return (
    //         <Loader />
    //     )
    // } else {
    //     return (
    //         <div className='item'>
    //             <div className='item-info'>
    //                 <div className='item-shoe'>
    //                     <img src={itemInfo.image} alt='sneaker image' />
    //                 </div>
    //                 <div className='item-text'>
    //                     <h2 className='item-model'>
    //                         {itemInfo.modelName}
    //                     </h2>

    //                     <div className='item-buy'>
    //                         <p> Buy $TMP{/* itemData.prices[0].price */}</p>
    //                     </div>

    //                     <div className='item-specifics'>
    //                         <div className='item-size'>
    //                             <h4> SIZE </h4>
    //                             <p> {size} </p>
    //                         </div>
    //                         <div className='item-specifics-divider' />
    //                         <div className='item-condition'>
    //                             <h4> CONDITION </h4>
    //                             <p> New </p>
    //                         </div>
    //                         <div className='item-specifics-divider' />
    //                         <div className='item-website'>
    //                             <h4> WEBSITE </h4>
    //                             <img src={stockX} alt='StockX' />
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='item-listings'>
    //                 <div className='item-listings-wrapper'>

    //                     <div className='item-listings-cheapest'>
    //                         <h2 className='lowest-prices-title'> 
    //                             Lowest Prices
    //                             <p className='item-filter' onClick={() => dispatch(showFilter())}>FILTER</p>
    //                         </h2>
    //                         <div className='item-lowest-prices'>
    //                             <div className='item-lowest-prices-wrapper'>
    //                                 {itemPriceComponents}
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className='item-listings-used'>
    //                         <h2 className='more-listings-title'>
    //                             More Listings
    //                         </h2>

    //                         <div className='item-more-listings'>
    //                             <div className='item-more-listings-wrapper'>
    //                                 {itemListingComponents}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

}