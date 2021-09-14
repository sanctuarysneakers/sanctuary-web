import React from 'react'
import Footer from '../footer'
import { ArticleData } from './articleData'
import {ReactComponent as SanctuaryIconBlack} from '../../assets/images/sanctuaryIconBlack.svg'

export default function Newsroom() {

    return (
        <div className='newsroom'>
            <div className='newsroom-content'>
                <div className='newsroom-header'>
                    <div className='newsroom-header-logo'>
                        <SanctuaryIconBlack />
                        <h1> Newsroom </h1>
                    </div>

                    <p>
                        Your source for the latest Sanctuary news, sneaker
                        drops, and upcoming raffles.
                    </p>
                </div>

                <div className='newsroom-latest-articles'>
                    <h2> Latest Articles </h2>

                    <div className='newsroom-featured-article' onClick={() => document.location.href = ArticleData[0]['path']}>
                        <img className='newsroom-featured-image' src={ArticleData[0]['image']} alt='featured article' />
                        
                        <div className='newsroom-featured-gradient-text'>
                            <p> {ArticleData[0]['date']} </p>
                            <h3> {ArticleData[0]['title']} </h3>
                        </div>
                    </div>

                </div>
            </div>

            <Footer colour={'blue'} />
        </div>
    )
}