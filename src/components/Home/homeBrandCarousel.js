import React from 'react'
import HomeBrandCard from './homeBrandCard'


export default function HomeBrandCarousel() {

    const brands = [
		{name: 'Nike'}, {name: 'Air Jordan'},
		{name: 'Adidas'}, {name: 'Yeezy'},
		{name: 'New Balance'}, {name: 'Converse'},
	]

    const brandCards = brands.map((item) => (
        <HomeBrandCard key={item.name} data={item} />
    ))

    return (
        <div className='brand-cards'>
             {brandCards} 
        </div>
    )
}