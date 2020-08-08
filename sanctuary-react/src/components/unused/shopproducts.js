// import React, { useState } from 'react'
// import Catalog from '../catalog'
// import FilterBar from '../filterbar'
// import SearchBar from '../searchbar'

// export default function ShopProducts(props) {
//     const [search, changeSearch] = useState("")
//     const [size, changeSize] = useState(0)
//     const [price, changePrice] = useState(0)
//     const [source, changeSource] = useState(props.site)

//     // TODO: add price_low, price_high props

//     return (
//         <div className="products">
//             <SearchBar
//                 search={search}
//                 changeSearch={changeSearch}
//             />
//             <h2>Results 237</h2>
//             <FilterBar 
//                 size={size}
//                 changeSize={changeSize}
//                 price={price}
//                 changePrice={changePrice}
//                 source={source}
//                 changeSource={changeSource}
//             />
//             <Catalog 
//                 search={search}
//                 size={size}
//                 price={price}
//                 source={source}
//             />
//         </div>
//     )
// }