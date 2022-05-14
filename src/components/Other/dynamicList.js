// component used to wrap a list of elements to allow the user to choose to see more/less items 
import React, { useState, useEffect } from 'react' 

export default function DynamicList({ items, initialLength }) {

    let useShowMore= (items && items.length > initialLength)
    const [showMore, setShowMore] = useState(true)
    const [displayItems, setDisplayitems] = useState(items)

    useEffect(() => {
        if (showMore) {
            setDisplayitems(items.slice(0, initialLength))
        } else {
            setDisplayitems(items)
        }
    // eslint-disable-next-line
    }, [showMore])

    return (
        <div>
            {displayItems}
            {useShowMore && <button onClick={() => setShowMore(!showMore)}> {showMore ? "Show More" : "Show Less"} </button> }
        </div>
    )
}