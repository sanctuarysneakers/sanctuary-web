import React, { useRef } from 'react'
import firebase from '../../services/firebase.js'
import useOutsideAlerter from '../Hooks/useoutsidealerter'
import { useDispatch, useSelector } from 'react-redux'
import { hideHamburgerModal, showAboutModal } from '../../redux/actions'
import { Link, useHistory } from 'react-router-dom'
import InfoIcon from '../../assets/images/icons/infoIcon'
import ProfileIcon from '../../assets/images/icons/profileIcon'
import SignOutIcon from '../../assets/images/icons/signOutIcon.js'
import BlogIcon from '../../assets/images/icons/blogIcon.js'


export default function HamburgerModal() {

    // const user = firebase.auth().currentUser
    const user = useSelector(state => state.user)
    
    const dispatch = useDispatch()
    const wrapperRef = useRef(null)
    const history = useHistory()
    useOutsideAlerter(wrapperRef)

    const handlecloseModal = () => {
        dispatch(hideHamburgerModal())
        window.scrollTo(0, 0)
    }

    const handleShowAboutModal = () => {
        dispatch(hideHamburgerModal())
        dispatch(showAboutModal())
    }

    const signOut = () => {
        firebase.auth().signOut()
        .then(() => {
            dispatch(hideHamburgerModal())
            history.push("/")
            window.scrollTo(0, 0)
        })
    }

    return (
        <div className='modal-hamburger'>
            <div className='menu' ref={wrapperRef}>
                
                <div className='menu-header'>
                    <div className='menu-pull-tab'></div>
                    <h2> Menu </h2>
                </div>

                <div className='menu-account'>
                    <div className='menu-account-top'>

                        {!user && <ProfileIcon />}

                        {user && <div className='profile-area'>

                            {user.photoURL !== null && 
                                <img className='profilePicture' src={user.photoURL} alt='profile-picture' />
                            }

                            {user.photoURL === null && <ProfileIcon />}

                        </div>}

                        {!user && <div className='account-description'>
                            <p> Become a member today! </p>
                        </div>}

                        {user && 
                            <Link className='account-description-signed-in' 
                            onClick={handlecloseModal} 
                            to="/profile">

                                <h2> {user.displayName} </h2>
                                <p> Edit Profile </p>
                                
                            </Link>
                        }
                    </div>

                    {!user && <div className='menu-account-bottom'>

                        <Link className='create-account' 
                            onClick={handlecloseModal} 
                            to="/create-account">
                                
                            <button className='create-account-button'>
                                Create account 
                            </button>
                        </Link>
                        
                        <Link className='sign-in'
                            onClick={handlecloseModal} 
                            to="/sign-in">

                                <button className='sign-in-button'> 
                                    Sign in 
                                </button>
                        </Link>
                    </div>}
                </div>

                <div className='menu-options'>
                    <div className='menu-options-how-it-works' onClick={handleShowAboutModal}>
                        <InfoIcon />
                        <div className='title'>
                            <p> How it Works </p>
                        </div>
                    </div>

                    <Link className='menu-options-blog' onClick={handlecloseModal} to="/blog">
                        <BlogIcon />
                        <div className='title'>
                            <p> Newsroom </p>
                        </div>
                    </Link>

                    {user && <div className='menu-options-sign-out' onClick={signOut}>
                        <SignOutIcon />
                        <div className='title'>
                            <p> Sign Out </p>
                        </div>
                    </div>}
                </div>

            </div>
        </div>
    )
}