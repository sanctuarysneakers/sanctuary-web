import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/Pages/home"
import Browse from "./components/Pages/browse"
import Item from "./components/Pages/item"
import AboutModal from "./components/Pages/aboutmodal"
import FilterModal from "./components/Pages/filterModal"
import HamburgerModal from "./components/Pages/hamburgermodal"
import DeleteModal from "./components/Pages/deletemodal"
import PageNotFound from "./components/Pages/pagenotfound"
import PrivacyPolicy from './components/Pages/privacypolicy'
import TermsOfUse from './components/Pages/termsofuse'

import { useSelector, useDispatch } from 'react-redux'
import { RemoveScroll } from 'react-remove-scroll'
import { setUser } from './redux/actions'
import SignInOptions from './components/Accounts/signinoptions'
import SignInEmail from './components/Accounts/signinemail'
import CreateAccountOptions from './components/Accounts/createaccountoptions'
import CreateAccountEmail from './components/Accounts/createaccountemail'
import Profile from './components/Accounts/profile'
import EditProfileName from './components/Accounts/editprofilename'
import EditProfileEmail from './components/Accounts/editprofileemail'
import EditProfilePassword from './components/Accounts/editprofilepassword'

import Blog from "./components/Blog/blog"
import ArticleIntro from "./components/Blog/Articles/articleIntro"
import ArticleSneakersMeetEngineering from "./components/Blog/Articles/articleSneakersmeetengineering"
import ArticleDemystifying from "./components/Blog/Articles/articleDemystifying"
import ArticleTop2020 from "./components/Blog/Articles/articleTop2020"

import firebase from './services/firebase'
import ScrollToTop from './components/Hooks/scrolltotop'
import Loader from './components/loader'

export default function App() {

  const dispatch = useDispatch()

  const aboutModalVisible = useSelector(state => state.aboutModalVisible)
  const filterModalVisible = useSelector(state => state.filterModalVisible)
  const hamburgerModalVisible = useSelector(state => state.hamburgerModalVisible)
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

  if (loader) {
    return (
      <Loader />
    )
  } else {
    return (
      <React.Fragment>
        <ScrollToTop />
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/browse/:query?" component={Browse} />
          <Route path="/item/:urlKey" component={Item} />
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
          <Route path="/blog" component={Blog} />
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
          filterModalVisible &&
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

        <Footer />
      </React.Fragment>
    )
  }
}
