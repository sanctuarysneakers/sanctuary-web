import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideDeleteModal } from '../redux/actions'
import { useHistory } from 'react-router-dom'
import useOutsideAlerter from './Hooks/useOutsideAlerter'
import { realm } from "../services/realm.js"

export default function DeleteModal() {

    const user = useSelector(state => state.user)
    const history = useHistory()
    const wrapperRef = useRef(null)
    const dispatch = useDispatch()
    useOutsideAlerter(wrapperRef)

    const deleteUser = async () => {

        // Get a client object for your app's custom user data collection
        const mongodb = realm.currentUser.mongoClient("mongodb-atlas");
        const users = mongodb.db("App").collection("User");

        try {
            await users.findOneAndDelete({userID: user.id}); 
            dispatch(hideDeleteModal())
            history.push("/")
            window.scrollTo(0, 0)
        } catch(e) {
            alert(e)
        } 
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