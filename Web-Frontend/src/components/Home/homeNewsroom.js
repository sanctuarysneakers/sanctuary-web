import React from 'react'

export default function HomeNewsroom() {

    return (
        <div className='home-newsroom'>
            <div className='home-newsroom-wrapper'>
                <div className='home-newsroom-headline'>
                    <div className='home-newsroom-text'>
                        <h2>
                            Everything you need to know about sneakers is here.
                        </h2>
                        <p>
                            Stay up to date with the latest Sanctuary news and headlines
                            within the industry. It’s the ultimate place for all sneakerheads
                            alike; curated by our team.
                        </p>
                    </div>

                    <div className='home-newsroom-buttons'>
                        <div className='home-newsroom-read-now'>
                            <p>
                                Start reading now
                            </p>
                        </div>
                    </div>
                </div>

                <div className='home-newsroom-articles'>
                    <div className='home-newsroom-article1'></div>
                    <div className='home-newsroom-article2'></div>
                    <div className='home-newsroom-article3'></div>
                </div>
            </div>
        </div>
    )
}