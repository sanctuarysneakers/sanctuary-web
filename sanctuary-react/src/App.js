import React from 'react'
import {Switch, Route} from 'react-router-dom'

import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/Pages/home"
import AboutUs from "./components/Pages/about"
import ShoeModal from "./components/Pages/shoemodal"
import ContactUs from "./components/Pages/contact"
import TermsOfUse from "./components/Pages/terms"
import PrivacyPolicy from "./components/Pages/privacy"
import PageNotFound from "./components/Pages/pagenotfound"

import { useSelector } from 'react-redux'



function App() {

  const shoeModalVisible = useSelector(state => state.shoeModalVisible)

  return (
    <React.Fragment>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/about" component={AboutUs}/>
        <Route path="/contact" component={ContactUs}/>
        <Route path="/terms" component={TermsOfUse}/>
        <Route path="/privacy" component={PrivacyPolicy}/>
        <Route component={PageNotFound}/>
      </Switch>
      {shoeModalVisible && <ShoeModal/>}
      <Footer/>
    </React.Fragment>
  )
}


export default App;
