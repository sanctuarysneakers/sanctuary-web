import React, { useState } from 'react'
import "../assets/styling/_blogarticles.scss"
export default function UpcomingEvents() {

    return (
        <React.Fragment>
            <h1 className = "upcomingHeader"> Upcoming Raffles</h1>
            <div class="raffle">
                <img class="raffleImage"
                    src="https://images.ctfassets.net/ou2fckw20fbm/1z6iNhpK5lgyFtCdHXIA1g/f53f9450b9203a57b66c8b4eafdddd3c/Air_Jordan_1_High_Volt_Gold.png"
                ></img>
                <div class="raffleDesc">
                    <h2 class="raffleHeader"> RAFFLE: Jordan 1 High Retro Black Volt University Gold</h2> 
                    <p class="raffleText"> Jordan Brand is kicking off the new year with a fresh new take of MJ's first 
                    signature silhouette. Set to arrive on January 9th, the Jordan 1 Retro High White Black Volt University 
                    Gold features a white leather base with black overlays, volt ankles, and gold heels. A fresh white midsole 
                    sits atop a solid black outsole to cap off the vibrant design. Find all available raffles <a href="https://www.soleretriever.com/raffles/air-jordan-1-retro-high-white-black-volt-university-gold-555088-118">here</a>. </p>
                </div>
            </div>
            <div class="raffle">
                <img class="raffleImage"
                    src="https://images.solecollector.com/complex/images/c_crop,h_1068,w_1898,x_65,y_85/ldzmgopnvp409sveigow/travis-scott-nike-sb-dunk-low-ct5053-001-lateral"
                ></img>
                <div class="raffleDesc">
                    <h2 class="raffleHeader"> RAFFLE: Jordan 1 High Retro Black Volt University Gold</h2> 
                    <p class="raffleText"> Proving its release is certainly imminent — rumored to be sometime next month as 
                    of current — the pair’s best look yet brings with it close-up’s of its many details, ones that rival the chaotic 
                    presentation of La Flame’s previous Air Force 1. Uppers, whose overlays tear to reveal a striking cement print, 
                    first come out of the box in a navy paisley, sitting just adjacent to smooth leathers of light brown at the toe 
                    box and tongue as well as similarly earthy plaids along both the lateral and medial base. Find all available 
                    raffles <a href="https://www.soleretriever.com/raffles/nike-sb-dunk-low-travis-scott-ct5053-001">here</a>. </p>
                </div>
            </div>
        </React.Fragment>
    )
}