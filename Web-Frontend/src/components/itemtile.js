import React from 'react'
import { updateShoe } from '../redux/actions'
import { useDispatch } from 'react-redux'

export default function ItemTile(props) {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(updateShoe(props))
        //TODO: redirect to item page
    }

    return (
        <div className='item-tile' onClick={() => clickHandler()}>
            <div className='item-tile-content'>
                
                <div className='img-area'>
                    <img 
                        className='tile-img'
                        src={props.img}
                        loading="lazy"
                        alt={props.model}
                    />
                </div>

                <div className="content-area">
                    <div className='name-area'>
                        <h2 className='modelName'>{props.model}</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}
