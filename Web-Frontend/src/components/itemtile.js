import React from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { updateShoe } from '../redux/actions'

export default function ItemTile({data}) {

    const dispatch = useDispatch()
    const history = useHistory()

    const shoeData = useSelector(state => state.shoe)

    const clickHandler = () => {
        dispatch(updateShoe(data))
        //console.log(shoeData)

        // TODO: Redirect to item page with sku_id as query param
        let path = `/item`
        history.push(path)
    }

    return (
        <div className='item-tile' onClick={clickHandler}>
            <div className='item-tile-content'>
                
                <div className='img-area'>
                    <img 
                        className='tile-img'
                        src={data.image_thumbnail}
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
