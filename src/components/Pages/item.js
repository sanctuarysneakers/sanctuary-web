import React from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import SizeFilter from '../sizeFilter'
import SizeModal from '../sizeModal'
import useAPICall from '../Hooks/useApiCall'
import ItemPrice from '../itemPrice'
import ItemListing from '../itemListing'
import ItemLoader from '../itemLoader'
import ItemNoResults from '../itemNoResults'
import Footer from '../footer'
import StockXGrey from '../../assets/images/stockx.png'
import GOATGrey from '../../assets/images/goat-grey.svg'
import GrailedGrey from '../../assets/images/grailed-grey.svg'
import flightClubGrey from '../../assets/images/flightClub-grey.svg'
import DepopGrey from '../../assets/images/depop-grey.svg'
import KLEKTGrey from '../../assets/images/klekt-grey.svg'
import eBayGrey from '../../assets/images/ebay-grey.svg'

export default function Item() {

    const websiteLogoMap = {
        'stockx': StockXGrey,
        'goat': GOATGrey,
        'grailed': GrailedGrey,
        'flightclub': flightClubGrey,
        'depop': DepopGrey,
        'klekt': KLEKTGrey,
        'ebay': eBayGrey
    }

    const currency = useSelector(state => state.currency)
    const currencySymbolMap = {
        'USD': '$', 'CAD': 'C$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'AUD': 'A$'
    }

    const { sku, gender } = useParams()
    const size = useSelector(state => state.size)
    useAPICall('getitem', { sku: sku, size: size, gender: gender })

    const itemInfo = useSelector(state => state.itemInfo)
    const itemPrices = useSelector(state => state.itemPrices)
    const itemListings = useSelector(state => state.itemListings)
    const pricesLoading = useSelector(state => state.loadingItemPrices)
    const listingsLoading = useSelector(state => state.loadingItemListings)
    const sizeModalVisible = useSelector(state => state.sizeModalVisible)

    const priceComponents = itemPrices.map((item, index) =>
        <ItemPrice key={item.source} data={item} index={index}
            length={itemPrices.length} />
    )
    const listingComponents = itemListings.map((item, index) =>
        <ItemListing key={item.id} data={item} index={index}
            length={itemListings.length} />
    )

    const clickHandler = (url) => {
        window.analytics.track(`item_buy_new_clicked`, {sku: sku, gender: gender, model: itemInfo.modelName});
        window.open(url, '_blank')
    }

    return (
        <div className='item'>
            <Helmet>
                <title>{`Sanctuary: ${itemInfo.modelName}`}</title>
            </Helmet>
            <div className='item-sneaker'>
                <div className='item-sneaker-content'>

                    <div className='item-sneaker-image'>
                        <img src={itemInfo.image} alt='sneaker' />
                    </div>

                    <div className='item-sneaker-info'>
                        <div className='item-sneaker-text'>

                            {pricesLoading && <ItemLoader version={'source'} />}
                            {!pricesLoading && <div className='item-sneaker-source'>
                                {itemPrices.length ? 
                                <div className={`item-sneaker-site ${itemPrices[0].source}`}>
                                    <img 
                                        src={websiteLogoMap[itemPrices[0].source]} alt='website logo' 
                                    />
                                </div> 
                                : 
                                <div className='item-sneaker-source-none'>
                                    <p> --- </p>
                                </div>} 
                            </div>}

                            <div className='item-sneaker-model'>
                                <h1> {itemInfo.modelName} </h1>
                            </div>

                            {pricesLoading && <ItemLoader version={'info'} />}
                            {!pricesLoading && <div className='item-sneaker-price-details'>
                                {itemPrices.length ? 
                                <a target='_blank' onClick={() => clickHandler(itemPrices[0].url)}>
                                    <div className='item-sneaker-price'>
                                        <h2>
                                            Buy New {currencySymbolMap[currency]}{itemPrices[0].price}
                                        </h2>
                                    </div>
                                </a>
                                : 
                                <a>
                                    <div className='item-sneaker-price none'>
                                        <h2>
                                            Buy New - No Results
                                        </h2>
                                    </div>
                                </a>}

                                <SizeFilter gender={gender} />
                                {sizeModalVisible && <SizeModal gender={gender} />}

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
                                {itemPrices.length ? priceComponents : <ItemNoResults version={'prices'} />}
                            </div>}
                        </div>
                    </div>

                    <div className='item-more-listings'>
                        <h6> More Listings </h6>

                        <div className='item-more-listings-rows'>
                            {listingsLoading && <ItemLoader version={'listings'} />}
                            {!listingsLoading && <div className='item-more-listings-rows-content'>
                                {itemListings.length ? listingComponents : <ItemNoResults version={'listings'} />}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

            <Footer colour={'blue'} />
        </div>
    )
}