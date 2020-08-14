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
        <div 
            className='sneaker'
            onClick={() => clickHandler()}
        >
            <img 
                className='sneakerImg'
                src={props.image}
                alt={props.model}
            />
            <h2>{props.model}</h2>
            <h3>{`$${props.price}`}</h3>
            <h3>{props.size}</h3>
        </div>
    )
}