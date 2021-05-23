import React from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { updateItemData } from '../redux/actions'

export default function ItemTile({data}) {

    const dispatch = useDispatch()
    const history = useHistory()

    const clickHandler = () => {
        history.push(`/item/${data.urlKey}`)  // redirect to item page
        dispatch(updateItemData({}))  // clear old item data
    }

    return (
        <div className='item-tile' onClick={clickHandler}>
            <div className='item-tile-content'>
                
                <div className='img-area'>
                    <img 
                        className='tile-img'
                        src={data.imageThumbnail}
                        loading="lazy"
                        alt={data.model}
                    />
                </div>

                <div className="content-area">
                    <div className='name-area'>
                        <h2 className='modelName'>{data.model}</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}
