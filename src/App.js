import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { RemoveScroll } from 'react-remove-scroll'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './redux/actions'

import Navbar from "./components/navbar"
import Home from "./components/Home/home"
import Browse from "./components/Pages/browse"
import Item from "./components/Pages/item"
import AboutModal from "./components/Pages/aboutModal"
import HamburgerMenu from './components/hamburgerMenu'
import DeleteModal from "./components/deleteModal"
import SearchModal from './components/searchModal'
import CurrencyModal from './components/currencyModal'
import PageNotFound from './components/Pages/pageNotFound'
import ItemNotSupported from './components/Pages/itemNotSupported'
import PrivacyPolicy from './components/Pages/privacyPolicy'
import TermsOfUse from './components/Pages/termsOfUse'
import LocationPopup from './components/locationPopup'
import useLocationDetection from './components/Hooks/useLocationDetection'
import CategoryFilterModal from './components/categoryFilterModal'

import SignInOptions from './components/Accounts/signInOptions'
import SignInEmail from './components/Accounts/signInEmail'
import CreateAccountOptions from './components/Accounts/createAccountOptions'
import CreateAccountEmail from './components/Accounts/createAccountEmail'
import Profile from './components/Accounts/profile'
import EditProfileName from './components/Accounts/editProfileName'
import EditProfileEmail from './components/Accounts/editProfileEmail'
import EditProfilePassword from './components/Accounts/editProfilePassword'

import Newsroom from './components/Newsroom/newsroom'
import SanctuaryStory from './components/Newsroom/Articles/sanctuaryStory'
import AdidasCarbon3D from './components/Newsroom/Articles/adidasCarbon3D'
import TopDrops2020 from './components/Newsroom/Articles/topDrops2020'
import SneakerMarket from './components/Newsroom/Articles/sneakerMarket'
import BuyYourPair from "./components/Newsroom/Articles/buyYourPair"

import ArticleIntro from "./components/Blog/Articles/articleIntro"
import ArticleSneakersMeetEngineering from "./components/Blog/Articles/articleSneakersmeetengineering"
import ArticleDemystifying from "./components/Blog/Articles/articleDemystifying"
import ArticleTop2020 from "./components/Blog/Articles/articleTop2020"

import firebase from './services/firebase'
import Loader from './components/loader'


export default function App() {

    const dispatch = useDispatch()
    
    useLocationDetection()
    
    const locationPopup = useSelector(state => state.locationPopup)
    const currencyModalVisible = useSelector(state => state.currencyModalVisible)
    const searchModalVisible = useSelector(state => state.searchModalVisible)
    const aboutModalVisible = useSelector(state => state.aboutModalVisible)
    const deleteModalVisible = useSelector(state => state.deleteModalVisible)
    const categoryFilterModalVisible = useSelector(state => state.categoryFilterModalVisible)
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
                <Route path="/item/:sku/:gender" component={Item} />
                <Route path="/sign-in" component={SignInOptions} />
                <Route path="/sign-in-email" component={SignInEmail} />
                <Route path="/create-account" component={CreateAccountOptions} />
                <Route path="/create-account-email" component={CreateAccountEmail} />
                <Route path="/profile" component={Profile} />
                <Route path="/profile-edit-name" component={EditProfileName} />
                <Route path="/profile-edit-email" component={EditProfileEmail} />
                <Route path="/profile-edit-password" component={EditProfilePassword} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/terms-of-use" component={TermsOfUse} />
                <Route path="/newsroom" component={Newsroom} />
                <Route path="/newsroom-sanctuary-our-story" component={SanctuaryStory} />
                <Route path="/newsroom-buy-your-pair" component={BuyYourPair} />
                <Route path="/newsroom-how-adidas-and-carbon-3d-are-revolutionizing-sneaker-production" component={AdidasCarbon3D} />
                <Route path="/newsroom-our-top-drops-of-2020" component={TopDrops2020} />
                <Route path="/newsroom-demystifying-the-sneaker-market" component={SneakerMarket} />
                <Route path="/article-introduction" component={ArticleIntro} />
                <Route path="/article-sneakersmeetengineering" component={ArticleSneakersMeetEngineering}/>
                <Route path="/article-demystifying" component={ArticleDemystifying}/>
                <Route path="/article-toppicks" component={ArticleTop2020}/>
                <Route path="/item-not-supported" component={ItemNotSupported} />
                <Route component={PageNotFound} />
                </Switch>

                { locationPopup && 
                    <RemoveScroll>
                        <LocationPopup />
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
                <HamburgerMenu />
            </React.Fragment>
        )
    }
}
