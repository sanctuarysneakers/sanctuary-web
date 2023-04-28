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
import FootLockerIcon from './images/footlockerIcon.svg'
import eBay from './images/ebay.svg'

import StockXGrey from './images/stockx.png'
import GOATGrey from './images/goat-grey.svg'
import GrailedGrey from './images/grailed-grey.svg'
import FlightClubGrey from './images/flightClub-grey.svg'
import FootlockerGrey from './images/footlocker-grey.svg'
import DepopGrey from './images/depop-grey.svg'
import KLEKTGrey from './images/klekt-grey.svg'
import eBayGrey from './images/ebay-grey.svg'

export const supportedCurrencies = [
  'AUD', 'CAD', 'EUR', 'GBP', 'JPY',
  'USD', 'HKD', 'CHF', 'CNY', 'KRW'
]

export const currencySymbolMap = {
  USD: '$',
  CAD: 'C$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  HKD: 'HK$',
  CHF: 'Fr$',
  CNY: 'CN¥',
  KRW: '₩'
}

export const currencySymbolMapWithAbbrev = {
  AUD: 'AUD - A$',
  CAD: 'CAD - C$',
  CHF: 'CHF - Fr$',
  CNY: 'CNY - CN¥',
  EUR: 'EUR - €',
  GBP: 'GBP - £',
  HKD: 'HKD - HK$',
  JPY: 'JPY - ¥',
  KRW: 'KRW - ₩',
  USD: 'USD - $'
}

export const currencyFlagMap = {
  AUD: Australia,
  CAD: Canada,
  CHF: Swiss,
  CNY: China,
  EUR: EuropeanUnion,
  GBP: UnitedKingdom,
  HKD: HongKong,
  JPY: Japan,
  KRW: Korea,
  USD: UnitedStates
}

export const websiteTextMap = {
  stockx: 'StockX',
  goat: 'GOAT',
  grailed: 'Grailed',
  flightclub: 'Flight Club',
  depop: 'Depop',
  klekt: 'KLEKT',
  ebay: 'eBay',
  footlocker: 'Foot Locker'
}

export const websiteLogoMapRegular = {
  stockx: StockXIcon,
  goat: GOAT,
  grailed: GrailedIcon,
  flightclub: FlightClub,
  depop: DepopIcon,
  klekt: KLEKT,
  ebay: eBay,
  footlocker: FootLockerIcon
}

export const websiteLogoMapGrey = {
  stockx: StockXGrey,
  goat: GOATGrey,
  grailed: GrailedGrey,
  flightclub: FlightClubGrey,
  depop: DepopGrey,
  klekt: KLEKTGrey,
  ebay: eBayGrey,
  footlocker: FootlockerGrey
}

export const sneakerSizes = [
  4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9,
  9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15
]

export const brands = [
  'adidas', 'Air Jordan', 'ASICS', 'Converse',
  'New Balance', 'Nike', 'Puma', 'Reebok', 'Under Armour'
]

export const sortByOptions = [
  'relevance', 'trending', 'newest', 'price_low', 'price_high'
]

export const sortByOptionsFormattedMap = {
  relevance: 'Relevance',
  trending: 'Trending',
  newest: 'Newest',
  price_low: 'Price: Low to High',
  price_high: 'Price: High to Low'
}

export const defaultSortBy = 'relevance'
