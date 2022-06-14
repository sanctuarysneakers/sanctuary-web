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

export const brandOptions = [
    {value: null, label: 'All'}, 
    {value: 'adidas', label: 'Adidas'},
    {value: 'asics', label: 'Asics'},
    {value: 'balenciaga', label: 'Balenciaga'},
    {value: 'converse', label: 'Converse'},
    {value: 'retro-jordans', label: 'Jordan'},
    {value: 'new-balance', label: 'New Balance'},
    {value: 'nike', label: 'Nike'},
    {value: 'off-white', label: 'Off-White'}, 
    {value: 'puma', label: 'Puma'},
    {value: 'reebok', label: 'Reebok'},
    {value: 'saucony', label: 'Saucony'},
    {value: 'vans', label: 'Vans'},
    {value: 'yeezy', label: 'Yeezy'}
]

export const sizeTypeOptions = [
    {value: null, label: 'All'},
    {value: 'men', label: 'Men'},
    {value: 'women', label: 'Women'}, 
    // {value: 'child', label: 'Child'}
]

export const sortOptions = [
    {value: null, label: 'Featured'},
    {value: '{"sort": "release_date"}', label: 'Newest Releases'},
    {value: '{"sort": "most-active"}', label: 'Most Popular'},
    {value: '{"sort": "lowest_ask", "order": "ASC"}', label: 'Price: Low to High'},
    {value: '{"sort": "average_deadstock_price", "order": "DESC"}', label: 'Price: High to Low'}
]

// browse - multi-select filter options 

export const releaseYearOptions = [
    {value: '2022', label: '2022'},
    {value: '2021', label: '2021'},
    {value: '2020', label: '2020'},
    {value: '2019', label: '2019'},
    {value: '2018', label: '2018'},
    {value: '2017', label: '2017'},
    {value: '2016', label: '2016'},
    {value: '2015', label: '2015'},
    {value: '2014', label: '2014'},
    {value: '2013', label: '2013'},
    {value: '2012', label: '2012'},
    {value: '2011', label: '2011'},
    {value: '2010', label: '2010'},
    {value: '2009', label: '2009'},
    {value: '2008', label: '2008'},
    {value: '2007', label: '2007'},
    {value: '2006', label: '2006'},
    {value: '2005', label: '2005'},
    {value: '2004', label: '2004'},
    {value: '2003', label: '2003'},
    {value: '2002', label: '2002'},
    {value: '2001', label: '2001'},
    {value: '2000', label: '2000'},
    {value: 'lt-2000', label: '<2000'}
]

export const priceOptions = [
    {value: 'lte-100', label: 'Under $100'},
    {value: 'range(100|200)', label: '$100-$200'},
    {value: 'range(200|300)', label: '$200-$300'},
    {value: 'range(300|400)', label: '$300-$400'},
    {value: 'range(400|500)', label: '$400-$500'},
    {value: 'range(500|600)', label: '$500-$600'},
    {value: 'gte-600', label: '$600+'}
]

//shipping

export const dealsUnderHeaders = {
    'AUD': [300, 400],
    'CAD': [300, 400],
    'CHF': [200, 300],
    'CNY': [1300, 2000],
    'EUR': [200, 300],
    'GBP': [200, 300],
    'HKD': [1600, 2400],
    'JPY': [26000, 38000],
    'KRW': [250000, 370000],
    'USD': [200, 300],
}
