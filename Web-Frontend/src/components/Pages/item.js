import React from 'react'
import { useParams } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { updateItemKey } from '../../redux/actions'
import useAPICall from '../Hooks/useapicall'

export default function Item() {

    const dispatch = useDispatch()

    const {urlKey} = useParams()
    dispatch(updateItemKey(urlKey))

    const itemInfo = useSelector(state => state.item)
    const itemPrices = useSelector(state => state.itemPrices)
    
    useAPICall('getiteminfo')
    useAPICall('getitemprices')

    console.log(itemPrices)

    return (
        <div>
            <p>{itemInfo.modelName}</p>
            <p>{itemInfo.skuId}</p>
        </div>
    )
}