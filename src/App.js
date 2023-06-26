import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { RemoveScroll } from 'react-remove-scroll'
import { useSelector } from 'react-redux'
import { useLocationDetection } from './hooks/useLocationDetection'
import ProtectedRoute from './components/Routes/protectedRoute'
import Navbar from './components/Other/navbar'
import CreateAccountEmail from './components/Accounts/createAccountEmail'
import SignInEmail from './components/Accounts/signInEmail'
import ForgotPassword from './components/Accounts/forgotPassword'
import Profile from './components/Accounts/profile'
import Home from './components/Home/home'
import Browse from './components/Browse/browse'
import Item from './components/Item/item'
import Portfolio from './components/Portfolio/portfolio'
import PortfolioItem from './components/Portfolio/portfolioItem'
import AboutModal from './components/Modals/aboutModal'
import HamburgerModal from './components/Modals/hamburgerModal'
import DeleteModal from './components/Modals/deleteModal'
import SearchModal from './components/Modals/searchModal'
import CurrencyModal from './components/Modals/currencyModal'
import PageNotFound from './components/Other/pageNotFound'
import ItemNotSupported from './components/Other/itemNotSupported'
import PrivacyPolicy from './components/Other/privacyPolicy'
import TermsOfUse from './components/Other/termsOfUse'
import ContactUs from './components/Contact/contactUs'
import LocationModal from './components/Modals/locationModal'
import FiltersModal from './components/Modals/filtersModal'
import SortByModal from './components/Modals/sortByModal'
import HowItWorks from './components/HowItWorks/howItWorks'
import Newsroom from './components/Newsroom/newsroom'
import SanctuaryStory from './components/Newsroom/Articles/sanctuaryStory'
import AdidasCarbon3D from './components/Newsroom/Articles/adidasCarbon3D'
import TopDrops2020 from './components/Newsroom/Articles/topDrops2020'
import SneakerMarket from './components/Newsroom/Articles/sneakerMarket'
import BuyYourPair from './components/Newsroom/Articles/buyYourPair'

export default function App () {
  useLocationDetection()

  const user = useSelector(state => state.user)
  const locationPopup = useSelector(state => state.modals.locationPopupVisible)
  const currencyModalVisible = useSelector(state => state.modals.currencyModalVisible)
  const searchModalVisible = useSelector(state => state.modals.searchModalVisible)
  const aboutModalVisible = useSelector(state => state.modals.aboutModalVisible)
  const filtersModalVisible = useSelector(state => state.modals.filtersModalVisible)
  const sortByModalVisible = useSelector(state => state.modals.sortByModalVisible)
  const deleteModalVisible = useSelector(state => state.modals.deleteModalVisible)

  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/browse/:searchTerm?" component={Browse} />
        <Route path="/item/:itemKey/:gender?" component={Item} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-use" component={TermsOfUse} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/create-account-email" component={CreateAccountEmail} />
        <Route path="/sign-in-email" component={SignInEmail} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/profile" component={Profile} />
        <Route path="/portfolio" component={Portfolio} />
        <ProtectedRoute path="/portfolio-item" component={PortfolioItem} isEnabled={user !== null} />
        <Route path="/newsroom" component={Newsroom} />
        <Route path="/newsroom-sanctuary-our-story" component={SanctuaryStory} />
        <Route path="/newsroom-buy-your-pair" component={BuyYourPair} />
        <Route path="/newsroom-how-adidas-and-carbon-3d-are-revolutionizing-sneaker-production" component={AdidasCarbon3D} />
        <Route path="/newsroom-our-top-drops-of-2020" component={TopDrops2020} />
        <Route path="/newsroom-demystifying-the-sneaker-market" component={SneakerMarket} />
        <Route path="/item-not-supported" component={ItemNotSupported} />

        <Route component={PageNotFound} />
      </Switch>

      { locationPopup &&
        <RemoveScroll>
          <LocationModal />
        </RemoveScroll>
      }
      { filtersModalVisible &&
        <RemoveScroll>
          <FiltersModal />
        </RemoveScroll>
      }
      { sortByModalVisible &&
        <RemoveScroll>
          <SortByModal />
        </RemoveScroll>
      }
      { currencyModalVisible &&
        <RemoveScroll>
          <CurrencyModal />
        </RemoveScroll>
      }
      { aboutModalVisible &&
        <RemoveScroll>
          <AboutModal />
        </RemoveScroll>
      }
      { deleteModalVisible &&
        <RemoveScroll>
          <DeleteModal />
        </RemoveScroll>
      }
      { searchModalVisible &&
        <RemoveScroll>
          <SearchModal />
        </RemoveScroll>
      }
      <HamburgerModal />
    </React.Fragment>
  )
}
