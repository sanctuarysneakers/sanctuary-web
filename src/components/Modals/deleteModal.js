import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideDeleteModal } from '../../redux/actions'
import { useHistory } from 'react-router-dom'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'

export default function DeleteModal() {

    const user = useSelector(state => state.user)
    const history = useHistory()
    const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)

    const deleteUser = () => {
        user.delete().then(() => {
            dispatch(hideDeleteModal())
            history.push("/")
        }).catch(e => {
            alert(e)
        })
    }

    return (
        <div className='modal-delete'> 
            <div className='delete-confirmation' ref={wrapperRef}>
                <div className='delete-confirmation-container'>

                    <h1> Are you sure? </h1>
                    <p className='delete-middle-text'> All information linked to this account will be 
                        permanently deleted and this action can not be undone.
                    </p>

                    <div className='delete-buttons'>
                        <div className='confirm-delete-button' onClick={deleteUser}>
                            <p> Delete Account </p>
                        </div>
                        <div className='cancel-delete-button' onClick={() => dispatch(hideDeleteModal())}>
                            <p> Cancel </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}