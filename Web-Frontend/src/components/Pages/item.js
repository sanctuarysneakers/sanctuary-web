import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import useAPICall from '../Hooks/useapicall'
import Loader from '../loader'
import stockX from '../../assets/images/stockx-new.png'

export default function Item() {

    const { urlKey } = useParams()
    const itemData = useSelector(state => state.itemData)
    const currency = useSelector(state => state.currency);
    console.log(itemData);
    useAPICall('getitem', { itemKey: urlKey });

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (itemData.info) {
            setLoader(false)
        }
    })

    if (loader) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className='item'>
                <div className='item-info'>
                    <div className='item-shoe'>
                        <img src={itemData.info.image} alt='sneaker image' />
                    </div>

                    <div className='item-text'>
                        <h2 className='item-model'>
                            {itemData.info.modelName}
                        </h2>

                        <div className='item-price'>
                            <p> Buy ${itemData.prices[0].price}</p>
                        </div>

                        <div className='item-specifics'>
                            <div className='item-size'>
                                <h4> SIZE </h4>
                                <p> 10 </p>
                            </div>
                            <div className='item-specifics-divider' />
                            <div className='item-condition'>
                                <h4> CONDITION </h4>
                                <p> New </p>
                            </div>
                            <div className='item-specifics-divider' />
                            <div className='item-website'>
                                <h4> WEBSITE </h4>
                                <img src={stockX} alt='StockX' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='item-listings'>
                </div>
            </div>
        )
    }

    // return (
    //     // trying to display item attributes causes an error because
    //     // itemData is initially an empty object
    //     <div>
    //         <p>{/*itemData.info.modelName*/}</p>
    //         <p>{/*itemData.info.skuId*/}</p>
    //     </div>
    // )
}