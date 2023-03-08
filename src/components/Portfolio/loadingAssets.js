import React from 'react'
import { ReactComponent as RightArrow } from '../../assets/images/RightArrow.svg'

export default function LoadingAssets() {
    return (
        <div className='portfolio-card'>
            <div className='portfolio-card-content'>
                <div className='portfolio-card-info'>
                    <div className='loading-assets-sneaker' />

                    <div className='portfolio-card-model'>
                        <div className='loading-assets-model' />
                        <div className='loading-assets-size' />
                        <div className='loading-assets-condition' />
                    </div>
                </div>

                <div className='portfolio-card-price'>
                    <div className='portfolio-card-price-data'>
                        <div className='loading-assets-price' />
                        <div className='loading-assets-change' />
                    </div>

                    <RightArrow />
                </div>
            </div>
        </div>
    )
}