import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideShoeModal, hideAboutModal, hidePrivacyModal, 
        hideTermsModal, hideFilterModal, hideHamburgerModal,
        hideDeleteModal } from '../../redux/actions'

export default function useOutsideAlerter(ref) {
    const dispatch = useDispatch()

    useEffect(() => {

        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch(hideShoeModal())
                dispatch(hideAboutModal())
                dispatch(hidePrivacyModal())
                dispatch(hideTermsModal())
                dispatch(hideFilterModal())
                dispatch(hideHamburgerModal())
                dispatch(hideDeleteModal())
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })
}