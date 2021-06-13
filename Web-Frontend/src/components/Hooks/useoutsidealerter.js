import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideAboutModal, hideFilter, hideHamburgerModal,
    hideDeleteModal } from '../../redux/actions'

export default function useOutsideAlerter(ref) {
    const dispatch = useDispatch()

    useEffect(() => {

        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch(hideAboutModal())
                dispatch(hideFilter())
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