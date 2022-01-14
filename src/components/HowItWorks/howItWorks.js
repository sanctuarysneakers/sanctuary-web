import React from "react";
import HowItWorksSplash from "./howItWorksSplash";
import ContactUs from './contactUs';

export default function HowItWorks() {

    return (
        <div className="how-it-works">
            <div className="how-it-works-content">
                <HowItWorksSplash />
                <ContactUs/> 
            </div>
        </div>
    )
}
