import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/Pages/home"
import ShoeModal from "./components/Pages/shoemodal"
import AboutModal from "./components/Pages/aboutmodal"
import TermsModal from "./components/Pages/termsmodal"
import PrivacyModal from "./components/Pages/privacymodal"
import PageNotFound from "./components/Pages/pagenotfound"
import { useSelector } from 'react-redux'
import { RemoveScroll } from 'react-remove-scroll'
import LoginSignUp from './components/Pages/loginsignup'
import Blog from "./components/Pages/blog.js"
import BlogPost from "./components/Pages/blog-post-1.js"
function App() {

  const shoeModalVisible = useSelector(state => state.shoeModalVisible)
  const aboutModalVisible = useSelector(state => state.aboutModalVisible)
  const termsModalVisible = useSelector(state => state.termsModalVisible)
  const privacyModalVisible = useSelector(state => state.privacyModalVisible)

  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/blogpost1" component={BlogPost} />
        {/*<Route path="/login-signup" component={LoginSignUp} />*/}
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
      <Footer />
    </React.Fragment>
  )
}


export default App;
