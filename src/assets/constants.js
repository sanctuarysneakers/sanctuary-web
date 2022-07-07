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

// browse - single-select filter options 

export const popularBrandOptions = [
    {value: 'nike', label: 'Nike'},
    {value: 'yeezy', label: 'Yeezy'}, 
    {value: 'air jordan', label: 'Air Jordan'},
    {value: 'off white', label: 'Off-White'}, 
    {value: 'adidas', label: 'Adidas'},
    {value: 'converse', label: 'Converse'}
]

export const brandOptions = [
    {value: null, label: 'All'}, 
    {value: 'adidas', label: 'Adidas'},
    {value: 'asics', label: 'Asics'},
    {value: 'balenciaga', label: 'Balenciaga'},
    {value: 'converse', label: 'Converse'},
    {value: 'fila', label: 'Fila'},
    {value: 'gucci', label: 'Gucci'},
    {value: 'air jordan', label: 'Jordan'},
    {value: 'new balance', label: 'New Balance'},
    {value: 'nike', label: 'Nike'},
    {value: 'off white', label: 'Off-White'}, 
    {value: 'puma', label: 'Puma'},
    {value: 'reebok', label: 'Reebok'},
    {value: 'saucony', label: 'Saucony'},
    {value: 'supreme', label: 'Supreme'},
    {value: 'under armour', label: 'Under Armour'}, 
    {value: 'vans', label: 'Vans'},
    {value: 'yeezy', label: 'Yeezy'}
]

export const sizeTypeOptions = [
    {value: null, label: 'All'},
    {value: 'men', label: 'Men'},
    {value: 'women', label: 'Women'}, 
    {value: 'youth', label: 'Youth'}, 
    {value: 'infant', label: 'Infant'}
]

// sort options
export const sortOptions = [
    {value: null, label: 'All'},
    {value: '{"sort": "date_added", "order": "descending"}', label: 'Newest Releases'},
    {value: '{"sort": "relevance", "order": "descending"}', label: 'Most Popular'},
    {value: '{"sort": "lowest_price_cents", "order": "ascending"}', label: 'Price: Low to High'},
    {value: '{"sort": "lowest_price_cents", "order": "descending"}', label: 'Price: High to Low'}
]

// browse - multi-select filter options 
function generateReleaseYears() {
    let currentYear = new Date().getFullYear()
    let years = [] 
    for(let i = currentYear; i >= 2000; i--) {
        years.push({"value": i.toString(), "label": i.toString()})
    }
    return years
}

export const releaseYearOptions = generateReleaseYears() 

//TODO
export const priceOptions = [
    {value: 'lte-100', label: 'Under $100'},
    {value: 'range(100|200)', label: '$100-$200'},
    {value: 'range(200|300)', label: '$200-$300'},
    {value: 'range(300|400)', label: '$300-$400'},
    {value: 'range(400|500)', label: '$400-$500'},
    {value: 'range(500|600)', label: '$500-$600'},
    {value: 'gte-600', label: '$600+'}
]
