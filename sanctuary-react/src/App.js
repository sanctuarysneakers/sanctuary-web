import React from 'react'
import { Transition } from 'react-spring/renderprops'
import {Switch, Route} from 'react-router-dom'

import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/Pages/home"
import ShoeModal from "./components/Pages/shoemodal"
import AboutModal from "./components/Pages/aboutmodal"
import PageNotFound from "./components/Pages/pagenotfound"

import { useSelector } from 'react-redux'



function App() {

  const shoeModalVisible = useSelector(state => state.shoeModalVisible)
  const aboutModalVisible = useSelector(state => state.aboutModalVisible)

  //TODO: animate the modal appearing
  return (
    <React.Fragment>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route component={PageNotFound}/>
      </Switch>
      {shoeModalVisible && <ShoeModal/>}
      {aboutModalVisible && <AboutModal/>}
      <Footer/>
    </React.Fragment>
  )
}


export default App;

//TODO: change the favicon to logo
//TODO: responsive mode has horizontal scroll on mobile, also horizontal scroll bars on about modal
