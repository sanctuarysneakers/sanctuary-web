import React from 'react'
import { useDispatch } from 'react-redux'
import { showSocialsModal } from '../../redux/actions'
import { FaShareSquare } from 'react-icons/fa'

export default function SocialsButton () {
  const dispatch = useDispatch()

  return (
        <FaShareSquare onClick={() => dispatch(showSocialsModal())}/>
  )
}
