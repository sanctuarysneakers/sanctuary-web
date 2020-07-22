import React from 'react'
import {Switch, Route} from 'react-router-dom'

import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/Pages/home"
import AboutUs from "./components/Pages/aboutus"
import Details from "./components/Pages/details"
import Shop from "./components/Pages/shop"
import PageNotFound from "./components/Pages/pagenotfound"


function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/aboutus" component={AboutUs}/>
        <Route path="/details" component={Details}/>
        <Route path="/shop" component={Shop}/>
        <Route component={PageNotFound}/>
      </Switch>
      <Footer/>
    </React.Fragment>
  )
}


export default App;
