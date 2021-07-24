import React, { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useDispatch } from 'react-redux'
import { hideSearchModal } from '../redux/actions'
import useOutsideAlerter from './Hooks/useOutsideAlerter'
import SearchBox from './searchBox'

export default function SearchModal() {

    const dispatch = useDispatch()
    const wrapperRef = useRef(null)
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' })

    useOutsideAlerter(wrapperRef)
    
    return (
        <div className='search-modal'>
            <div className='search-modal-content' ref={wrapperRef}>
                <div className='search-modal-navbar'>
                    <SearchBox location={'search-modal'} />
                    {!isDesktop && <p onClick={() => dispatch(hideSearchModal())}>
                        Cancel 
                    </p>}
                </div>

                <div className='search-modal-trending'>
                    <div className='search-modal-trending-content'>
                        <h2> Trending Sneakers </h2>

                        <div className='search-modal-trending-sneaker' 
                            onClick={() => {document.location.href = '/browse/Nike%20Dunk%20Low'}}>

                            <h3> Nike Dunk Low </h3>
                        </div>
                        
                        <div className='search-modal-trending-sneaker'
                            onClick={() => {document.location.href = '/browse/Air%20Jordan%201'}}>

                            <h3> Air Jordan 1 </h3>
                        </div>

                        <div className='search-modal-trending-sneaker'
                            onClick={() => {document.location.href = '/browse/Adidas%20Yeezy%20Boost%20350'}}>

                            <h3> Adidas Yeezy Boost 350 </h3>
                        </div>

                        <div className='search-modal-trending-sneaker last'
                            onClick={() => {document.location.href = '/browse/Aime%20Leon%20Dore'}}>

                            <h3> Aime Leon Dore </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}