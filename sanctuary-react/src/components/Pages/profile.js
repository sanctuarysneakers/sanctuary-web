import React from 'react'
import firebase from '../../services/firebase.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { showDeleteModal } from '../../redux/actions'
import { FaChevronRight } from 'react-icons/fa'
import ProfileIcon from '../../assets/images/icons/profileIcon'

export default function Profile() {

    // const user = firebase.auth().currentUser
    const user = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()

    const signOut = () => {
        firebase.auth().signOut().then(
            history.push("/"),
            window.scrollTo(0, 0)
        )
    }

    return (
        <div className='profile-page'>

            {!user && <div className='not-signed-in'>
            </div>}

            {user && <div className='profile-page-container'>

                <div className='profile-page-title'>
                    <h1> Profile </h1>
                    <p> BETA </p>
                </div>

                <div className='profile-page-header'>

                    <div className='profile-picture'>
                        <div className='profile-picture-container'>
                            {user.photoURL === null && <ProfileIcon />}

                            {user.photoURL !== null && 
                                <img src={user.photoURL} alt='Profile' />
                            }
                        </div>
                    </div>

                    <div className='profile-text'>
                        <h1> {user.displayName} </h1>
                        <p> {user.email} </p>
                    </div>

                </div>

                <div className='profile-page-options'>
                    <div className='profile-page-options-container'>

                        {/* Edit Name */}
                        <div className='edit-profile'>
                            <Link to='/profile-edit-name'>
                                <div className='edit-profile-container'>
                                    <p> Update Name </p>
                                    <FaChevronRight /> 
                                </div>
                            </Link>
                        </div>

                        {/* Edit Email */}
                        <div className='edit-profile'> 
                            <Link to='/profile-edit-email'>
                                <div className='edit-profile-container'>
                                    <p> Edit Email </p>
                                    <FaChevronRight /> 
                                </div>
                            </Link>
                        </div>

                        {/* Edit password */}
                        <div className='edit-profile'> 
                            <Link to='/profile-edit-password'>
                                <div className='edit-profile-container'>
                                    <p> Change Password </p>
                                    <FaChevronRight /> 
                                </div>
                            </Link>
                        </div>

                        <div className='profile-sign-out' onClick={signOut}>
                            <p> Sign Out </p>
                        </div>

                        <div className='profile-delete' onClick={() => dispatch(showDeleteModal())}>
                            <p> Delete Account </p>
                        </div>

                    </div>
                </div>

            </div>}
        </div>
    )
}