import React from 'react'
import { Helmet } from 'react-helmet';
import { useParams, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SizeFilter from './sizeFilter'
import SizeModal from '../Modals/sizeModal'
import SocialsButton from './socialsButton'
import SocialsModal from '../Modals/socialsModal'
import useAPICall from '../../hooks/useApiCall'
import ItemPrice from './itemPrice'
import ItemListing from './itemListing'
import ItemLoader from './itemLoader'
import ItemNoResults from './itemNoResults'
import Footer from '../Other/footer'

import { websiteLogoMapGrey, currencySymbolMap }  from '../../assets/constants'

export default function Item() {

    const currency = useSelector(state => state.currency)
    const { sku, gender } = useParams()
    const size = useSelector(state => state.item.size)

    //check if coming from (browse/carousel) or (direct link/autosuggest selection)
    const navLocation = useLocation() 
    let passedData = navLocation.itemInfo ? navLocation.itemInfo : null
    useAPICall('getitem', {
        sku: decodeURIComponent(sku), 
        size: size, 
        gender: gender, 
        fromBrowse: passedData
    })

    const itemInfo = useSelector(state => state.item.itemInfo)
    const itemPrices = useSelector(state => state.item.itemPrices)
    const itemListings = useSelector(state => state.item.itemListings)
    const pricesLoading = useSelector(state => state.item.loadingItemPrices)
    const listingsLoading = useSelector(state => state.item.loadingItemListings)
    const sizeModalVisible = useSelector(state => state.modals.sizeModalVisible)
    const socialsModalVisible = useSelector(state => state.modals.socialsModalVisible)

    const priceComponents = itemPrices.map((item, index) =>
        <ItemPrice key={item.source} data={item} index={index}
            length={itemPrices.length} />
    )
    const listingComponents = itemListings.map((item, index) =>
        <ItemListing key={item.id} data={item} index={index}
            length={itemListings.length} />
    )

    const clickHandler = () => {
        window.analytics.track(`item_buy_new_clicked`, {sku: decodeURIComponent(sku), gender: gender, model: itemInfo.modelName});
    }

    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
        <div className='item'>
            <Helmet>
                {itemInfo.modelName && <title>{`Sanctuary: ${itemInfo.modelName}`}</title>}
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
                                        src={websiteLogoMapGrey[itemPrices[0].source]} alt='website logo' 
                                    />
                                </div> 
                                : 
                                <div className='item-sneaker-source-none'>
                                    <p> --- </p>
                                </div>} 
                            </div>}

                            <div className='item-sneaker-model'>
                                <h1> {itemInfo.modelName} {itemInfo.modelName && <SocialsButton/>}</h1>
                            </div>

                            {pricesLoading && <ItemLoader version={'info'} />}
                            {!pricesLoading && <div className='item-sneaker-price-details'>
                                {itemPrices.length ? 
                                
                                <Link to={{ pathname: itemPrices[0].url }} className="hidden-link" target="_blank" rel="noopener noreferrer" onClick={clickHandler} onContextMenu={clickHandler}> 
                                    <div className='item-sneaker-price'>
                                        <h2>
                                            Buy New {currencySymbolMap[currency]}{itemPrices[0].price}
                                        </h2>
                                    </div>
                                </Link>
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

                                {socialsModalVisible && <SocialsModal itemName={itemInfo.modelName} price={`${currencySymbolMap[currency]}${itemPrices[0].price}`} url={window.location.href} image={itemInfo.iamge}/> }

                            </div>}
                        </div>
                    </div>

                    {/* {!pricesLoading && <div> 
                        <Socials itemName={itemInfo.modelName} price={`${currencySymbolMap[currency]}${itemPrices[0].price}`} url={window.location.href} image={itemInfo.iamge}/> 
                    </div>}  */}
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