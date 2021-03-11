import React, { useRef } from 'react'
import useOutsideAlerter from '../Hooks/useoutsidealerter'

export default function FilterModal() {

    // For Site Redesign

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    return (
        <div className="modal-about"> hello </div>
    )
}