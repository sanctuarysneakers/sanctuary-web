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
                        {user && <div className='hamburger-menu-account-in'>
                            <div className='hamburger-menu-profile'>
                                <div className='hamburger-menu-profile-content'>
                                    {user.photoURL ? <img src={user.photoURL} alt='profile' /> : <ProfileIcon />}
                                    <h4> {user.displayName} </h4>
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






// import React, { useState, useEffect, useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import ProfileIcon from '../assets/images/icons/profileIcon'
// import { ReactComponent as Hamburger } from '../assets/images/Hamburger.svg'
// import {ReactComponent as RightArrow} from '../assets/images/RightArrow.svg'

// export default function HamburgerMenu() {

//     const dispatch = useDispatch()
//     const ref = useRef()
//     const user = useSelector(state => state.user)
//     const [menu, setMenu] = useState(false)

//     const handleMenu = () => {
//         setMenu(!menu)
//     }

//     useEffect(() => {
//         const handleClickOut = (e) => {
//             if (menu && ref.current && !ref.current.contains(e.target)) {
//                 setMenu(!menu)
//             }
//         }
//         document.addEventListener("mousedown", handleClickOut)

//         return () => {
//             document.removeEventListener("mousedown", handleClickOut)
//         }
//     })

//     return (
//         <>
//             <div className='hamburger-button' onClick={handleMenu}>
//                 <Hamburger />
//             </div>

//             <div className={menu ? 'hamburger-background active' : 'hamburger-background'}>
//                 <div className={menu ? 'hamburger-menu active' : 'hamburger-menu'} ref={ref}>

//                     <div className='hamburger-menu-content'>
//                         <div className='hamburger-menu-header'>
//                             <div className='hamburger-menu-tab' />
//                             <h2> Menu </h2>
//                         </div>

//                         <div className='hamburger-menu-account'>

//                             {/* Styling when user is signed out */}
//                             {!user && <div className='hamburger-menu-account-out'>
//                                 <button className='create-account'>
//                                     Create Account
//                                 </button>

//                                 <button className='sign-in' onClick={() => document.location.href = '/sign-in'}>
//                                     Sign In
//                                 </button>
//                             </div>}

//                             {/* Styling when user is signed in */}
//                             {user && <div className='hamburger-menu-account-in'>
//                                 <div className='hamburger-menu-profile'>
//                                     <div className='hamburger-menu-profile-content'>
//                                         {user.photoURL ? <img src={user.photoURL} alt='profile' /> : <ProfileIcon />}
//                                         <h4> {user.displayName} </h4>
//                                     </div>
//                                 </div>

//                                 <div className='hamburger-menu-view-profile'>
//                                     <div className='hamburger-menu-view-profile-content'>
//                                         <p> View Profile </p>
//                                         <RightArrow />
//                                     </div>
//                                 </div>
//                             </div>}
//                         </div>

//                         <div className='hamburger-menu-links'>
//                             <div className='hamburger-menu-option'>
//                                 <div className='hamburger-menu-option-content'>
//                                     <p> Browse </p>
//                                     <RightArrow />
//                                 </div>
//                             </div>

//                             <div className='hamburger-menu-option'>
//                                 <div className='hamburger-menu-option-content'>
//                                     <p> Newsroom </p>
//                                     <RightArrow />
//                                 </div>
//                             </div>

//                             <div className='hamburger-menu-option'>
//                                 <div className='hamburger-menu-option-content last'>
//                                     <p> How it Works </p>
//                                     <RightArrow />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }











// import React, { useState, useRef, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { RemoveScroll } from 'react-remove-scroll'
// import { useHistory } from 'react-router-dom'
// import firebase from '../services/firebase.js'
// import { showAboutModal } from '../redux/actions'
// import ProfileIcon from '../assets/images/icons/profileIcon'
// import { ReactComponent as Hamburger } from '../assets/images/Hamburger.svg'
// import {ReactComponent as RightArrow} from '../assets/images/RightArrow.svg'

// export default function HamburgerMenu() {

//     const dispatch = useDispatch()
//     const ref = useRef()
//     const history = useHistory()
//     const user = useSelector(state => state.user)
//     const [modal, setModal] = useState(false)

//     useEffect(() => {
//         const handleClickOut = (e) => {
//             if (modal && ref.current && !ref.current.contains(e.target)) {
//                 setModal(!modal)
//             }
//         }
//         document.addEventListener("mousedown", handleClickOut)

//         return () => {
//             document.removeEventListener("mousedown", handleClickOut)
//         }
//     })

//     const handleHIW = () => {
//         setModal(!modal)
//         dispatch(showAboutModal())
//     }

//     const handleSignOut = () => {
//         setModal(!modal)
//         firebase.auth().signOut()
//             .then(() => {
//                 history.push("/")
//                 window.scrollTo(0, 0)
//             })
//     }

//     return (
//         <div className='hamburger-menu'>
//             <div className='hamburger-menu-button' onClick={() => setModal(!modal)}>
//                 <Hamburger />
//             </div>

//             <div className={modal ? 'hamburger-modal-bg active' : 'hamburger-modal-bg'}>
//                 <div className={modal ? 'hamburger-modal active' : 'hamburger-modal'} ref={ref}>

//                     <div className='hamburger-modal-content'>
//                         <div className='hamburger-modal-header'>
//                             <div className='hamburger-modal-pull-tab'></div>
//                             <h2> Menu </h2>
//                         </div>

//                         <div className='hamburger-modal-account'>

//                             {/* Styling when user is signed out */}
//                             {!user && <div className='hamburger-modal-account-out'>
//                                 <button className='hamburger-create-account' 
//                                 onClick={() => document.location.href = '/create-account'}>
//                                     Create Account
//                                 </button>

//                                 <button className='hamburger-sign-in' 
//                                 onClick={() => document.location.href = '/sign-in'}>
//                                     Sign In
//                                 </button>
//                             </div>}

//                             {/* Styling when user is signed in */}
//                             {user && <div className='hamburger-modal-account-in'>
//                                 <div className='hamburger-modal-account-in-content'>
//                                     <div className='hamburger-modal-profile'>
//                                         <div className='hamburger-modal-profile-pic'>
//                                             {user.photoURL ?
//                                             <img src={user.photoURL} alt='profile' />
//                                             :
//                                             <ProfileIcon />}
//                                         </div>

//                                         <h4> {user.displayName} </h4>
//                                     </div>

//                                     <div className='hamburger-modal-user-option' 
//                                     onClick={() => document.location.href = '/profile'}>
//                                         <p> View Profile </p>
//                                         <RightArrow />
//                                     </div>

//                                     <div className='hamburger-modal-user-option last' onClick={handleSignOut}>
//                                         <p> Sign Out </p>   
//                                     </div>
//                                 </div>
//                             </div>}
//                         </div>

//                         <div className='hamburger-modal-options'>
//                             <div className='hamburger-option' onClick={() => document.location.href = '/browse'}>
//                                 <div className='hamburger-option-content'>
//                                     <p> Browse </p>
//                                     <RightArrow />
//                                 </div>
//                             </div>

//                             <div className='hamburger-option' onClick={() => document.location.href = '/newsroom'}>
//                                 <div className='hamburger-option-content'>
//                                     <p> Newsroom </p>
//                                     <RightArrow />
//                                 </div>
//                             </div>

//                             <div className='hamburger-option'>
//                                 <div className='hamburger-option-content last' onClick={handleHIW}>
//                                     <p> How it Works </p>
//                                     <RightArrow />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {modal && <RemoveScroll />}
//         </div>

//     )
// }