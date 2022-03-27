import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useLocation } from 'react-router'
import { RemoveScroll } from 'react-remove-scroll'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './redux/actions'

import ProtectedRoute from './components/Routes/protectedRoute'
import Navbar from "./components/navbar"
import Home from "./components/Home/home"
import Browse from "./components/Pages/browse"
import Item from "./components/Pages/item"
import AboutModal from "./components/Pages/aboutModal"
import HamburgerModal from './components/hamburgerModal'
import DeleteModal from "./components/deleteModal"
import SearchModal from './components/searchModal'
import CurrencyModal from './components/currencyModal'
import PageNotFound from './components/Pages/pageNotFound'
import ItemNotSupported from './components/Pages/itemNotSupported'
import PrivacyPolicy from './components/Pages/privacyPolicy'
import TermsOfUse from './components/Pages/termsOfUse'
import ContactUs from './components/Pages/contactUs'
import LocationPopup from './components/locationPopup'
import useLocationDetection from './components/Hooks/useLocationDetection'

import SignInOptions from './components/Accounts/signInOptions'
import SignInEmail from './components/Accounts/signInEmail'
import CreateAccountOptions from './components/Accounts/createAccountOptions'
import CreateAccountEmail from './components/Accounts/createAccountEmail'
import Profile from './components/Accounts/profile'
import EditProfileName from './components/Accounts/editProfileName'
import EditProfileEmail from './components/Accounts/editProfileEmail'
import EditProfilePassword from './components/Accounts/editProfilePassword'

import HowItWorks from './components/HowItWorks/howItWorks'

import Newsroom from './components/Newsroom/newsroom'
import SanctuaryStory from './components/Newsroom/Articles/sanctuaryStory'
import AdidasCarbon3D from './components/Newsroom/Articles/adidasCarbon3D'
import TopDrops2020 from './components/Newsroom/Articles/topDrops2020'
import SneakerMarket from './components/Newsroom/Articles/sneakerMarket'
import BuyYourPair from "./components/Newsroom/Articles/buyYourPair"

import firebase from './services/firebase'
import Loader from './components/loader'


export default function App() {

    const dispatch = useDispatch()
    const urlLocation = useLocation() 
    
    useLocationDetection()
    
    const locationPopup = useSelector(state => state.locationPopup)
    const currencyModalVisible = useSelector(state => state.currencyModalVisible)
    const searchModalVisible = useSelector(state => state.searchModalVisible)
    const aboutModalVisible = useSelector(state => state.aboutModalVisible)
    const deleteModalVisible = useSelector(state => state.deleteModalVisible)
    const [loader, setLoader] = useState(true)
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(setUser(user))
                setLoader(false)
            } else {
                dispatch(setUser(null))
                setLoader(false)
            }
        })
    })

    useEffect(() => {
        window.analytics.page(); 
    }, [urlLocation.pathname])


    if (loader) {
        return (
            <Loader />
        )
    } else {
        return (
            <React.Fragment>
                <Navbar />
                <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/browse/:searchTerm?" component={Browse} />
                <Route path="/item/:sku/:gender" component={Item} />

                {/* redirect user to home page if already signed in  */}
                <ProtectedRoute path="/sign-in" component={SignInOptions} isEnabled={!firebase.auth().currentUser} />
                <ProtectedRoute path="/sign-in-email" component={SignInEmail} isEnabled={!firebase.auth().currentUser} />
                <ProtectedRoute path="/create-account" component={CreateAccountOptions} isEnabled={!firebase.auth().currentUser} />
                <ProtectedRoute path="/create-account-email" component={CreateAccountEmail} isEnabled={!firebase.auth().currentUser} />

                {/* redirect user to home page if not signed in  */}
                <ProtectedRoute path="/profile" component={Profile} isEnabled={firebase.auth().currentUser} />
                <ProtectedRoute path="/profile-edit-name" component={EditProfileName} isEnabled={firebase.auth().currentUser} />
                <ProtectedRoute path="/profile-edit-email" component={EditProfileEmail} isEnabled={firebase.auth().currentUser} />
                <ProtectedRoute path="/profile-edit-password" component={EditProfilePassword} isEnabled={firebase.auth().currentUser} />
            
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/terms-of-use" component={TermsOfUse} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/how-it-works" component={HowItWorks} />
                <Route path="/newsroom" component={Newsroom} />
                <Route path="/newsroom-sanctuary-our-story" component={SanctuaryStory} />
                <Route path="/newsroom-buy-your-pair" component={BuyYourPair} />
                <Route path="/newsroom-how-adidas-and-carbon-3d-are-revolutionizing-sneaker-production" component={AdidasCarbon3D} />
                <Route path="/newsroom-our-top-drops-of-2020" component={TopDrops2020} />
                <Route path="/newsroom-demystifying-the-sneaker-market" component={SneakerMarket} />
                <Route path="/item-not-supported" component={ItemNotSupported} />
                <Route component={PageNotFound} />
                </Switch>

                { locationPopup && 
                    <RemoveScroll>
                        <LocationPopup />
                    </RemoveScroll>
                }
                { currencyModalVisible &&
                    <RemoveScroll>
                        <CurrencyModal />
                    </RemoveScroll>
                }
                { aboutModalVisible &&
                    <RemoveScroll>
                        <AboutModal />
                    </RemoveScroll>
                }
                { deleteModalVisible &&
                    <RemoveScroll>
                        <DeleteModal />
                    </RemoveScroll>
                }
                { searchModalVisible &&
                    <RemoveScroll>
                        <SearchModal />
                    </RemoveScroll>
                }
                <HamburgerModal />
            </React.Fragment>
        )
    }
}