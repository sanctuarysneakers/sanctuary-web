import React from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import useAPICall from '../Hooks/useapicall'

export default function Item() {

    const {urlKey} = useParams()
    const itemData = useSelector(state => state.itemData)
    console.log(itemData)

    useAPICall('getitem', {itemKey: urlKey})

    return (
        // trying to display item attributes causes an error because
        // itemData is initially an empty object
        <div>
            <p>{/*itemData.info.modelName*/}</p>
            <p>{/*itemData.info.skuId*/}</p>
        </div>
    )
}