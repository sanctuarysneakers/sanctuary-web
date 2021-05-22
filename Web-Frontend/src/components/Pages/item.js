import React from 'react'
import { useParams } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { updateItemKey, updateItem } from '../../redux/actions'
import useAPICall from '../Hooks/useapicall'

export default function Item() {

    const dispatch = useDispatch()

    const {urlKey} = useParams()
    dispatch(updateItemKey(urlKey))

    const itemInfo = useSelector(state => state.item)
    const itemPrices = useSelector(state => state.itemPrices)
    const itemListings = useSelector(state => state.itemListings)
    
    console.log(itemPrices)
    //console.log(itemListings)

    useAPICall('getiteminfo')

    // This needs to get called after the above line is finished.
    // The bug is that this gets called before the above line has finished
    // and the new item info is rendered. This will get called even though
    // the item info hasn't updated since it gets called on the initial mount
    // of the component.
    useAPICall('getitemprices')

    return (
        <div>
            <p>{itemInfo.modelName}</p>
            <p>{itemInfo.skuId}</p>
        </div>
    )
}