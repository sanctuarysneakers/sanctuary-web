import React from 'react'
import { useParams } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import useAPICall from '../Hooks/useapicall'

export default function Item() {

    const dispatch = useDispatch()

    const {urlKey} = useParams()

    useAPICall('getitem', {itemKey: urlKey})

    const itemData = useSelector(state => state.itemData)
    console.log(itemData)

    return (
        <div>
            <p>{/*itemInfo.modelName*/}</p>
            <p>{/*itemInfo.skuId*/}</p>
        </div>
    )
}