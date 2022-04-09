import React from 'react'
import { Helmet } from 'react-helmet';
import { useParams, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SizeFilter from './sizeFilter'
import SizeModal from '../Modals/sizeModal'
import useAPICall from '../../hooks/useApiCall'
import ItemPrice from './itemPrice'
import ItemListing from './itemListing'
import ItemLoader from './itemLoader'
import ItemNoResults from './itemNoResults'
import Footer from '../Other/footer'
import { websiteLogoMapGrey, currencySymbolMap }  from '../../assets/constants'

import { addToPortfolio } from '../../api/api'

export default function Item() {

    const user = useSelector(state => state.user)
    const currency = useSelector(state => state.currency)
    const { sku, gender } = useParams()
    const size = useSelector(state => state.item.size)

    const location = useLocation() 

    //check if coming from (browse/carousel) or (direct link/autosuggest selection)
    let passedData = location.itemInfo ? location.itemInfo : null
    useAPICall('getitem', { sku: sku, size: size, gender: gender, fromBrowse: passedData})

    const itemInfo = useSelector(state => state.item.itemInfo)
    const itemPrices = useSelector(state => state.item.itemPrices)
    const itemListings = useSelector(state => state.item.itemListings)
    const pricesLoading = useSelector(state => state.item.loadingItemPrices)
    const listingsLoading = useSelector(state => state.item.loadingItemListings)
    const sizeModalVisible = useSelector(state => state.modals.sizeModalVisible)

    const priceComponents = itemPrices.map((item, index) =>
        <ItemPrice key={item.source} data={item} index={index}
            length={itemPrices.length} />
    )
    const listingComponents = itemListings.map((item, index) =>
        <ItemListing key={item.id} data={item} index={index}
            length={itemListings.length} />
    )

    const clickHandler = () => {
        window.analytics.track(`item_buy_new_clicked`, {sku: sku, gender: gender, model: itemInfo.modelName});
    }

    const onAddToPortfolio = () => {
        let portfolioItem = {
            user_id: user.uid,
            sku: itemInfo.skuId,
            size: size,
            add_date: new Date().toISOString().slice(0, 10),
            price: itemPrices[0].price
        }

        try {
            addToPortfolio(portfolioItem)
        } catch(error) {
            alert(error)
        }
       
    } 

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

                            {user && 
                                <button onClick={() => onAddToPortfolio()}>
                                    Add to Portfolio
                                </button>}

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