import React from 'react'


export default function ItemTile({data}) {

    const clickHandler = () => {
        // redirect to item page
        document.location.href = `/item/${data.urlKey}`
    }

    return (
        <div className='item-tile' onClick={clickHandler}>
            <div className='item-tile-content'>
                
                <div className='img-area'>
                    <img 
                        className='tile-img'
                        src={data.imageThumbnail}
                        loading="lazy"
                        alt={data.model}
                    />
                </div>

                <div className="content-area">
                    <div className='name-area'>
                        <h2 className='modelName'>{data.model}</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}
