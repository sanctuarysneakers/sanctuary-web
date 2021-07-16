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
import FilterModal from "./components/Pages/filterModal"
import HamburgerModal from "./components/Pages/hamburgerModal"
import DeleteModal from "./components/Pages/deleteModal"
import SearchModal from './components/Pages/searchModal'
import PageNotFound from "./components/Pages/pageNotFound"
import PrivacyPolicy from './components/Pages/privacyPolicy'
import TermsOfUse from './components/Pages/termsOfUse'

import SignInOptions from './components/Accounts/signInOptions'
import SignInEmail from './components/Accounts/signInEmail'
import CreateAccountOptions from './components/Accounts/createAccountOptions'
import CreateAccountEmail from './components/Accounts/createAccountEmail'
import Profile from './components/Accounts/profile'
import EditProfileName from './components/Accounts/editProfileName'
import EditProfileEmail from './components/Accounts/editProfileEmail'
import EditProfilePassword from './components/Accounts/editProfilePassword'

import Blog from "./components/Blog/blog"
import ArticleIntro from "./components/Blog/Articles/articleIntro"
import ArticleSneakersMeetEngineering from "./components/Blog/Articles/articleSneakersmeetengineering"
import ArticleDemystifying from "./components/Blog/Articles/articleDemystifying"
import ArticleTop2020 from "./components/Blog/Articles/articleTop2020"

import firebase from './services/firebase'
import Loader from './components/loader'


export default function App() {

    const dispatch = useDispatch()

    const filterVisible = useSelector(state => state.filterVisible)
    const aboutModalVisible = useSelector(state => state.aboutModalVisible)
    const hamburgerModalVisible = useSelector(state => state.hamburgerModalVisible)
    const deleteModalVisible = useSelector(state => state.deleteModalVisible)
    const searchModalVisible = useSelector(state => state.searchModalVisible)

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
                <Route path="/item/:sku" component={Item} />
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
                <Route path="/newsroom" component={Blog} />
                <Route path="/article-introduction" component={ArticleIntro} />
                <Route path="/article-sneakersmeetengineering" component={ArticleSneakersMeetEngineering}/>
                <Route path="/article-demystifying" component={ArticleDemystifying}/>
                <Route path="/article-toppicks" component={ArticleTop2020}/>
                <Route component={PageNotFound} />
                </Switch>

                {
                    aboutModalVisible &&
                    <RemoveScroll>
                        <AboutModal />
                    </RemoveScroll>
                }
                {
                    filterVisible &&
                    <RemoveScroll>
                        <FilterModal />
                    </RemoveScroll>
                }
                {
                    hamburgerModalVisible &&
                    <RemoveScroll>
                        <HamburgerModal />
                    </RemoveScroll>
                }
                {
                    deleteModalVisible &&
                    <RemoveScroll>
                        <DeleteModal />
                    </RemoveScroll>
                }
                {
                    searchModalVisible &&
                    <RemoveScroll>
                        <SearchModal />
                    </RemoveScroll>
                }
            </React.Fragment>
        )
    }
}
