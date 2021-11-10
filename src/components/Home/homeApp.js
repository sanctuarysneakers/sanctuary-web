import React from "react";
import phones from '../../assets/images/app-devices.png'

export default function HomeApp() {

    return (
        <div className='home-app'>
            <div className='home-app-content'>
                <div className='home-app-text'>
                    <h1>The same great deals, now on your phone.</h1>

                    <div className='home-app-badges'>
                        <a className='home-app-ios' href="https://apps.apple.com/us/app/sanctuary-sneaker-market-data/id1584720546?itsct=apps_box_badge&amp;itscg=30200">
                            <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1631145600&h=c2d3945e1a59ca8a02f1ccdab253f880" alt="Download on the App Store" />
                        </a>

                        <a className='home-app-android' href='https://play.google.com/store/apps/details?id=com.sanctuarysneakers.mobile&hl=en_CA&gl=US&fbclid=IwAR3i_U2MWeaBzBBVcrrh03cffzVkwQRibq-fBPf0KuzMTMdTdF0JrpHVvT4&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                            <img src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' alt='Get it on Google Play' />
                        </a>
                    </div>
                </div>

                <img src={phones} />
            </div>
        </div>
    )
}
