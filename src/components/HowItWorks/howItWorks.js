import React from 'react'
import HowItWorksSplash from './howItWorksSplash'
import HowItWorksInfo from './howItWorksInfo'
import HowItWorksSites from './howItWorksSites'
import HowItWorksCards from './howItWorksCards'
import HowItWorksContact from './howItWorksContact'
import Footer from '../Other/footer'

export default function HowItWorks () {
  return (
    <div className="how-it-works">
      <div className="how-it-works-content">
        <HowItWorksSplash />
        <HowItWorksInfo />
        <HowItWorksSites />
        <HowItWorksCards />
        <HowItWorksContact />
        <Footer colour={'white'} />
      </div>
    </div>
  )
}
