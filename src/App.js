import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useLocation } from 'react-router'
import { RemoveScroll } from 'react-remove-scroll'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setRedirectUrl } from './redux/actions'

import ProtectedRoute from './components/Routes/protectedRoute'
import Navbar from "./components/Other/navbar"
import Home from "./components/Home/home"
import Browse from "./components/Browse/browse"
import Item from "./components/Item/item"
import Portfolio from './components/Portfolio/portfolio'
import AboutModal from "./components/Modals/aboutModal"
import HamburgerModal from './components/Modals/hamburgerModal'
import DeleteModal from "./components/Modals/deleteModal"
import SearchModal from './components/Modals/searchModal'
import CurrencyModal from './components/Modals/currencyModal'
import PageNotFound from './components/Other/pageNotFound'
import ItemNotSupported from './components/Other/itemNotSupported'
import PrivacyPolicy from './components/Other/privacyPolicy'
import TermsOfUse from './components/Other/termsOfUse'
import ContactUs from './components/Contact/contactUs'
import LocationModal from './components/Modals/locationModal'
import { useLocationDetection }  from './hooks/useLocationDetection'
import CategoryFilterModal from './components/Modals/categoryFilterModal'

import SignInOptions from './components/Accounts/signInOptions'
import SignInEmail from './components/Accounts/signInEmail'
import CreateAccountOptions from './components/Accounts/createAccountOptions'
import CreateAccountEmail from './components/Accounts/createAccountEmail'
import Profile from './components/Accounts/profile'
import SignOut from './components/Accounts/signOut'
import EditProfileName from './components/Accounts/editProfileName'
import EditProfileEmail from './components/Accounts/editProfileEmail'
import EditProfilePassword from './components/Accounts/editProfilePassword'
import ForgotPassword from './components/Accounts/forgotPassword'

import HowItWorks from './components/HowItWorks/howItWorks'
import Newsroom from './components/Newsroom/newsroom'
import SanctuaryStory from './components/Newsroom/Articles/sanctuaryStory'
import AdidasCarbon3D from './components/Newsroom/Articles/adidasCarbon3D'
import TopDrops2020 from './components/Newsroom/Articles/topDrops2020'
import SneakerMarket from './components/Newsroom/Articles/sneakerMarket'
import BuyYourPair from "./components/Newsroom/Articles/buyYourPair"

import firebase from './services/firebase'
import Loader from './components/Other/loader'


export default function App() {

    const dispatch = useDispatch()
    const urlLocation = useLocation()
    
    useLocationDetection()
    
    const locationPopup = useSelector(state => state.modals.locationPopupVisible)
    const currencyModalVisible = useSelector(state => state.modals.currencyModalVisible)
    const searchModalVisible = useSelector(state => state.modals.searchModalVisible)
    const aboutModalVisible = useSelector(state => state.modals.aboutModalVisible)
    const deleteModalVisible = useSelector(state => state.modals.deleteModalVisible)
    const categoryFilterModalVisible = useSelector(state => state.modals.categoryFilterModalVisible)
    const redirect = useSelector(state => state.redirect)
    const [loader, setLoader] = useState(true)
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user))
                setLoader(false)

                if (redirect) {
                    let redirectCopy = redirect
                    dispatch(setRedirectUrl(null))
                    const jwt = await user.getIdToken()
                    window.location.href = `${redirectCopy}id_token=${jwt}`
                }
            } else {
                dispatch(setUser(null))
                setLoader(false)
            }
        })
    }, [])

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
                <Route path="/browse/:query?" component={Browse} />
                <Route path="/item/:itemKey/:gender?" component={Item} />

                <ProtectedRoute path="/sign-in/:redirect?" component={SignInOptions} isEnabled={!firebase.auth().currentUser} />
                <ProtectedRoute path="/sign-in-email" component={SignInEmail} isEnabled={!firebase.auth().currentUser} />
                <ProtectedRoute path="/create-account/:redirect?" component={CreateAccountOptions} isEnabled={!firebase.auth().currentUser} />
                <ProtectedRoute path="/create-account-email" component={CreateAccountEmail} isEnabled={!firebase.auth().currentUser} />
                <ProtectedRoute path="/sign-in-forgot-password" component={ForgotPassword} isEnabled={!firebase.auth().currentUser} />

                <ProtectedRoute path="/profile/:redirect?" component={Profile} isEnabled={firebase.auth().currentUser} />
                <ProtectedRoute path="/profile-edit-name" component={EditProfileName} isEnabled={firebase.auth().currentUser} />
                <ProtectedRoute path="/profile-edit-email" component={EditProfileEmail} isEnabled={firebase.auth().currentUser} />
                <ProtectedRoute path="/profile-edit-password" component={EditProfilePassword} isEnabled={firebase.auth().currentUser} />
                <ProtectedRoute path="/sign-out/:redirect?" component={SignOut} isEnabled={firebase.auth().currentUser} />

                <ProtectedRoute path="/portfolio" component={Portfolio} isEnabled={firebase.auth().currentUser}/>

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
                        <LocationModal />
                    </RemoveScroll>
                }
                { categoryFilterModalVisible &&
                    <RemoveScroll>
                        <CategoryFilterModal />
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