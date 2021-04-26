import React from 'react'
import { updateShoe, showShoeModal } from '../redux/actions'
import { useDispatch } from 'react-redux'

export default function Sneaker(props) {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(updateShoe(props))
        dispatch(showShoeModal())
    }

    return (
        <div className='sneaker' onClick={() => clickHandler()}>
            <div className='sneaker-content'>
                
                <div className='img-area'>
                    <img 
                        className='sneakerImg'
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
