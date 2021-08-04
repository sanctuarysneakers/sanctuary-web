import React from 'react'

export default function ItemLoader({ version }) {

    return (
        <div className='item-loader'>

            {/* Loader for prices/listings rows */}

            {version !== 'source' && version !== 'info' && <div className='item-loader-content'>

                <div className='item-loader-row'>
                    <div className='item-loader-source'>
                        <div className={`item-loader-logo ${version}`} />

                        <div className='item-loader-text'>
                            <div className='item-loader-price' />
                            <div className='item-loader-condition' />
                        </div>
                    </div>

                    <div className='item-loader-link'>
                        <div className='item-loader-amount' />
                    </div>
                </div>

                <div className='item-loader-row'>
                    <div className='item-loader-source'>
                        <div className={`item-loader-logo ${version}`} />

                        <div className='item-loader-text'>
                            <div className='item-loader-price' />
                            <div className='item-loader-condition' />
                        </div>
                    </div>

                    <div className='item-loader-link'>
                        <div className='item-loader-amount' />
                    </div>
                </div>

                <div className='item-loader-row'>
                    <div className='item-loader-source'>
                        <div className={`item-loader-logo ${version}`} />

                        <div className='item-loader-text'>
                            <div className='item-loader-price' />
                            <div className='item-loader-condition' />
                        </div>
                    </div>

                    <div className='item-loader-link'>
                        <div className='item-loader-amount' />
                    </div>
                </div>


                {version === 'listings' && <div className='item-loader-row'>
                    <div className='item-loader-source'>
                        <div className={`item-loader-logo ${version}`} />

                        <div className='item-loader-text'>
                            <div className='item-loader-price' />
                            <div className='item-loader-condition' />
                        </div>
                    </div>

                    <div className='item-loader-link'>
                        <div className='item-loader-amount' />
                    </div>
                </div>}
                

                <div className='item-loader-row last'>
                    <div className='item-loader-source'>
                        <div className={`item-loader-logo ${version}`} />

                        <div className='item-loader-text'>
                            <div className='item-loader-price' />
                            <div className='item-loader-condition' />
                        </div>
                    </div>

                    <div className='item-loader-link'>
                        <div className='item-loader-amount' />
                    </div>
                </div>

            </div>}

            {/* Loader for sneaker source and info */}

            {version === 'source' && <div className='item-source-loader-content'>
                <div className='item-source-loader-website' />
            </div>}

            {version === 'info' && <div className='item-info-loader-content'>
                <div className='item-info-loader-price' /> 

                <div className='item-info-loader-size' /> 
            </div>}
        </div>
    )
}