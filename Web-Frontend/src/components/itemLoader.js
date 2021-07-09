import React from 'react'

export default function ItemLoader({ version }) {

    return (
        <div className='item-loader'>
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
        </div>
    )
}