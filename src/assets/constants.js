import Australia from './images/australia.svg'
import Canada from './images/canada.svg'
import China from './images/china.png'
import EuropeanUnion from './images/europeanUnion.svg'
import HongKong from './images/hongkong.png'
import Japan from './images/japan.svg'
import Korea from './images/korea.png'
import Swiss from './images/swiss.svg'
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

export const supportedCurrencies = ['AUD', 'CAD', 'EUR', 'GBP', 'JPY', 'USD', 'HKD', 'CHF', 'CNY', 'KRW' ]

export const currencySymbolMap = {
    'USD': '$', 'CAD': 'C$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'AUD': 'A$', 'HKD': 'HK$', 'CHF': 'Fr$', 'CNY': 'CN¥', 'KRW': '₩'
}

export const currencySymbolMapWithAbbrev = {
    'AUD' : 'AUD - A$',
    'CAD' : 'CAD - C$',
    'CHF' : 'CHF - Fr$', 
    'CNY' : 'CNY - CN¥',
    'EUR' : 'EUR - €',
    'GBP' : 'GBP - £',
    'HKD' : 'HKD - HK$',
    'JPY' : 'JPY - ¥',
    'KRW' : 'KRW - ₩',
    'USD' : 'USD - $'
}

export const currencyFlagMap = {
    'AUD' : Australia,
    'CAD' : Canada,
    'CHF' : Swiss,
    'CNY': China, 
    'EUR' : EuropeanUnion,
    'GBP' : UnitedKingdom,
    'HKD' : HongKong,
    'JPY' : Japan,
    'KRW': Korea, 
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

