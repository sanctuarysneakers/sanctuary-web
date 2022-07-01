import React from 'react'
import { useSelector } from 'react-redux'
import Carousel from './Carousels/carousel'

export default function FeaturedCollections() {

    const featuredCollections = useSelector(state => state.browse.featuredCollections)

    return (
        <div>
            {featuredCollections && featuredCollections.length > 0 && featuredCollections.map(collection => 
                <div> 
                    {collection.title == "Most Popular" && <Carousel data={collection.data} type={"trending"} /> }
                    {collection.title != "Most Popular" &&    
                        <div>                   
                            <h2 className='home-trending-sneakers-header'>
                            {collection.title}
                            </h2>
                            <Carousel data={collection.data} type={"featuredCollection"} /> 
                        </div> 
                    }
                </div> 
            )}
        </div>
    )
}
