import React from 'react'
import { useTransition, animated } from 'react-spring'
import { Switch, Route } from 'react-router-dom'

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

  const transitions = useTransition(shoeModalVisible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
      {
        transitions.map(({ item, key, props }) =>
          item && <animated.div key={key} style={props}><ShoeModal /></animated.div>)
      }
      {aboutModalVisible && <AboutModal />}
      <Footer />
    </React.Fragment>
  )
}


export default App;
