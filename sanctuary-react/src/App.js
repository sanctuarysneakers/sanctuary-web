import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/Pages/home"
import ShoeModal from "./components/Pages/shoemodal"
import AboutModal from "./components/Pages/aboutmodal"
import TermsModal from "./components/Pages/termsmodal"
import PrivacyModal from "./components/Pages/privacymodal"
import FilterModal from "./components/Pages/filterModal"
import HamburgerModal from "./components/Pages/hamburgermodal"
import DeleteModal from "./components/Pages/deletemodal"
import PageNotFound from "./components/Pages/pagenotfound"
import Profile from './components/Pages/profile'
import EditProfileName from './components/Pages/editprofilename'
import EditProfileEmail from './components/Pages/editprofileemail'
import EditProfilePassword from './components/Pages/editprofilepassword'

import { useSelector, useDispatch } from 'react-redux'
import { RemoveScroll } from 'react-remove-scroll'
import SignInOptions from './components/Pages/signinoptions'
import SignInEmail from './components/Pages/signinemail'
import CreateAccountOptions from './components/Pages/createaccountoptions'
import CreateAccountEmail from './components/Pages/createaccountemail'
import Blog from "./components/Pages/blog.js"
import BlogPost from "./components/Pages/blog-post-1.js"

import { setUuid, setUser } from './redux/actions'
import firebase from './services/firebase'


function App() {

  const shoeModalVisible = useSelector(state => state.shoeModalVisible)
  const aboutModalVisible = useSelector(state => state.aboutModalVisible)
  const termsModalVisible = useSelector(state => state.termsModalVisible)
  const privacyModalVisible = useSelector(state => state.privacyModalVisible)
  const filterModalVisible = useSelector(state => state.filterModalVisible)
  const hamburgerModalVisible = useSelector(state => state.hamburgerModalVisible)
  const deleteModalVisible = useSelector(state => state.deleteModalVisible)

  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUuid(user.uid))
        dispatch(setUser(user))
        console.log("signed in!")
        console.log(user)
      }
      else {
        dispatch(setUuid(''))
        dispatch(setUser(null))
        console.log("not signed in")
      }
    })
  })

  return (
    <React.Fragment>
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
        <Route path="/blog" component={Blog} />
        <Route path="/blogpost1" component={BlogPost} />
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
        termsModalVisible &&
        <RemoveScroll>
          <TermsModal />
        </RemoveScroll>
      }
      {
        privacyModalVisible &&
        <RemoveScroll>
          <PrivacyModal />
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


export default App;
