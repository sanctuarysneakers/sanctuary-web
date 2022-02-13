import Australia from './images/australia.svg'
import Canada from './images/canada.svg'
import EuropeanUnion from './images/europeanUnion.svg'
import Japan from './images/japan.svg'
import UnitedKingdom from './images/unitedKingdom.svg'
import UnitedStates from './images/unitedStates.svg'

import StockXIcon from './images/stockxIcon.png'
import GOAT from './images/goat.svg'
import GrailedIcon from './images/grailedIcon.jpg'
import FlightClub from './images/flightClub.svg'
import DepopIcon from './images/depopIcon.svg'
import KLEKT from './images/klekt.svg'
import eBay from './images/ebay.svg'

import StockXGrey from './images/stockx.png'
import GOATGrey from './images/goat-grey.svg'
import GrailedGrey from './images/grailed-grey.svg'
import flightClubGrey from './images/flightClub-grey.svg'
import DepopGrey from './images/depop-grey.svg'
import KLEKTGrey from './images/klekt-grey.svg'
import eBayGrey from './images/ebay-grey.svg'



// currencies & flags

export const currencySymbolMap = {
    'USD': '$', 'CAD': 'C$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'AUD': 'A$'
}

export const currencySymbolMapWithAbbrev = {
    'AUD' : 'AUD - A$',
    'CAD' : 'CAD - C$',
    'EUR' : 'EUR - €',
    'GBP' : 'GBP - £',
    'JPY' : 'JPY - ¥',
    'USD' : 'USD - $'
}

export const currencyFlagMap = {
    'AUD' : Australia,
    'CAD' : Canada,
    'EUR' : EuropeanUnion,
    'GBP' : UnitedKingdom,
    'JPY' : Japan,
    'USD' : UnitedStates
}

// brands & logos

export const websiteTextMap = {
    'stockx' : 'StockX',
    'goat' : 'GOAT',
    'grailed' : 'Grailed',
    'flightclub' : 'Flight Club',
    'depop' : 'Depop',
    'klekt' : 'KLEKT',
    'ebay' : 'eBay'
}

export const websiteLogoMapRegular = {
    'stockx' : StockXIcon,
    'goat' : GOAT,
    'grailed' : GrailedIcon,
    'flightclub' : FlightClub,
    'depop' : DepopIcon,
    'klekt' : KLEKT,
    'ebay' : eBay
}

export const websiteLogoMapGrey = {
    'stockx': StockXGrey,
    'goat': GOATGrey,
    'grailed': GrailedGrey,
    'flightclub': flightClubGrey,
    'depop': DepopGrey,
    'klekt': KLEKTGrey,
    'ebay': eBayGrey
}

