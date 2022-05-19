import React from 'react'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import { useParams, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SizeFilter from './sizeFilter'
import SizeModal from '../Modals/sizeModal'
import SocialsModal from '../Modals/socialsModal'
import useAPICall from '../../hooks/useApiCall'
import ItemPrice from './itemPrice'
import ItemListing from './itemListing'
import ItemLoader from './itemLoader'
import ItemNoResults from './itemNoResults'
import Footer from '../Other/footer'
import { showSocialsModal } from '../../redux/actions'
import { ReactComponent as Share } from '../../assets/images/share.svg'
import { websiteLogoMapGrey, currencySymbolMap } from '../../assets/constants'
import DynamicList from '../Other/dynamicList'
import RecommendedCard from './recommendedCard'

export default function Item() {

    const dispatch = useDispatch()

    const { itemKey, gender } = useParams()
    const currency = useSelector(state => state.currency)
    const size = useSelector(state => state.size)

    const navLocation = useLocation()
    let passedData = navLocation.itemInfo ? navLocation.itemInfo : null
    useAPICall('getitem', {
        itemKey: itemKey.toLowerCase() === itemKey ? itemKey : decodeURIComponent(itemKey.replaceAll('-', ' ')), //differentiates between urlkey and sku
        size: size,
        gender: gender,
        fromBrowse: passedData
    })

    const itemInfo = useSelector(state => state.item.itemInfo)
    const itemPrices = useSelector(state => state.item.itemPrices)
    const itemListings = useSelector(state => state.item.itemListings)
    const relatedItems = useSelector(state => state.item.relatedItems)
    const pricesLoading = useSelector(state => state.item.loadingItemPrices)
    const listingsLoading = useSelector(state => state.item.loadingItemListings)
    const relatedLoading = useSelector(state => state.item.relatedItemsLoading)
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
        window.analytics.track(`item_buy_new_clicked`, { sku: decodeURIComponent(itemKey), gender: gender, model: itemInfo.modelName });
    }

    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
        <div className='item'>
            <HelmetProvider>
                <Helmet>
                    {itemInfo.modelName && <title>{`Sanctuary: ${itemInfo.modelName}`}</title>}
                    <meta property="og:title" content={itemInfo.modelName} />
                    <meta property="og:image" content={itemInfo.image} />
                </Helmet>
            </HelmetProvider>

            <div className='item-sneaker'>
                <div className='item-sneaker-wrapper'>
                    <div className='item-sneaker-actions'>
                        <div className='item-sneaker-share' onClick={() => dispatch(showSocialsModal())}>
                            <Share />
                        </div>
                    </div>

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
                                        <div className='item-sneaker-source-none'></div>}
                                </div>}

                                <div className='item-sneaker-model'>
                                    <h1> {itemInfo.modelName} </h1>
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
                                                    No Results
                                                </h2>
                                            </div>
                                        </a>}

                                    <SizeFilter gender={gender} />
                                    {sizeModalVisible && <SizeModal gender={gender} />}
                                    {socialsModalVisible && <SocialsModal itemName={itemInfo.modelName} price={`${currencySymbolMap[currency]}${itemPrices[0].price}`} url={window.location.href} image={itemInfo.iamge} />}
                                </div>}
                            </div>
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

                        {/* <div className='item-more-listings-rows'>
                            {listingsLoading && <ItemLoader version={'listings'} />}

                            {!listingsLoading && <div className='item-more-listings-rows-content'>
                                {itemListings.length ? <DynamicList name={'item-more-listings-rows-content'} items={listingComponents} initialLength={5}/> : <ItemNoResults version={'listings'} />}
                            </div>}
                        </div> */}

                        {listingsLoading ?
                            <div className='item-more-listings-rows'>
                                <ItemLoader version={'listings'} />
                            </div>
                            :
                            <div>
                                {itemListings.length ?
                                    <DynamicList 
                                        name={'item-more-listings-rows'}
                                        items={listingComponents} 
                                        initialLength={5} />
                                    : 
                                    <ItemNoResults version={'listings'} />
                                }
                            </div>
                        }
                    </div>

                    <div className='item-more-listings'>
                        <h6> Related Models</h6>
                        {!relatedLoading && relatedItems.length !== 0 &&
                            <div> {relatedItems.map((item) => <RecommendedCard data={item} />)}</div>
                        }
                    </div>
                </div>
            </div>

            <Footer colour={'blue'} />
        </div>
    )
}