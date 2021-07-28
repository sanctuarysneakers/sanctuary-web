import React from 'react'
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

    const isDesktop = useMediaQuery({query: '(min-width: 870px)'})
    const websiteLogoMap = {
        'stockx' : StockXGrey,
        'goat' : GOATGrey,
        'grailed' : GrailedGrey,
        'flightclub' : flightClubGrey,
        'depop' : DepopGrey,
        'klekt' : KLEKTGrey,
        'ebay' : eBayGrey
    }

    const currency = useSelector(state => state.currency)
    const currencySymbolMap = {
        'USD':'$', 'CAD':'CA$', 'EUR':'€', 'GBP':'£', 'JPY':'¥', 'AUD':'A$'
    }

    const { sku } = useParams()
    const size = useSelector(state => state.size)
    useAPICall('getitem', { sku: sku, size: size })

    const itemInfo = useSelector(state => state.itemInfo)
    const itemPrices = useSelector(state => state.itemPrices)
    const itemListings = useSelector(state => state.itemListings)
    const pricesLoading = useSelector(state => state.loadingItemPrices)
    const listingsLoading = useSelector(state => state.loadingItemListings)

    const priceComponents = itemPrices.map((item, index) =>
        <ItemPrice key={item.source} data={item} index={index}
            length={itemPrices.length} />
    )
    const listingComponents = itemListings.map((item, index) =>
        <ItemListing key={item.id} data={item} index={index}
            length={itemListings.length} />
    )

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

                            {pricesLoading && <ItemLoader version={'info'} />}

                            {!pricesLoading && <div className='item-sneaker-price-details'>

                                <a target='_blank' href={`https://${itemPrices[0].url}`} rel="noopener noreferrer">
                                    <div className='item-sneaker-price'>
                                        <h2> Buy {currencySymbolMap[currency]}{itemPrices[0].price} </h2>
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
                            {pricesLoading && <ItemLoader version={'prices'} />}

                            {!pricesLoading && <div className='item-lowest-prices-rows-content'>
                                {priceComponents}
                            </div>}
                        </div>
                    </div>

                    <div className='item-more-listings'>
                        <h6> More Listings </h6>

                        <div className='item-more-listings-rows'>
                            {listingsLoading && <ItemLoader version={'listings'} />}

                            {!listingsLoading && <div className='item-more-listings-rows-content'>
                                {itemListings.length ? listingComponents :
                                <div className='item-no-results'>
                                    <p> No results found </p>
                                </div>}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            <Footer colour={'blue'} />
        </div>
    )
}