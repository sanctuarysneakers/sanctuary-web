import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/Pages/home"
import ShoeModal from "./components/Pages/shoemodal"
import AboutModal from "./components/Pages/aboutmodal"
import FilterModal from "./components/Pages/filterModal"
import HamburgerModal from "./components/Pages/hamburgermodal"
import DeleteModal from "./components/Pages/deletemodal"
import PageNotFound from "./components/Pages/pagenotfound"
import Profile from './components/Pages/profile'
import EditProfileName from './components/Pages/editprofilename'
import EditProfileEmail from './components/Pages/editprofileemail'
import EditProfilePassword from './components/Pages/editprofilepassword'
import PrivacyPolicy from './components/Pages/privacypolicy'
import TermsOfUse from './components/Pages/termsofuse'

import { useSelector, useDispatch } from 'react-redux'
import { RemoveScroll } from 'react-remove-scroll'
import SignInOptions from './components/Pages/signinoptions'
import SignInEmail from './components/Pages/signinemail'
import CreateAccountOptions from './components/Pages/createaccountoptions'
import CreateAccountEmail from './components/Pages/createaccountemail'
import Blog from "./components/Pages/blog.js"
import ArticleIntro from "./components/Pages/articleIntro.js"
import ArticleSneakersMeetEngineering from "./components/Pages/articleSneakersmeetengineering.js"
import ArticleDemystifying from "./components/Pages/articleDemystifying.js"

import { setUuid, setUser } from './redux/actions'
import firebase from './services/firebase'
import ScrollToTop from './components/Hooks/scrolltotop'
import Loader from './components/loader'

function App() {

  const dispatch = useDispatch()

  const shoeModalVisible = useSelector(state => state.shoeModalVisible)
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
      }
      else {
        dispatch(setUser(null))
        setLoader(false)
      }
    })
  })

  if (loader) {
    return (
      <Loader />
    )
  }
  else {
    return (
      <React.Fragment>
        <ScrollToTop />
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
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
          <Route component={PageNotFound} />
        </Switch>

        {
          shoeModalVisible &&
          <RemoveScroll>
            <ShoeModal />
          </RemoveScroll>
        }
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


export default App;
