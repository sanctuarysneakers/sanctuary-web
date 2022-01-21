import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAboutModal, hideHamburgerModal } from '../redux/actions'
import ProfileIcon from '../assets/images/icons/profileIcon'
import {ReactComponent as RightArrow} from '../assets/images/RightArrow.svg'

export default function HamburgerMenu() {

    const ref = useRef()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const menuVisible = useSelector(state => state.hamburgerModalVisible)

    const handleHowItWorks = () => {
        dispatch(hideHamburgerModal())
        dispatch(showAboutModal())
    }

    useEffect(() => {
        const handleClickOut = (e) => {
            if (menuVisible && ref.current && !ref.current.contains(e.target)) {
                dispatch(hideHamburgerModal())
            }
        }
        document.addEventListener("mousedown", handleClickOut)

        return () => {
            document.removeEventListener("mousedown", handleClickOut)
        }
    })

    return (
        <div className={menuVisible ? 'hamburger-background active' : 'hamburger-background'}>
            <div className={menuVisible ? 'hamburger-menu active' : 'hamburger-menu'} ref={ref}>

                <div className='hamburger-menu-content'>
                    <div className='hamburger-menu-header'>
                        <div className='hamburger-menu-tab' />
                        <h2> Menu </h2>
                    </div>

                    <div className='hamburger-menu-account'>
                        {/* Styling when user is signed out */}
                        {!user && <div className='hamburger-menu-account-out'>
                            <button className='create-account' onClick={() => document.location.href = '/create-account'}>
                                Create Account
                            </button>

                            <button className='sign-in' onClick={() => document.location.href = '/sign-in'}>
                                Sign In
                            </button>
                        </div>}

                        {/* Styling when user is signed in */}
                        {user && user.profile.data && <div className='hamburger-menu-account-in'>
                            <div className='hamburger-menu-profile'>
                                <div className='hamburger-menu-profile-content'>
                                    {user.profile.data.pictureUrl ? <img src={user.profile.data.pictureUrl} alt='profile' /> : <ProfileIcon />}
                                    <h4> {user.profile.data.name} </h4>
                                </div>
                            </div>

                            <div className='hamburger-menu-view-profile' onClick={() => document.location.href = '/profile'}>
                                <div className='hamburger-menu-view-profile-content'>
                                    <p> View Profile </p>
                                    <RightArrow />
                                </div>
                            </div>
                        </div>}
                    </div>

                    <div className='hamburger-menu-links'>
                        <div className='hamburger-menu-option' onClick={() => document.location.href = '/browse'}>
                            <div className='hamburger-menu-option-content'>
                                <p> Browse </p>
                                <RightArrow />
                            </div>
                        </div>

                        <div className='hamburger-menu-option' onClick={() => document.location.href = '/newsroom'}>
                            <div className='hamburger-menu-option-content'>
                                <p> Newsroom </p>
                                <RightArrow />
                            </div>
                        </div>

                        <div className='hamburger-menu-option' onClick={handleHowItWorks}>
                            <div className='hamburger-menu-option-content last'>
                                <p> How it Works </p>
                                <RightArrow />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
