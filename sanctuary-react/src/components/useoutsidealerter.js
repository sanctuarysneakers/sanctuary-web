import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideShoeModal, hideAboutModal, hidePrivacyModal, hideTermsModal } from '../redux/actions'

export default function useOutsideAlerter(ref) {
    const dispatch = useDispatch()

    useEffect(() => {

        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch(hideShoeModal())
                dispatch(hideAboutModal())
                dispatch(hidePrivacyModal())
                dispatch(hideTermsModal())
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })
}